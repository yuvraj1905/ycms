import React, {createContext,useContext, useEffect, useState } from "react";
import {initializeApp} from 'firebase/app'
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged ,signOut, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getDatabase,set} from 'firebase/database'
import {getFirestore,collection,addDoc, getDocs,doc, getDoc, deleteDoc,updateDoc, setDoc} from 'firebase/firestore'
import {getDownloadURL, getStorage,ref,uploadBytes} from 'firebase/storage'
import {v4 as uuid} from 'uuid'
import { Product } from "../../types/Product";
import { FirebaseContextProviderProps, FirebaseProviderContextValue, dataState } from "../../types/fireBaseTypes";


const firebaseConfig = {
  apiKey: "AIzaSyDA7ccJkFNlGvzAer8lU2Sr2nEc7_EU-rI",
  authDomain: "cmsgeekyants.firebaseapp.com",
  projectId: "cmsgeekyants",
  storageBucket: "cmsgeekyants.appspot.com",
  messagingSenderId: "197439996343",
  appId: "1:197439996343:web:66d793231a70214179a832",
  databaseURL:'https://cmsgeekyants-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);
const firebaseAuth=getAuth(app);
const database=getDatabase(app)
const firestore=getFirestore(app)
const storage=getStorage(app)
const googleProvider=new GoogleAuthProvider()


const firebaseContext=createContext<FirebaseProviderContextValue|null>(null);

export const FirebaseContextProvider:React.FC<FirebaseContextProviderProps>=({children})=>{

    const [data,setData]=useState<dataState>({
        isLoggedIn:false,
        user:{}
    })

    const signUpWithEmailPassword=(email:string,password:string)=>{
        return createUserWithEmailAndPassword(firebaseAuth,email,password)
    }

    const logInWithEmailAndPassword=(email:string,password:string)=>{
        return signInWithEmailAndPassword(firebaseAuth, email, password)
    }
    const logout=()=>{
        return signOut(firebaseAuth);
    }

    const handleCreateNewListing=async(data:any,user:any)=>{
        // console.log(user,'userrrr')
        const imageRef=ref(storage,`uploads/images/${Date.now()}-${data?.title}`);
        const uploadResult=await uploadBytes(imageRef,data?.image);
        // console.log(data,'yuvrajyuvraj')
          return await addDoc(collection(firestore, "products"), {
            ...data,
            productId: uuid(),
            image:uploadResult.ref.fullPath,
            userID:user.uid,
            userEmail: user.email,
          });
    }

    const signInWithGoogle=async()=>{
        return await signInWithPopup(firebaseAuth,googleProvider);
    }
    const listProducts=()=>{
        return getDocs(collection(firestore,'products'))
    }

    const getProductById=async(productId:string)=>{
        const docRef=doc(collection(firestore,"products"));
        const result=await getDoc(docRef);
        return result;
    }

    const deleteProductById=async(productId:string)=>{
        const docRef=doc(collection(firestore,"products"),productId);
        return await deleteDoc(docRef)
    }

    const updateStock=async(product:Product)=>{
        const docRef = doc(firestore, "products",`${product.productId}`);
        const dataToUpdate={inStock:!product.inStock}
        return await updateDoc(docRef, dataToUpdate);
    }

    const eidtProduct=async(product:Product)=>{
        const productRef = doc(firestore, 'products', `${product.productId}`);
        await updateDoc(productRef,{...product})
    }

    function getImageUrl(path:string,product:Product){
        return getDownloadURL(ref(storage,path))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth,(user) => {
            if (user) {
              console.log(user,'firebase user');
              setData({...data,isLoggedIn:true,user:{...user}})
            } else {
                setData({...data,isLoggedIn:false,user:{}})
            }
          })
          
        return () => unsubscribe();
      }, []);
    
    return <firebaseContext.Provider value={{signInWithGoogle,getImageUrl,eidtProduct,updateStock,deleteProductById,getProductById,listProducts,handleCreateNewListing,signUpWithEmailPassword,data,logInWithEmailAndPassword,setData,logout}}>
        {children}
    </firebaseContext.Provider>
}

export const useFirebaseProvider=()=>useContext(firebaseContext)