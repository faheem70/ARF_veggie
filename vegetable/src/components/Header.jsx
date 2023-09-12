import React, { useState } from 'react';
import logo from "../assest/logo.jpg";
import { Link } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import { HiOutlineUserCircle, HiOutlineLogout } from "react-icons/hi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import "../styles/header.css";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      toast("Logout Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
      <div className='flex items-center h-full justify-between'>
        <Link to={""}>
          <div className="h-10">
            <img src={logo} className="h-full" alt='logo' />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex ">
            <Link to={""} className="nav-link">Home</Link>
            <Link to={"menu/646a6c20d2cbd5c7764a20e9"} className="nav-link">Menu</Link>
            <Link to={"about"} className="nav-link">About</Link>
            <Link to={"contact"} className="nav-link">Contact</Link>
          </nav>
          <div
            className='text-1xl text-slate-600 relative'
            onMouseEnter={handleShowMenu}
            onMouseLeave={handleHideMenu}
          >
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {user ? (
                <HiOutlineLogout />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className='absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[50px] text-center header-menu '>
                {
                  user?.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer px-2'>New product</Link>
                }
                {
                  (user || user?.email) ? <p className='cursor-pointer text-white bg-blue-500 px-2' onClick={handleLogout}>Logout ({user?.email})</p> : <Link to={'login'} className='whitespace-nowrap cursor-pointer px-2'>Login</Link>
                }
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className='px-2 py-1'>Home</Link>
                  <Link to={"menu/646a6c20d2cbd5c7764a20e9"} className='px-2 py-1'>Menu</Link>
                  <Link to={"about"} className='px-2 py-1'>About</Link>
                  <Link to={"contact"} className='px-2 py-1'>Contact</Link>
                </nav>
              </div>
            )}
          </div>
          <div className='text-2xl text-slate-600'>
            <Link to={"cart"}>
              <BsCartFill />
              <div className='"absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center  '>{cartItemNumber.length}</div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
