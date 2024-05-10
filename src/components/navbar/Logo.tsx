import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <p style={{fontFamily:'Monoton,cursive'}} className="font-monoton text-3xl hover:text-red-800 cursor-pointer text-center transition">
        YCMS
      </p>
    </Link>
  );
};

export default Logo;
