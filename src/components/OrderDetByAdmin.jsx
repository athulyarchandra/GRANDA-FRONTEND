import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { adminGetAllOrdersAPI, adminGetOrderByIdAPI, updateOrderStatusAPI, } from "../services/allAPI";
import SERVER_URL from "../services/serverUrl";

const OrderDetByAdmin = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [orderSts, setOrderSts] = useState("");

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const res = await adminGetAllOrdersAPI(orderId);
            if (res.status === 200) {
                setOrder(res.data.orders);
                console.log(res.data.orders);
                

                const itemStatus = res.data.orders.map(item => item.status);
                setOrderSts(itemStatus);
                console.log(itemStatus);

            }
        } catch (err) {
            console.error("Error fetching order details:", err);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setOrderSts(newStatus);
        try {
            const res = await updateOrderStatusAPI(orderId, newStatus);
            if (res.status === 200) {
                alert(`Status updated to "${newStatus}"`);
                fetchOrderDetails();
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    if (!order)
        return (
            <div className="text-center text-xl font-semibold text-gray-600 py-20">
                No order found.
            </div>
        );

    return (
        <section className="p-6">
            <h1 className="text-xl font-bold mb-4 text-gray-700">Order Details</h1>

            {order && order.length > 0 ? (
                order.map((itemOrder) => (
                    <div
                        key={itemOrder._id}
                        className="bg-white p-5 rounded-lg shadow-md border mb-6"
                    >
                        <p><strong>Order ID:</strong> {itemOrder._id}</p>
                        <p><strong>Total Amount:</strong> ₹{itemOrder.grandTotal}</p>
                        <p><strong>Payment:</strong> {itemOrder.paymentMethod}</p>
                        <p><strong>Shipping:</strong> {itemOrder.shippingAddress}</p>
                        <p><strong>UserId:</strong> {itemOrder.userId}</p>

                        {/* 🔹 Order Status Dropdown */}
                        <div className="mt-4 flex items-center gap-3">
                            <label className="font-medium">Status:</label>
                            <select
                                value={itemOrder.status}
                                onChange={(e) => handleStatusChange(e, itemOrder._id)}
                                disabled={["Delivered", "Cancelled"].includes(itemOrder.status)}
                                className="border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Shipped</option>
                                <option>Out for Delivery</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                            </select>
                        </div>

                        <hr className="my-4" />

                        {/* 🔹 Order Items */}
                        <h3 className="font-semibold text-lg mb-2">Items</h3>
                        <div className="space-y-3">
                            {itemOrder.items?.map((item, index) => (
                                <div
                                    key={index}
                                    className="border p-3 rounded flex items-center justify-between"
                                >
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        <p className="text-sm text-gray-600">
                                            Subtotal: ₹{item.subtotal}
                                        </p>
                                    </div>

                                    {item.image && (
                                        <img
                                            src={`${SERVER_URL}/${item.image}`}
                                            alt={item.name}
                                            className="w-20 h-20 object-contain rounded"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex gap-3">
                            <Link
                                to="/adminPortal/orders"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Back to Orders
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <p>No orders found</p>
            )}
        </section>

    );
};

export default OrderDetByAdmin;
