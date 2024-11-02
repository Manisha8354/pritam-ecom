import React from 'react'
import { Outlet } from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AOS from "aos";
import "aos/dist/aos.css";
export default function Layout() {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <UserContextProvider>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </UserContextProvider>
  )
}
