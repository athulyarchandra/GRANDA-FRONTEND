import commonAPI from "./commonAPI";
import SERVER_URL from "./serverUrl";


//----------------------------------------USER----------------------------------------
//registerUser
export const registerUser = async (reqBody)=>{
return await commonAPI("POST",`${SERVER_URL}/user/register`,reqBody)
}
//loginUser
export const loginUser = async (reqBody)=>{
return await commonAPI("POST",`${SERVER_URL}/user/login`,reqBody)
}
export const getUserProfileAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/user/profile`, {}, "include");
};

export const updateUserApi = async (reqBody) => {
  return await commonAPI("PUT", `${SERVER_URL}/user/updateUser`, reqBody, "include");
};

export const deleteProfileApi = async (id) => {
  return await commonAPI("DELETE", `${SERVER_URL}/user/deleteUser`,id, {}, "include");
};

// ✅ Update user status (Admin)
export const updateUserStatusAPI = async (userId, status) => {
  return await commonAPI(
    "PUT",
    `${SERVER_URL}/users/admin/${userId}/status`,
    { status },
    true
  );
};

//----------------------------------------PRODUCTS----------------------------------------
//getAllProducts
export const getAllProductAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/adminOnly/`, {});
};
//getSingleProductByUser
export const getSingleProductByUser = async (id)=>{
  return await commonAPI("GET",`${SERVER_URL}/user/singleProduct/${id}`)
}
export const deleteProductAPI = async (productId) => {
  return await commonAPI("DELETE",`${SERVER_URL}/admin/deletePrdt/${productId}`);
};
//----------------------------------------CART----------------------------------------
// //addToCart
// export const addToCartAPI = async (data) => {
//   return await commonAPI("POST", `${SERVER_URL}/user/cart/add`, data);
// };

// //getCartByUser
// export const getCartByUser = async ()=>{
//   return await commonAPI("GET",`${SERVER_URL}/user/cart`,{})
// }
// //updateQuantity
// export const updateCartItemQtyAPI = async (productId, action) => {
//   return await commonAPI("PUT",`${SERVER_URL}/cart/update-qty/${productId}`,{ action });
// };
// Add item to cart
export const addToCartAPI = async (cartData) => {
  return await commonAPI("POST",`${SERVER_URL}/user/cart/add`,cartData,true
);
};

// Get User Cart
export const getCartAPI = async () => {
  return await commonAPI("GET",`${SERVER_URL}/user/cart`,{},true
);
};

// Update Cart Item Quantity (inc / dec)
export const updateCartItemAPI = async (productId, action) => {
  return await commonAPI("PUT",`${SERVER_URL}/user/cart/update/${productId}`,{ action },true
);
};

// Remove a single item
export const removeCartItemAPI = async (productId) => {
  return await commonAPI("DELETE",`${SERVER_URL}/user/cart/remove/${productId}`,{},true
);
};

// Clear entire cart
export const clearCartAPI = async () => {
  return await commonAPI("DELETE",`${SERVER_URL}/user/cart/clear`,{},true
);
};

// Checkout cart
export const checkoutCartAPI = async (data) => {
  return await commonAPI("POST",`${SERVER_URL}/user/cart/checkout`,data,true
);
};
export const getCartItemsAPI = () => commonAPI("GET", `${SERVER_URL}/user/cart`);



//----------------------------------------ORDER----------------------------------------
// Create Order from Cart
export const createOrderAPI = async (payload) => {
  return await commonAPI("POST",`${SERVER_URL}/orders/create`,payload,true
  );
};

// Get Logged-in User Orders
export const getUserOrdersAPI = async () => {
  return await commonAPI("GET",`${SERVER_URL}/orders/my-orders`,{},true
  );
};

// Cancel Order
export const cancelOrderAPI = async (orderId) => {
  return await commonAPI("PUT",`${SERVER_URL}/orders/cancel/${orderId}`,{},true
  );
};

// Get Single Order Details
export const getOrderDetailsAPI = async (orderId) => {
  return await commonAPI("GET",`${SERVER_URL}/orders/details/${orderId}`,{},true
  );
};

// Admin: Get All Orders (from all users)
export const adminGetAllOrdersAPI = async () => {
  return await commonAPI("GET",`${SERVER_URL}/orders/admin/all`,{},true
  );
};
// ✅ Update Order Status (Admin)
export const updateOrderStatusAPI = async (orderId, status) => {
  return await commonAPI("PUT",`${SERVER_URL}/orders/admin/status/${orderId}`,{ status },true
  );
};
export const adminGetOrderByIdAPI = async (orderId) => {
  return await commonAPI("GET", `${SERVER_URL}/orders/admin/${orderId}`, {}, true
  );
};

//----------------------------------------ADMIN----------------------------------------
//getAllUSers
export const getAllUsersAPI = async ()=>{
  return await commonAPI("GET",`${SERVER_URL}/admin/allUsers`)
}

export const editProductAPI = async (id, reqBody) => {
  return await commonAPI(
    "put",`${SERVER_URL}/adminOnly/edit-Product/${id}`, // ✅ URL
    reqBody, 
       { "Content-Type": "multipart/form-data"}
  );
};

export const addProductAPi = async (formData) => {
  return await commonAPI("POST", `${SERVER_URL}/adminOnly/add-Product`, formData, {
    "Content-Type": "multipart/form-data",
  });
};
//----------------------------------------Category----------------------------------------
//getAllCategory
export const getAllCategoryApi = async()=>{
  return await commonAPI("GET",`${SERVER_URL}/admin/category/all`)
}
//addCategory
export const addCategoryAPi = async(reqBody)=>{
  return await commonAPI("POST",`${SERVER_URL}/admin/category/add`,reqBody )
}

//updateCategory
export const updateCategoryAPi = async(reqBody,id)=>{
  return await commonAPI("PUT",`${SERVER_URL}/admin/category/update/${id}`,reqBody)
}

//deleteCategory
export const deleteCategoryAPi = async(id)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/admin/category/delete/${id}`)
}