import { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import fallbackLoad from "./assets/fallback.gif";
import Auth from "./components/Auth";
import ProductDetails from "./components/ProductDetails";
import UserCart from "./components/UserCart";
import OrderDetails from "./components/OrderDetails";
import AdminPortal from "./components/AdminPortal";
import AddProducts from "./components/AddProducts";
import AllUsers from "./components/AllUsers";
import Categories from "./components/Categories";
import User from "./components/User";
import AllOrdersByUser from "./components/AllOrdersByUser";
import Pnf from "./pages/Pnf";
import { getCartItemsAPI } from "./services/allAPI";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderDetByAdmin from "./components/OrderDetByAdmin";
import AdminAllOrders from "./components/AdminAllOrders";

const Landing = lazy(() => import("./pages/Landing"));

function App() {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await getCartItemsAPI();
      if (res?.data?.cartItems) {
        setCartCount(res.data.cartItems.length);
      }
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };
  useEffect(() => {
    fetchCartCount();

    const handleCartUpdated = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => window.removeEventListener("cartUpdated", handleCartUpdated);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <img src={fallbackLoad} alt="Page loading..." className="w-60 h-60 animate-pulse" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />


          <Route path="/register" element={<Auth insideRegister={true} />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/user/singleProduct/:id" element={<ProductDetails />} />
          <Route path="/user/cart" element={<UserCart />} />
          <Route path="/orders/details/:orderId" element={<OrderDetails />} />
          <Route path="/orders/my-orders" element={<AllOrdersByUser />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adminPortal" element={<AdminPortal />}>
            <Route path="dashboard" element={<AddProducts isAdminAddPrdt={false} />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<AdminAllOrders />} />
            <Route path="order/:orderId" element={<OrderDetByAdmin />} />
          </Route>
          <Route path="/*" element={<Pnf />} />
        </Routes>
      </Suspense>
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
