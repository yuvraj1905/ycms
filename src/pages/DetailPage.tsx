// import { MdDeleteOutline } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useFirebaseProvider } from '../context/Firebase/Firebase';
// import { useProducts } from '../context/Firebase/Products';
// import { Product } from '../types/Product';
// import Navbar from '../components/navbar/Navbar';
// import toast from "react-hot-toast";
// import NewProductModal from '../components/NewProductModal';


// interface Props{}

// const DetailPage = (props: Props) => {  
//   const {pId}=useParams();
//   const dataContext=useProducts();
//   const [product,setProduct]=useState<Product>({} as Product)
  
//   useEffect(()=>{
//     if(dataContext){
//       const dataFound=dataContext?.data?.find(p=>p.productId==pId);
//       if(dataFound)
//       setProduct({...dataFound})    
//     }
//   },[dataContext.data])
//   console.log(product)

//   const [isEditingMode,setIsEditingMode]=useState(false)
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleEditOptionClick = () => {
//     if (product) {
//       setIsModalOpen(true);
//       setIsEditingMode(true);
//     }
//   };

//   const firebase=useFirebaseProvider()
//   const navigate=useNavigate()
//   const productDeleteHandler=async(id:string|undefined)=>{
//     if(id&&firebase){
//       console.log('delete clicked')
//       try{
//           await firebase.deleteProductById(id);
//           dataContext.dispatch({type:'DeleteProduct',payload:id});
//           toast.success('Product deleted successfully')
//           navigate('/')
          
//       }
//       catch(e){
//         toast.error('Error deleting product.')
//       }
      
//     }
//   }
//   const handleEditProduct=async(values:Product):Promise<any>=>{
//     console.log(values,'handleEditProduct calld')
//     if(firebase){
//       console.log(values,'handleEditProduct inside if')
//       try{
//         const results:any=await firebase?.eidtProduct(values);
//           setIsEditingMode(false)
//           toast.success('Product updated successfully');
//           if(dataContext&&dataContext.productsDataFetcher){
//             await dataContext.productsDataFetcher();
//             return true;
//           }
  
//       }catch(e){
//         console.log('error',e)
//         toast.error("Couldnt update product. Retry with correct inputs.")
//         return false
//       }
//     }
//   }

//   return (
//     <>
//       <Navbar/>
//       <div className='flex items-center justify-center w-full h-screen bg-[#FBFAF7]'>
//         <div className=' rounded-xl m-auto sm:h-[40vh] md:h-[50vh]  w-5/6 relative flex flex-col sm:flex-row md:flex-row justify-between'>
//           <section className='md:w-[48%] sm:w-[48%] w-full  relative h-1/4 mt-8 md:mt-0 sm:mt-0  md:h-full sm:h-full '>
//             <img className='detailImage rounded-xl' src={product?.image} alt="" />
//           </section>
//           <section className="bg-white  mt-4 md:mt-0 sm:mt-0 details w-full md:w-[48%] sm:w-[48%] px-7 py-6 stylishFont flex flex-col justify-between">
//             <h1 className='text-4xl font-semibold'>{product.title}</h1>
//             <p className='text-gray-500 line-clamp-2'>{product.description}</p>
//             <span className='flex items-center gap-1'>
//             <p className='text-gray-500 '>Rating: </p>
//             <p>{product.rating}</p>
//             <p className='text-xs mt-[-2px]'>⭐</p>
//             </span>
//             <h3 className='font-semibold text-xl mt-2'>About Product</h3>
//             <section className='flex flex-col gap-2'>
//                 <div className='flex w-full flex-col md:flex-row sm:flex-row relative justify-between'>
//                   <span className='flex md:w-1/2 sm:w-1/2 w-full gap-2'>
//                     <p className='text-gray-500'>Brand: </p>
//                     <p>{product.brand}</p>
//                   </span>
                  
//                   <span className='flex md:w-1/2 sm:w-1/2 w-full gap-2'>

//                     <p className='text-gray-500'>Key feature: </p>
//                     <p>{product.keyFeature}</p>
//                   </span>
                  
//                 </div>
//                 <div className='flex w-full flex-col md:flex-row sm:flex-row  relative justify-between'>
                 
//                   <span className='flex md:w-1/2 sm:w-1/2 w-full gap-2 '>

//                     <p className='text-gray-500'>Category: </p>
//                     <p>{product.productCategory}</p>
//                   </span>
//                   <span className='flex md:w-1/2 sm:w-1/2 w-full gap-2'>
//                     <p className='text-gray-500'>Availibility: </p>
//                     <p>{product.inStock?'In Stock':"Out of stock"}</p>
//                   </span>
//                 </div>
//             </section>
//             <span className='flex items-center gap-1'>
//               <p>Price: </p>
//               <p className='text-[#CE0102] text-3xl my-2'>{product.price}</p>
//             </span>
//             <section className="flex md:gap-4 sm:gap-4 gap-2">
              
//               <button onClick={handleEditOptionClick} className='btn hover:bg-stone-100'>
//                 <span className="mb-1">
//                   <FaRegEdit/>
//                 </span>
//                    Edit
//               </button>
              
//               <button onClick={(e) =>
//                         {
//                           e.stopPropagation()
//                           productDeleteHandler(product?.productId)
//                         }
//                       } className='btn bg-stone-800 text-white'>
//                 <span className="mb-1">
//                   <MdDeleteOutline/>
//                 </span>
//                    Delete
//               </button>
              
//             </section>
//           </section>
//           <NewProductModal
//         data={product}
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false)
//           setIsEditingMode(false)
//         }}
//         onSubmit={async(values: Product):Promise<any> => {
//           if (isEditingMode) {
//             const res=await handleEditProduct(values);
//             if(res)return Promise.resolve({status:200})
//             else return Promise.resolve({status:400})
//           } 
//         }}
//       />
//       </div>
//       </div>
//     </>
//   )
// }

