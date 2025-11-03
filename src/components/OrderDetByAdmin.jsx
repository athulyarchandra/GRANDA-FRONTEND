import { Link, useNavigate, useParams } from "react-router-dom";
import { adminGetOrderByIdAPI } from "../services/allAPI";
import React, { useEffect, useState } from "react";

const OrderDetByAdmin = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (orderId) fetchOrderDetails(orderId);
    }, [orderId]);

    const fetchOrderDetails = async (id) => {
        try {
            const res = await adminGetOrderByIdAPI(id);
            console.log("Order detail response:", res);
            if (res.status === 200) {
                setOrder(res.data.order || res.data);
            } else {
                console.error("Failed to fetch order:", res.data?.message);
            }
        } catch (err) {
            console.error("Error fetching order details:", err);
        }
    };
    const goback = () => {
        navigate(-1)
    }

    if (!order) return <div className="text-center py-10">Loading order details...</div>;

    return (
        <div className="p-6">
            <button className="cursor-pointer" onClick={goback}><i className="fa-solid fa-arrow-left mx-1"></i></button>
            <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User:</strong> {order.userId?.name || order.userId}</p>
            <p><strong>Total:</strong> ₹{order.grandTotal}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <h2 className="text-lg mt-6 mb-2 font-medium">Items</h2>
            <ul className="space-y-2">
                {order.items?.map((item, i) => (
                    <li key={i} className="border p-3 rounded-md">
                        <p>{item.productName}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>Price: ₹{item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderDetByAdmin;
