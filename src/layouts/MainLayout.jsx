import { Outlet } from  "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { store } from "../assets/redux/store";
import { Provider } from "react-redux";

import { Toaster } from "react-hot-toast";
import ScrollToTop from "../components/Scrolltop";
export default function MainLayout() {
  return (
    
    <Provider store={store}>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </Provider>
    
  )
}


