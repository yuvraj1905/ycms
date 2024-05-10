import { Product } from "./Product";

export interface FirebaseContextProviderProps{
    children:React.ReactNode;
}

export interface dataState{
    isLoggedIn:boolean,
    user:{
        
    }
}

export interface FirebaseProviderContextValue{
    signUpWithEmailPassword:(email:string,password:string)=>Promise<any>,
    data:{
        isLoggedIn:boolean,
        user:any
    },
    logout:()=>Promise<any>,
    logInWithEmailAndPassword:(email:string,password:string)=>Promise<any>,
    setData:(data:dataState|((prevData:dataState)=>dataState))=>void,
    handleCreateNewListing:(data:any,user:any)=>Promise<any>;
    listProducts:()=>Promise<any>;
    getProductById:(productId:string)=>Promise<any>;
    deleteProductById:(productId:string)=>Promise<any>;
    updateStock:(product:Product)=>Promise<any>;
    eidtProduct:(product:Product)=>Promise<any>;
    getImageUrl:(path:any,product:Product)=>Promise<any>
    signInWithGoogle:()=>Promise<any>
    
}

