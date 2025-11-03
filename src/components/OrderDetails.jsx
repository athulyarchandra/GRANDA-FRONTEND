import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderDetailsAPI, cancelOrderAPI } from "../services/allAPI";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const res = await getOrderDetailsAPI(orderId);
      if (res.status === 200) {
        setOrder(res.data.order);
        console.log(res.data.order);
        

      }else{
        console.log("error");
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      const res = await cancelOrderAPI(orderId);      
      if (res.status === 200) {
        alert("Order cancelled successfully");
        setOrder(null); 
       
      }
    } catch (err) {
      console.log("4");
      console.log(err);
    }
  };


  if (!order) return <div className="bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text text-center flex justify-center items-center font-bold border border-black mx-72 my-24 px-7 py-14">No current orders found</div>;

  return (
    <>
      <section className="p-6">
        <h1 className="text-xl font-bold mb-3">Order Details</h1>

        <div className="bg-white p-5 rounded shadow-md">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Amount:</strong> ₹{order.grandTotal}</p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>
          <p><strong>Shipping:</strong> {order.shippingAddress}</p>

          <hr className="my-4" />

          <h3 className="font-semibold text-lg">Items</h3>
          {order.items?.map((item, index) => (
            <div key={index} className="border p-3 my-2 rounded">
              <p>{item.name}</p>
              <p>Qty: {item.quantity}</p>
              <p>Subtotal: ₹{item.subtotal}</p>
              <div>
                <img src={item} alt="" />
              </div>
            </div>
          ))}

          {order.status === "Pending" && (
            <button
              onClick={handleCancelOrder}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel Order
            </button>
          )}
           <button
              className="mt-4 mx-1 bg-blue-500 text-white px-4 py-2 rounded"
            >
              <Link to={"/orders/my-orders"}>My Orders</Link>
            </button>
        </div>
      </section>
    </>
  );
};

export default OrderDetails;
