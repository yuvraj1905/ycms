import { FaRegEdit } from "react-icons/fa";
import { Product } from "../types/Product";
import { MdDeleteOutline } from "react-icons/md";

export const ProductDetails = ({ product, handleEditOptionClick, productDeleteHandler }: { product: Product, handleEditOptionClick: () => void, productDeleteHandler: (id: string | undefined) => void }) => {
    return (
      <section className="bg-white mt-4 md:mt-0 sm:mt-0 details w-full md:w-[48%] sm:w-[48%] px-7 py-6 stylishFont flex flex-col justify-between">
        <h1 className='text-4xl font-semibold'>{product.title}</h1>
        <p className='text-gray-500 line-clamp-2'>{product.description}</p>
        <span className='flex items-center gap-1'>
          <p className='text-gray-500 '>Rating: </p>
          <p>{product.rating}</p>
          <p className='text-xs mt-[-2px]'>⭐</p>
        </span>
        <h3 className='font-semibold text-xl mt-2'>About Product</h3>
        <section className='flex flex-col gap-2'>
          <div className='flex w-full flex-col md:flex-row sm:flex-row relative justify-between'>
            <span className='flex md:w-1/2 sm:w-1/2 w-full gap-2'>
              <p className='text-gray-500'>Brand: </p>
              <p>{product.brand}</p>
            </span>
            <span className='flex md:w-1/2 sm:w-1/2 w-full gap-2'>
              <p className='text-gray-500'>Key feature: </p>
              <p>{product.keyFeature}</p>
            </span>
          </div>
          <div className='flex w-full flex-col md:flex-row sm:flex-row relative justify-between'>
            <span className='flex md:w-1/2 sm:w-1/2 w-full gap-2 '>
              <p className='text-gray-500'>Category: </p>
              <p>{product.productCategory}</p>
            </span>
            <span className='flex md:w-1/2 sm:w-1/2 w-full gap-2'>
              <p className='text-gray-500'>Availability: </p>
              <p>{product.inStock ? 'In Stock' : 'Out of stock'}</p>
            </span>
          </div>
        </section>
        <span className='flex items-center gap-1'>
          <p>Price: </p>
          <p className='text-[#CE0102] text-3xl my-2'>{product.price}</p>
        </span>
        <section className="flex md:gap-4 sm:gap-4 gap-2">
          <button onClick={handleEditOptionClick} className='btn hover:bg-stone-100'>
            <span className="mb-1">
              <FaRegEdit/>
            </span>
            Edit
          </button>
          <button onClick={() => productDeleteHandler(product.productId)} className='btn bg-stone-800 text-white'>
            <span className="mb-1">
              <MdDeleteOutline/>
            </span>
            Delete
          </button>
        </section>
      </section>
    );
  };
  
  