import React, { useEffect, useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Product } from '../types/Product';
import Header from '../components/navbar/Navbar';
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import NewProductModal from '../components/NewProductModal';
import { useNavigate } from 'react-router-dom';
import { useFirebaseProvider } from '../context/Firebase/Firebase';
import { useProducts } from '../context/Firebase/Products';
import StatsCalculator from '../utils/StatsCalculator';
import toast from 'react-hot-toast';

// const initialProducts: Product[] = dummyData;
const initialProducts: Product[] = [];

const Home: React.FC = () => {
  // const [loggingIn, setLoggingIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const dataContext=useProducts();
  const [stats,setStats]=useState({totalProducts:0,flagshipProducts:0,outOfStockItems:0,demandedBrand:0});

  const [editVisible, setEditVisible] = useState(false);
  const [editPosition, setEditPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const editOptionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editOptionRef.current && !editOptionRef.current.contains(event.target as Node)) {
        setEditVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleRightClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, product: Product) => {
    event.preventDefault(); 
    setSelectedItem(product);
    setEditVisible(true);
    setEditPosition({ x: event.clientX, y: event.clientY });
  };

  const [isEditingMode,setIsEditingMode]=useState(false)
  
  const handleEditOptionClick = () => {
    if (selectedItem) {
      setIsModalOpen(true);
      setIsEditingMode(true);
      console.log('Editing item:', selectedItem);
    }
    setEditVisible(false);
  };

  const getItemTopPosition = () => {
    if (selectedItem && typeof selectedItem.productId === 'string') {
      return parseInt(selectedItem.productId, 10) * 30;
    }
    return 0;
  };
  
  useEffect(()=>{
    if(dataContext?.data?.length>0&&dataContext.data[0]){
      console.log(dataContext.data,'data cntext datataa')
      setProducts([...dataContext.data]);
      const {totalProducts,flagshipProducts,outOfStockItems,demandedBrand}=StatsCalculator(dataContext.data)
      setStats({...stats,totalProducts,flagshipProducts,outOfStockItems,demandedBrand})
      setFilteredProducts([...dataContext.data]);
    }else if(dataContext?.data?.length===0){
      setProducts([]);
      setStats({totalProducts:0,flagshipProducts:0,outOfStockItems:0,demandedBrand:0})
      setFilteredProducts([]);
    }
  },[dataContext.data])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sort, setSort] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 10;
  const firebase=useFirebaseProvider()


  const handleCreateNewProduct = async(values: Product):Promise<any> => {
    console.log('New product data:', values);
    if(firebase&&firebase.data.user){
      console.log(firebase.data.user,'userrrrrrrr')
      try{
        const results:any=await firebase?.handleCreateNewListing(values,firebase.data.user);
        if(results){
          toast.success('Product added successfully');
          if(dataContext&&dataContext.productsDataFetcher){
            await dataContext.productsDataFetcher()
          }
          return true;
        }
      }catch(e){
        console.log('error',e)
        toast.error("Couldnt add product. Retry with correct inputs.")
        return false;
      }
    }

};


