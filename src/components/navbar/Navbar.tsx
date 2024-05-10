import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import defaultUser from "../../assets/defaultUser.png";
import MenuDropdown from "./MenuDropdown";
import Logo from "./Logo";
import { useFirebaseProvider } from "../../context/Firebase/Firebase";
import { TbLogin } from "react-icons/tb";
import { TbLogin2 } from "react-icons/tb";
import toast from "react-hot-toast";
import { useProducts } from "../../context/Firebase/Products";




const Navbar: React.FC = () => {
  
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [colorChange, setColorChange] = useState<boolean>(false);

  const firebase=useFirebaseProvider();
  const productContext=useProducts()

  const [loggedIn,setIsLoggedIn]=useState(firebase?.data.isLoggedIn)

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  const loginLogoutHandler=async()=>{
    if(loggedIn&&firebase){
      try{
        const res=await firebase?.logout();
        const {data,setData}=firebase;
        setData({...data,isLoggedIn:false,user:{}});
        if(productContext)productContext.dispatch({type:'dataRemover'})
        toast.success('Logout successful !')
        navigate('/login')

      }catch(e){
        toast.error('An error occured.')
      }
    }
    else if(!loggedIn){
      navigate('/login')
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);

    return () => {
      window.removeEventListener("scroll", changeNavbarColor);
    };
  }, []);

  return (
    <nav className={` z-10 bg-white flex flex-col sm:flex-row py-3 max-w-screen mb-3 fixed left-0 right-0 px-[4%] md:px-[10%] bg-[--theme-color] ${colorChange ? "shadow-sm drop-shadow-sm" : ""} z-10 transition delay-75 ease-in-out`}>
      <div className="flex justify-between w-full items-center">
        <section className="relative flex items-center">
          <Link to="/profile">
            <img
              className="rounded-full border-2 bg-yellow-300 me-3 hover:bg-yellow-500 cursor-pointer"
              src={firebase?.data?.user?.photoURL?firebase?.data?.user?.photoURL:'https://png.pngtree.com/png-clipart/20190924/original/pngtree-boy-user-avatar-vector-icon-free-png-image_4827808.jpg'}
              alt="userProfileImage"
              width={40}
            />
            
          </Link>
          <Logo />
        </section>
        
        <section className="flex items-center">
          
          <ul className="hidden md:flex justify-between text-2xl ps-1">
            
            <li
              className="relative bg-[#e0e9fb] text-[#CE0100] p-2 rounded-full hover:bg-[#c4d5f8] cursor-pointer mx-2 transition shadow-sm"
              onClick={loginLogoutHandler}
            >
              {loggedIn?<TbLogin2 title="logout" color="black"/>:<TbLogin title="login" color="black"/>}
              
            </li>
          </ul>
          <section className="md:hidden cursor-pointer relative">
            <RxHamburgerMenu
              className="text-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && <MenuDropdown navigate={navigate} onClickHandlerFn={loginLogoutHandler} isLoggedIn/>}
          </section>
        </section>
      </div>
      
    </nav>
  );
};

export default Navbar;
