import React from "react";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbLogin, TbLogin2 } from "react-icons/tb";

interface MenuDropdownProps {
  navigate: (path: string) => void;
  onClickHandlerFn:()=>void;
  isLoggedIn:boolean
}   

const MenuDropdown: React.FC<MenuDropdownProps> = ({ navigate,onClickHandlerFn,isLoggedIn }) => {
  return (
    <div className="absolute right-0 z-10 bg-amber-50 font-semibold rounded-lg shadow w-max overflow-hidden transition-all">
      <ul className="text-sm">
        <li onClick={()=>{}}>
          <span onClick={onClickHandlerFn} className="flex items-center px-5 py-3 hover:bg-amber-100">
            {isLoggedIn?<><TbLogin2 title="logout" className="text-lg me-3" color="black"/>Logout</>:<><TbLogin className="text-lg me-3" title="login" color="black"/>Login</>}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MenuDropdown;
