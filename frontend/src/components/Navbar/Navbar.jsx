import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/pritam/logo.jpg.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaUser, FaHeart, FaBars, FaBagShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import axios from "axios";
import { GiHeartEarrings } from "react-icons/gi";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 3,
    name: "Bracelets",
    link: "/#",
  },
  {
    id: 4,
    name: "Earrings",
    link: "/#",
  },
  {
    id: 5,
    name: "Necklace Sets",
    link: "/#",
  },
];

export default function Navbar({ handleOrderPopup }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggles dropdown visibility
  };

  const [isOpen, setIsOpen] = useState(false); // Hamburger menu toggle
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let navigation = useNavigate();
  let { auth, logout } = useContext(UserContext);
  const [inp, setInp] = useState('');
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState([]);

  // async function getCategory() {
  //   let result = await axios.get('https://actl.co.in/suchit/categoryget');
  //   setCategory(result.data);
  // }

  // useEffect(() => {
  //   getCategory();
  // }, []);

  useEffect(() => {
    if (inp) {
      navigation(`/find/${inp}`);
    }
  }, [inp]);

  function handlelogout() {
    logout();
    window.location.reload();
  }

  async function getData() {
    if (auth.username) {
      let user = auth.username.email;
      let result = await axios.get(`https://actl.co.in/suchit/getOrderByEmail/${user}`);
      setOrder(result.data);
    }
  }

  useEffect(() => {
    getData();
  }, [auth.username]);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-black py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-2 relative">
              <img
                src={Logo}
                alt="Logo"
                className="w-24 top-0 md:w-36 md:h-auto"
              />
            </a>
          </div>

          {/* Hamburger Icon */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-3xl text-primary dark:text-white"
            >
              <FaBars />
            </button>
          </div>

          {/* Search bar with icons, visible only on larger screens */}
          <div className="hidden sm:flex justify-between items-center gap-4">
            <div className="relative group flex items-center gap-4">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-black dark:border-gray-500 dark:bg-gray-800"
                value={inp}
                onChange={(e) => setInp(e.target.value)}
              />
              {auth.username ? <div className='flex items-center gap-6'><span className='uppercase text-2xl font-bold flex items-center gap-2'> <FaUser className="text-black dark:text-white text-2xl" /> {auth.username.name}</span><button className='p-2 rounded-lg bg-black text-white font-[600]' onClick={handlelogout}>Logout</button></div> : <Link to="/signinsignup" className="p-2 rounded-lg bg-black text-white font-[600]">
                Sign In/Sign Up
              </Link>}
            </div>

            {/* Order button */}
            <Link
              to="/cart"
              className="bg-gradient-to-r from-black to-gray-300 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Cart
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </Link>
            <Link
              to="/wishlist"
              className="bg-gradient-to-r from-black to-gray-300 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Wishlist
              </span>
              <FaHeart className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </Link>
            {order.length > 0 ? <Link
              to="/yourorder"
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <FaBagShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </Link> : ''}
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="flex justify-center py-2">
        <ul className="sm:flex hidden items-center gap-4">
          <Link to='/' className="inline-block px-4 hover:text-gray-600 duration-200">Home</Link>
          {category &&
            category.map((item) => (
              <Link to={`/view/${item.categoryName}`} className="inline-block px-4 hover:text-gray-600  duration-200">{item.categoryName}</Link>
            ))}
          <Link to='/about' className="inline-block px-4 hover:text-gray-600  duration-200">About</Link>
          <Link to='/contact' className="inline-block px-4 hover:text-gray-600  duration-200">Contact Us</Link> {/* Added Contact Us link */}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isOpen ? "block" : "hidden"
          } sm:hidden bg-white dark:bg-gray-900 p-4 w-full transition-all duration-300`}
      >
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="search"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800"
          />

          {auth.username ? <div className='flex items-center gap-6'><span className='uppercase text-2xl font-bold flex items-center gap-2'> <FaUser className="text-primary dark:text-white text-2xl cursor-pointer" /> {auth.username.name}</span><button className='p-2 rounded-lg bg-primary text-white font-[600]' onClick={handlelogout}>Logout</button></div> : <Link to="/signinsignup" onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg bg-primary text-white font-[600]">
            Sign In/Sign Up
          </Link>}
          <Link
            to='/cart'
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
          >
            Cart
            <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
          </Link>
          <Link
            to='/wishlist'
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
          >
            Wishlist
            <FaHeart className="text-xl text-white drop-shadow-sm cursor-pointer" />
          </Link>
          <Link
            to='/yourorder'
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
          >
            Orders
            <FaBagShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
          </Link>
          <Link
            to='/about'
            onClick={() => setIsOpen(!isOpen)}
            className="block px-4 py-2 hover:text-primary duration-200"
          >
            About
          </Link>
          <Link
            to='/contact' // Contact Us link for mobile menu
            onClick={() => setIsOpen(!isOpen)}
            className="block px-4 py-2 hover:text-primary duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
