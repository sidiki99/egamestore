import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import PCGames from "./pages/PCGames";
import OrderDetails from "./pages/ProductDetails";
import PlayStation from "./pages/PlayStation";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { ToastContainer } from "react-toastify";
import Orders from "./pages/Orders";
import OrderItems from "./pages/OrderItems";
import Signup from "./pages/Signup";
import BlogDetails from "./pages/BlogDetails";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import OrdersChart from "./components/OrdersChart";
import AdminGames from "./pages/AdminGames";
import AdminUsers from "./pages/AdminUsers";
import PageNotFound from "./pages/PageNotFound";
import ForgetPassword from "./pages/ForgetPassword";
import ChangePassword from "./pages/ChangePassword";


function App() {
  return (
    <div>
      <ToastContainer/>
     <Routes>
        <Route element={<MainLayout />}>
         
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pc-games" element={<PCGames />}></Route>
          <Route path="/game/:id" element={<OrderDetails />}></Route>
          <Route path="/play-station" element={<PlayStation />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />}/>
          <Route path="/order/:id" element={<OrderItems />}></Route>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/profile" element={<Profile />}/>
      
          <Route path="/admin" element={<AdminDashboard />}/>
          <Route path="/admin-orders" element={<AdminOrders/>}/>
           <Route path="/orders-chart" element={<OrdersChart/>}/>
           <Route path="/admin-games" element={<AdminGames/>}/>
           <Route path="/admin-users" element={<AdminUsers/>}/>
           <Route path="/*" element={<PageNotFound/>}/>
           <Route path="/forget-password" element={<ForgetPassword/>}/>
           <Route path="/change-password" element={<ChangePassword/>}/>
           
          </Route>
      </Routes>
    </div>
  )
}

export default App
