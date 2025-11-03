import React, { useEffect, useState } from 'react';
import { addProductAPi, deleteProductAPI, editProductAPI, getAllProductAPI } from '../services/allAPI';
import SERVER_URL from '../services/serverUrl';

const AddProducts = () => {
  const [productDetails, setProductDetails] = useState({
    productCode: "", name: "", price: "", available_country: "", tax_rate: "",
    color: "", size: "", stock: "", category: "", offer: "", description: "",
    brand: "", ratings: "", productImages: []
  });

  const [previewUrls, setPreviewUrls] = useState([null, null, null]);
  const [allProducts, setAllProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductDetails, setEditProductDetails] = useState({});
  const [editPreviewUrls, setEditPreviewUrls] = useState([null, null, null]);

  // Delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (productDetails.productImages?.length > 0) {
      const urls = Array.from(productDetails.productImages).map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    } else {
      setPreviewUrls([]);
    }
  }, [productDetails.productImages]);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const response = await getAllProductAPI();
      if (response.status === 200) setAllProducts(response.data.allProductsList);
    } catch (err) {
      console.log(err);
    }
  };

  // Add product
  const handleAddProduct = async () => {
    const formData = new FormData();
    Object.entries(productDetails).forEach(([key, value]) => {
      if (key !== "productImages") formData.append(key, value);
    });
    productDetails.productImages.forEach(file => file && formData.append("productImages", file));

    try {
      const res = await addProductAPi(formData);
      if (res.data.message) alert(res.data.message);
      console.log(res);

      setShowAddModal(false);
      getAllProducts();
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFiles = [...productDetails.productImages];
    newFiles[index] = file;

    setProductDetails(prev => ({ ...prev, productImages: newFiles }));

    const newPreviews = [...previewUrls];
    newPreviews[index] = URL.createObjectURL(file);
    setPreviewUrls(newPreviews);
  };

  // Edit handlers
  const handleEditModalOpen = (product) => {
    setEditProductDetails({ ...product });
    const urls = product.productImages?.map(img => `${SERVER_URL}/${img}`) || [];
    setEditPreviewUrls(urls);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFiles = [...(editProductDetails.productImages || [])];
    newFiles[index] = file;

    setEditProductDetails(prev => ({ ...prev, productImages: newFiles }));


    const newPreviews = [...editPreviewUrls];
    newPreviews[index] = URL.createObjectURL(file);
    setEditPreviewUrls(newPreviews);
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();

    Object.entries(editProductDetails).forEach(([key, value]) => {
      if (key !== "productImages" && key !== "_id") formData.append(key, value);
    });

    editProductDetails.productImages?.forEach(file => {
      if (file instanceof File) formData.append("productImages", file);
    });

    try {
      const res = await editProductAPI(editProductDetails._id, formData);
      if (res.data.message) alert(res.data.message);
      setShowEditModal(false);
      getAllProducts();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProductAPI(selectedProduct._id);
      alert("Product deleted");
      setShowDeleteModal(false);
      getAllProducts();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <>
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[{ label: "Total Products", value: allProducts.length, color: "#c8a876" }].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <p className="text-sm text-gray-500">{card.label}</p>
            <h2 className="text-3xl font-bold mt-2" style={{ color: card.color }}>{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="font-bold text-[#c8a876] text-lg">Product List</h1>
          <button onClick={() => setShowAddModal(true)} className="bg-[#c8a876] text-white py-2 px-5 rounded-lg shadow hover:bg-[#d6a455] transition">
            + Add Product
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>

            <tbody>
              {allProducts.length > 0 ? allProducts.map((prdt, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      {prdt.productImages?.length > 0 ? prdt.productImages.slice(0, 3).map((img, idx) => (
                        <img key={idx} src={`${SERVER_URL}/${img}`} alt={`Product ${idx + 1}`} className="w-40 h-40 object-contain p-1 rounded-md shadow-sm hover:scale-105 transition-transform" />
                      )) : <p className="text-gray-400 text-sm">No Images</p>}
                    </div>
                  </td>
                  <td className="p-4 text-sm leading-snug">
                    <ul className="space-y-1 text-gray-700">
                      <li><span className="font-medium">Price:</span> {prdt.price}</li>
                      <li><span className="font-medium">Color:</span> {prdt.color}</li>
                      <li><span className="font-medium">Tax:</span> {prdt.tax_rate} %</li>
                      <li><span className="font-medium">Ratings:</span> {prdt.ratings}</li>
                      <li><span className="font-medium">Offer:</span> {prdt.offer} %</li>
                      <li><span className="font-medium">Color:</span> {prdt.color}</li>
                      <li><span className="font-medium">Size:</span> {prdt.size}</li>
                      <li><span className="font-medium">Brand:</span> {prdt.brand}</li>
                      <li><span className="font-medium">Stoke available:</span> {prdt.stock}</li>
                      <li><span className="font-medium">Category:</span> {prdt.category}</li>

                      <li><span className="font-medium">Product code:</span> {prdt.productCode}</li>

                      <li><span className="font-medium">Available countries:</span> {prdt.available_country}</li>
                      <li><span className="font-medium">Name:</span> {prdt.name}</li>

                      <li className="text-gray-600 text-xs mt-1">{prdt.description}</li>

                    </ul>
                    <div className="mt-3">
                      <button onClick={() => handleEditModalOpen(prdt)} className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition">Edit</button>
                      <button onClick={() => { setSelectedProduct(prdt); setShowDeleteModal(true) }} className="px-3 py-1 bg-red-500 text-white rounded-md text-xs ms-2 hover:bg-red-600 transition">Delete</button>
                    </div>
                  </td>
                </tr>
              )) : <tr><td className="p-4 text-center text-gray-500" colSpan="2">No products found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[70%] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-semibold text-[#c8a876]">Add Product</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-800">✕</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[0, 1, 2].map((index) => (
                  <label key={index} className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition">
                    <input type="file" className="hidden" onChange={(e) => handleImageChange(e, index)} />
                    {previewUrls[index] ? <img src={previewUrls[index]} alt={`Preview ${index}`} className="w-full h-36 object-contain rounded-lg" /> : <p className="text-gray-500 text-sm">Click to upload Image {index + 1}</p>}
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "productCode", "name", "price", "available_country", "tax_rate",
                  "color", "size", "stock", "category", "offer", "brand", "ratings"
                ].map(field => (
                  <div key={field} className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 capitalize">{field}</label>
                    <input type="text" name={field} value={productDetails[field]} onChange={handleInputChange} className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#c8a876]" />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="text-sm text-gray-600 mb-1">Description</label>
                  <textarea name="description" value={productDetails.description} onChange={handleInputChange} rows="3" className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#c8a876]"></textarea>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={handleAddProduct} className="bg-[#c8a876] text-white px-5 py-2 rounded-lg hover:bg-[#d6a455] transition">Save Product</button>
              <button onClick={() => setShowAddModal(false)} className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[70%] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-semibold text-[#c8a876]">Edit Product</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-800">✕</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[0, 1, 2].map(index => (
                  <label key={index} className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50">
                    <input type="file" className="hidden" onChange={(e) => handleEditImageChange(e, index)} />
                    {editPreviewUrls[index] ? <img src={editPreviewUrls[index]} alt={`Preview ${index}`} className="w-full h-36 object-contain rounded-lg" /> : <p className="text-gray-500 text-sm">Click to upload Image {index + 1}</p>}
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "productCode", "name", "price", "available_country", "tax_rate",
                  "color", "size", "stock", "category", "offer", "brand", "ratings"
                ].map(field => (
                  <div key={field} className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 capitalize">{field}</label>
                    <input type="text" name={field} value={editProductDetails[field] || ""} onChange={handleEditInputChange} className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#c8a876]" />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="text-sm text-gray-600 mb-1">Description</label>
                  <textarea name="description" value={editProductDetails.description || ""} onChange={handleEditInputChange} rows="3" className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#c8a876]"></textarea>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={handleUpdateProduct} className="bg-[#c8a876] text-white px-5 py-2 rounded-lg hover:bg-[#d6a455] transition">Update Product</button>
              <button onClick={() => setShowEditModal(false)} className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Are you sure you want to delete this product?</h3>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100">Cancel</button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default AddProducts;