const handleEditProduct=async(values:Product):Promise<any>=>{
  console.log(values,'handleEditProduct calld')
  if(firebase){
    console.log(values,'handleEditProduct inside if')
    try{
      const results:any=await firebase?.eidtProduct(values);
        setIsEditingMode(false)
        toast.success('Product updated successfully');
        if(dataContext&&dataContext.productsDataFetcher){
          await dataContext.productsDataFetcher();
          return true;
        }

    }catch(e){
      console.log('error',e)
      toast.error("Couldnt update product. Retry with correct inputs.")
      return false
    }
  }
}
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleInStock = async(product: Product) => {
    if(firebase){
      try {
        const results=await firebase.updateStock(product)
        dataContext.dispatch({type:'toggleInStock',payload:product.productId})
        toast.success('Stock updated !')
      } catch (error) {
        toast.error('Error updating the stock.')
      }
    }
  };

  

  useEffect(()=>{
    if(products?.length>0){
    let updatedData=sort==='asc'?products.sort((a, b) => a.price - b.price):sort==='dsc'?products.sort((a, b) => b.price - a.price):[...products];

    updatedData=updatedData?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())||
      product.productCategory.toLowerCase().includes(searchTerm.toLowerCase()));
      
    setFilteredProducts([...updatedData]);
  }
  },[sort,searchTerm])

  const navigate=useNavigate()

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  console.log(filteredProducts)
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(()=>{
    if(!firebase?.data.isLoggedIn){
      navigate('/login')
    }
  },[firebase,navigate])

  console.log(currentProducts,'currentprocduct')

  if(!dataContext?.data){
    return null;
  } 

  const productDeleteHandler=async(id:string|undefined)=>{
    if(id&&firebase){
      console.log('delete clicked')
      try{
          await firebase.deleteProductById(id);
          dataContext.dispatch({type:'DeleteProduct',payload:id});
          toast.success('Product deleted successfully')
          
      }
      catch(e){
        toast.error('Error deleting product.')
      }
      
    }
  }
  


  return (
    <div className="bg-gray-100 min-h-screen ">
      <Header />
      <div className="w-4/5 pt-20 container mx-auto px-0 py-8 relative">
        <div className='flex flex-col gap-3 w-full relative mt-4'>
          <h1 className='font-semibold text-3xl stylishFont'>Glance to Stats</h1>
          <div className='stylishFont flex justify-between items-center overflow-x-auto no-scrollbar  gap-4 md:gap-0'>
            <span style={{borderRadius:'6px'}} className='bg-gradient-to-r from-blue-500 to-green-500 rounded-xl py-3 px-14 flex items-center gap-2'>
              <p className='text-white pt-2 font-bold text-6xl'>{stats?.totalProducts||0}</p>
              <span>
              <h3 className='font-semibold text-white '>Total products</h3>

              </span>
            </span>
            <span style={{borderRadius:'6px'}} className='bg-gradient-to-r from-[#A054F2] to-[#DF6ADE] rounded-xl py-3 px-14 flex items-center gap-2'>
              <p className='text-white pt-2 font-bold text-6xl'>{stats?.flagshipProducts||0}</p>
              <h3 className='font-semibold text-white'>Flagship products</h3>
            </span>
            <span style={{borderRadius:'6px'}} className='bg-gradient-to-r from-[#9167FC] to-[#5AC7F2] rounded-xl py-2.5 px-14 flex items-center gap-2 sm:py-3 md:py-3'>
              <p className='text-white pt-2 font-bold text-6xl'>{stats?.outOfStockItems||0}</p>
              <span>
              <h3 className='font-semibold text-white hidden md:block'>Items</h3>
              <h3 className='font-semibold text-white'>Out of stock</h3>
              </span>
            </span>
            <span style={{borderRadius:'6px'}} className='bg-gradient-to-r from-[#FFB227] to-[#F782A7] rounded-xl py-3 px-10 flex items-center gap-2'>
              <p className='text-white pt-2 font-bold text-6xl'>{stats?.demandedBrand||0}</p>
              <span>
              <h3 className='font-semibold text-white'>Most</h3>
              <h3 className='font-semibold text-white'>Demanded</h3>
              </span>
            </span>
          </div>
        </div>
        <div className='bg-[#dde7ef] boxs1 flex justify-between items-center mt-8 py-2 sm:py-0 md:py-0'>
          <h3 className='stylishFont py-3 px-4 font-semibold text-2xl md:px-8 hidden sm:block md:block'>Dashboard</h3>
        <span  className='flex justify-between items-center pr-3 flex-none w-full sm:w-1/2 md:w-1/2'>
        <span className='flex items-center relative w-[90%] sm:w-2/3 md:w-2/3'>
        <input
          type="text"
          placeholder="Search products by title,category or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="borRad w-full border ml-3 sm:ml-0 md:ml-0 border-gray-300 p-2 md:p-2  focus:outline-none focus:ring focus:border-blue-400 text-xs sm:text-[1rem] md:text-[1rem]" 
          />
          <CiSearch className='absolute right-2 hidden md:block sm:block' size={24}/>
          </span>
        <label>
      <select
        name="sortBy"
        value={sort}
        className="w-max py-2 borRad px-2 rounded-md cursor-pointer shadow-md hover:shadow-lg hidden md:block"
        onChange={(e)=>{
          setSort(e.target.value);

        }}
      >
        <option value="" defaultValue="" disabled>
          Sort By Price
        </option>
        <option value="asc" className="">
          Low to High
        </option>
        <option value="dsc" className="">
          High to Low
        </option>
      </select>
    </label>
    <IoMdAdd onClick={() => setIsModalOpen(true)} size={30} className='bg-white font-bold p-1 mr-[-0.25rem] borRad cursor-pointer hover:bg-[#64BAF3] hover:text-white '/> 
    <NewProductModal
        data={isEditingMode ? selectedItem : null}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setIsEditingMode(false)
        }}
        onSubmit={async(values: Product):Promise<any> => {
          if (isEditingMode) {
            const res=await handleEditProduct(values);
            if(res)return Promise.resolve({status:200})
            else return Promise.resolve({status:400})
          } else {
            const res=await handleCreateNewProduct(values);
            if(res)return Promise.resolve({status:200})
            else return Promise.resolve({status:400})            }
          
        }}
      />


        </span>
        </div>
        {currentProducts?.length===0?<img className='noDataImg w-full h-1/2 sm:h-full md:h-full' src='https://assets-v2.lottiefiles.com/a/077fd360-1176-11ee-9d1e-f7f23a408c09/JkAf72TAR0.gif' alt='noDataOmg'/>:<><div className="overflow-x-auto mt-1 border-b-4 border-[#DDE7EF]">
          <table className="w-full table-auto">
            <thead>
              <tr className=" bg-gray-200">
                <th className="py-3 px-4 text-center">Index</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-center">Thumbnail</th>
                <th className="py-3 px-4 text-center">Category</th>
                <th className="py-3 px-4 text-center">Brand</th>
                <th className="py-3 px-4 text-center">Price</th>
                <th className="py-3 px-4 text-center">In Stock</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product,i:number) => (
                <tr onContextMenu={e => handleRightClick(e, product)} onClick={(e)=>{
                  if (e.nativeEvent.button === 2){
                    console.log('right clickedddd');
                    return
                  }
                  navigate(`/details/${product.productId}`)
                }} key={product.productId} className="border-b border-gray-100 boxs2 cursor-pointer relative">
                  <td className="py-4 px-4 text-center">{i+1}</td>
                  <td className="py-4 px-4 text-left">{product.title}</td>
                  <td className="py-4 px-4 flex justify-center"><img className='previewImg' src={product.image} alt="thumbnail"/></td>
                  <td className="py-4 px-4 text-center">{product.productCategory}</td>
                  <td className="py-4 px-4 text-center">{product.brand}</td>
                  <td className="py-4 px-4 text-center">{product.price}</td>
                  <td className="py-4 px-4 text-center">
                    <button
                      className={`relative ${
                        product.inStock
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      } w-14 h-8 rounded-full overflow-hidden`}
                      onClick={(e) =>{
                        e.stopPropagation();
                        product.productId&& toggleInStock(product)
                      }}
                    >
                      <span
                        className={`absolute left-0 top-0 h-full w-7 bg-white rounded-full shadow transform transition-transform ${
                          product.inStock ? 'translate-x-full' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={(e) =>
                        {
                          e.stopPropagation()
                          productDeleteHandler(product?.productId)
                        }
                      }
                      className="p-2 bg-red-500 text-white borRad hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {editVisible && selectedItem && (
        <div ref={editOptionRef} style={{ position: 'absolute', top: editPosition.y+5, left: editPosition.x-110 }}>
          <button className='bg-stone-700 text-white py-2 px-4 rounded-xl hover:bg-stone-600' onClick={handleEditOptionClick}>Edit</button>
        </div>
      )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 mx-2"
              >
                {index + 1}
              </button>
            )
          )}
        </div></>}
      </div>
    </div>
  );
};

export default Home;
