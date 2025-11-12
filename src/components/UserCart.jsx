import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  createOrderAPI,
} from "../services/allAPI";
import { CartContext } from "../context/CartContext"; 
import SERVER_URL from "../services/serverUrl";

const UserCart = () => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext); 

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await getCartAPI();
      setCartData(res.data);

      //  update global count
      const totalQty =
        res?.data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      setCartCount(totalQty);
    } catch (err) {
      console.error("getCart error:", err);
      setCartData({ items: [], grandTotal: 0 });
      setCartCount(0); 
    } finally {
      setLoading(false);
    }
  };

  const cart = cartData?.items || [];

  const handleQtyUpdate = async (productId, action) => {
    try {
      const res = await updateCartItemAPI(productId, action);
      if (res?.data?.cart) {
        setCartData(res.data.cart);

        const totalQty =
          res?.data?.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ||
          0;
        setCartCount(totalQty);
      } else {
        await fetchCart();
      }
    } catch (err) {
      console.error("update qty error:", err);
      await fetchCart();
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await removeCartItemAPI(productId);

      if (res?.data?.cart) {
        setCartData(res.data.cart);

        //  recompute total count
        const totalQty =
          res?.data?.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ||
          0;
        setCartCount(totalQty);
      } else {
        await fetchCart();
      }

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("remove item error:", err);
    }
  };

  const openCheckout = () => {
    setShippingAddress("");
    setPaymentMethod("Cash on Delivery");
    setShowCheckout(true);
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const payload = {
        shippingAddress: shippingAddress || "Default Shipping Address",
        paymentMethod: paymentMethod || "Cash on Delivery",
      };

      const res = await createOrderAPI(payload);

      if (res.status === 201) {
        const orderId = res.data?.order?._id;

        await fetchCart();
        setShowCheckout(false);
        alert("Order placed successfully!");

        setCartCount(0);
        window.dispatchEvent(new Event("cartUpdated"));

        if (orderId) {
          navigate(`/orders/details/${orderId}`);
        }
      } else {
        await fetchCart();
      }
    } catch (err) {
      console.error("place order error:", err);
      alert("Failed to place order.");
      await fetchCart();
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      <section className="w-full bg-white dark:bg-[#0A2025] py-9 px-4 sm:px-8">
        <h1 className="text-center text-[#191919] dark:text-white text-2xl sm:text-[32px] font-semibold leading-[38px]">
          My Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row items-start mt-8 gap-6">
          <div className="bg-white p-4 w-full lg:w-[800px] rounded-xl overflow-x-auto">
            <table className="w-full min-w-[600px] bg-white rounded-xl">
              <thead>
                <tr className="text-center border-b border-gray-400 text-[#7f7f7f] text-xs sm:text-sm font-medium uppercase leading-[14px] tracking-wide">
                  <th className="text-left px-2 py-2">Product</th>
                  <th className="px-2 py-2">Price</th>
                  <th className="px-2 py-2">Quantity</th>
                  <th className="px-2 py-2">Subtotal</th>
                  <th className="w-7 px-2 py-2"></th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8">Loading...</td>
                  </tr>
                ) : cart.length > 0 ? (
                  cart.map((item, index) => (
                    <tr className="text-center " key={index}>
                      <td className="px-2 py-2 text-left align-top">
                        <img
                          src={`${SERVER_URL}/${item.images?.[0]}`}
                          alt="Product"
                          className="w-[70px] sm:w-[100px] h-[70px] sm:h-[100px] mr-2 inline-block rounded object-contain"
                        />
                        <span className="text-sm sm:text-base break-words">{item.name}</span>
                      </td>

                      <td className="px-2 py-2 text-sm sm:text-base">₹{item.price}</td>

                      <td className="p-2 bg-white rounded-[170px] border border-[#a0a0a0] justify-around items-center flex mt-9 ">
                        <svg
                          width="14"
                          height="15"
                          className="cursor-pointer"
                          onClick={() => handleQtyUpdate(item.productId, "dec")}
                        >
                          <path d="M2.33398 7.5H11.6673" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                        <span className="w-10 text-center text-[#191919] text-base">{item.quantity}</span>

                        <svg
                          width="14"
                          height="15"
                          className="cursor-pointer"
                          onClick={() => handleQtyUpdate(item.productId, "inc")}
                        >
                          <path d="M2.33398 7.5H11.6673M7.00065 2.833V12.166" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </td>

                      <td className="px-2 py-2 text-sm sm:text-base">₹{item.subtotal}</td>

                      <td className="px-2 py-2">
                        <div onClick={() => handleRemove(item.productId)} className="cursor-pointer inline-block">
                          <svg width="24" height="25">
                            <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="#CCC" />
                            <path d="M16 8.5L8 16.5M16 16.5L8 8.5" stroke="#666" strokeWidth="1.5" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No items in cart</td>
                  </tr>
                )}
              </tbody>

              <tfoot>
                <tr className="border-t border-gray-400">
                  <td colSpan="3" className="px-2 py-2">
                    <Link to="/" className="px-6 sm:px-8 py-3 bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold">Return to shop</Link>
                  </td>
                  <td colSpan="2" className="px-2 py-2">
                    <button className="px-6 sm:px-8 py-3 bg-[#9ff0a2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold"><Link to="/orders/my-orders">OrderDetails</Link></button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="w-full lg:w-[424px] bg-white rounded-lg p-6">
            <h2 className="text-[#191919] mb-2 text-lg sm:text-xl font-medium">Cart Total</h2>

            <div className="py-3 flex justify-between items-center">
              <span className="text-[#4c4c4c] text-sm sm:text-base">Subtotal</span>
              <span className="text-[#191919] text-base font-semibold">₹{cartData?.grandTotal?.toFixed(2) || "0.00"}</span>
            </div>

            <div className="py-3 flex justify-between border-b">
              <span className="text-[#4c4c4c] text-sm">Shipping</span>
              <span className="text-[#191919] text-sm">Free</span>
            </div>

            <div className="py-3 flex justify-between border-b">
              <span className="text-[#4c4c4c] text-sm">Total</span>
              <span className="text-[#191919] text-sm font-medium">₹{cartData?.grandTotal?.toFixed(2) || "0.00"}</span>
            </div>

            <button className="w-full text-white mt-5 py-4 bg-[#00b206] rounded-[44px] text-base font-semibold" onClick={openCheckout} disabled={(cart || []).length === 0}>
              Proceed to place order
            </button>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-md w-[420px] p-6">
            <h3 className="text-lg font-semibold mb-3">Checkout</h3>
            <p className=""><span className="text-red-600"><i className="fa-solid fa-exclamation"></i></span>After Placing order you can't edit anything</p>

            <label className="block text-sm text-gray-600">Shipping Address</label>
            <textarea
              rows="3"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              placeholder="Enter shipping address"
            />

            <label className="block text-sm text-gray-600">Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded mb-4">
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit/Debit Card</option>
              <option>Net Banking</option>
            </select>

            <div className="flex gap-3 justify-end">
              <button className="px-4 py-2 rounded border" onClick={() => setShowCheckout(false)}>Cancel</button>
              <button className="px-4 py-2 rounded bg-green-600 text-white" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
                {isPlacingOrder ? "Placing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCart;