// export default DetailPage

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFirebaseProvider } from '../context/Firebase/Firebase';
import { useProducts } from '../context/Firebase/Products';
import { Product } from '../types/Product';
import Navbar from '../components/navbar/Navbar';
import toast from "react-hot-toast";
import NewProductModal from '../components/NewProductModal';
import { ProductDetails } from "../components/ProductDetails";

interface Props{}

const DetailPage = (props: Props) => {  
  const { pId } = useParams();
  const dataContext = useProducts();
  const [product, setProduct] = useState<Product>({} as Product);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (dataContext) {
      const dataFound = dataContext?.data?.find(p => p.productId === pId);
      if (dataFound) setProduct({...dataFound});
    }
  }, [dataContext.data]);

  const handleEditOptionClick = () => {
    if (product) {
      setIsModalOpen(true);
      setIsEditingMode(true);
    }
  };

  const firebase = useFirebaseProvider();
  const navigate = useNavigate();

  const productDeleteHandler = async (id: string | undefined) => {
    if (id && firebase) {
      try {
        await firebase.deleteProductById(id);
        dataContext.dispatch({ type: 'DeleteProduct', payload: id });
        toast.success('Product deleted successfully');
        navigate('/');
      } catch (e) {
        toast.error('Error deleting product.');
      }
    }
  };

  const handleEditProduct = async (values: Product): Promise<any> => {
    if (firebase) {
      try {
        const result: any = await firebase?.eidtProduct(values);
        setIsEditingMode(false);
        toast.success('Product updated successfully');
        if (dataContext && dataContext.productsDataFetcher) {
          await dataContext.productsDataFetcher();
          return true;
        }
      } catch (e) {
        console.error('Error:', e);
        toast.error("Couldn't update product. Retry with correct inputs.");
        return false;
      }
    }
  };

  return (
    <>
      <Navbar/>
      <div className='flex items-center justify-center w-full h-screen bg-[#FBFAF7]'>
        <div className='rounded-xl m-auto sm:h-[40vh] md:h-[50vh] w-5/6 relative flex flex-col sm:flex-row md:flex-row justify-between'>
          <section className='md:w-[48%] sm:w-[48%] w-full relative h-1/4 mt-8 md:mt-0 sm:mt-0 md:h-full sm:h-full'>
            <img className='detailImage rounded-xl' src={product?.image} alt="" />
          </section>
          <ProductDetails product={product} handleEditOptionClick={handleEditOptionClick} productDeleteHandler={productDeleteHandler} />
        </div>
      </div>
      <NewProductModal
        data={product}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditingMode(false);
        }}
        onSubmit={async (values: Product): Promise<any> => {
          if (isEditingMode) {
            const res = await handleEditProduct(values);
            return res ? Promise.resolve({ status: 200 }) : Promise.resolve({ status: 400 });
          }
        }}
      />
    </>
  );
};

export default DetailPage;
