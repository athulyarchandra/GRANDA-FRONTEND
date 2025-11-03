import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminGetAllOrdersAPI } from "../services/allAPI";

const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const res = await adminGetAllOrdersAPI();
      console.log("Admin orders response:", res);

      if (res.status === 200) {
        const allOrders = res.data.orders || res.data;
        setOrders(allOrders);
      } else {
        console.error("Error fetching orders:", res.data?.message || res.data);
      }
    } catch (err) {
      console.error("Fetch orders failed:", err);
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center text-xl text-gray-600 py-10">
        No orders found
      </div>
    );
  }

  return (
    <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-500">Total orders</p>
            <h2 className="text-3xl font-bold text-[#c8a876] mt-2">{orders.length}</h2>
          </div>
        </div>
      <section className="p-6">
        <h1 className="text-xl font-bold mb-4 text-gray-700">All Orders</h1>
  
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-4 border cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/adminPortal/order/${order._id}`)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>User:</strong> {order.userId?.name || order.userId}</p>
                  <p><strong>Total:</strong> ₹{order.grandTotal}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AdminAllOrders;
