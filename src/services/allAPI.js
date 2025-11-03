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

// UpdateCartItemQuantity
export const updateCartItemAPI = async (productId, action) => {
  return await commonAPI("PUT",`${SERVER_URL}/user/cart/update/${productId}`,{ action },true
);
};

// RemoveSingleItem
export const removeCartItemAPI = async (productId) => {
  return await commonAPI("DELETE",`${SERVER_URL}/user/cart/remove/${productId}`,{},true
);
};

// ClearEntireCart
export const clearCartAPI = async () => {
  return await commonAPI("DELETE",`${SERVER_URL}/user/cart/clear`,{},true
);
};

// CheckoutCart
export const checkoutCartAPI = async (data) => {
  return await commonAPI("POST",`${SERVER_URL}/user/cart/checkout`,data,true
);
};
export const getCartItemsAPI = () => commonAPI("GET", `${SERVER_URL}/user/cart`);



//----------------------------------------ORDER----------------------------------------
// CreateOrderfromCart
export const createOrderAPI = async (payload) => {
  return await commonAPI("POST",`${SERVER_URL}/orders/create`,payload,true
  );
};

// GetUserOrders
export const getUserOrdersAPI = async () => {
  return await commonAPI("GET",`${SERVER_URL}/orders/my-orders`,{},true
  );
};

// CancelOrder
export const cancelOrderAPI = async (orderId) => {
  return await commonAPI("PUT",`${SERVER_URL}/orders/cancel/${orderId}`,{},true);
};

// GetSingleOrder Details
export const getOrderDetailsAPI = async (orderId) => {
  return await commonAPI("GET",`${SERVER_URL}/orders/details/${orderId}`,{},true);
};


//Get all orders (Admin)
export const adminGetAllOrdersAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/orders/admin/all`, "", true);
};

//Get single order by ID (Admin)
export const adminGetOrderByIdAPI = async (orderId) => {
  return await commonAPI("GET", `${SERVER_URL}/orders/admin/${orderId}`, "", true);
};

//Update order status (Admin)
export const updateOrderStatusAPI = async (orderId, status) => {
  return await commonAPI("PUT",`${SERVER_URL}/orders/admin/status/${orderId}`,{ status },true);
};

//----------------------------------------ADMIN----------------------------------------
//getAllUSers
export const getAllUsersAPI = async ()=>{
  return await commonAPI("GET",`${SERVER_URL}/admin/allUsers`)
}

export const editProductAPI = async (id, formData) => {
  return await commonAPI("PUT",`${SERVER_URL}/adminOnly/edit-Product/${id}`,formData,{ "Content-Type": "multipart/form-data"});
};

export const addProductAPi = async (formData) => {
  return await commonAPI("POST", `${SERVER_URL}/adminOnly/add-Product`, formData, {"Content-Type": "multipart/form-data",});
};

//Update user status
export const updateUserStatusAPI = async (userId,status) => {
  return await commonAPI("PATCH",`${SERVER_URL}/admin/users/${userId}/status`,{ status });
};
//----------------------------------------Category----------------------------------------
//getAllCategory
export const getAllCategoryApi = async()=>{
  return await commonAPI("GET",`${SERVER_URL}/admin/category/all`)
}
//getAllCategoryPublic
export const getAllCategoryPublic = async()=>{
  return await commonAPI("GET",`${SERVER_URL}/admin/category/public/all`)
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