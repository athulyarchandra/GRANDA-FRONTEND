import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserOrdersAPI } from "../services/allAPI";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getUserOrdersAPI();
      if (res.status === 200) {
        setOrders(res.data.orders);
      } else {
        console.log("Error loading orders");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section className="w-full bg-white  px-8 py-10 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-black mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300 text-lg">
          No orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/details/${order._id}`}
              className="block"
            >
              <div className="rounded-xl p-5 shadow-md bg-[#F9FAFB] dark:bg-[#a3895e] hover:shadow-lg transition">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg text-[#1A1A1A] dark:text-white">
                      Order ID: {order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-900 dark:text-gray-200 mt-1">
                      Items: {order.items?.length}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-white dark:text-black">
                      ₹{order.grandTotal}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 mt-2 text-sm rounded-full 
                      ${
                        order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : order.status === "Shipped"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserOrders;
