import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCartAPI, getSingleProductByUser } from "../services/allAPI";
import SERVER_URL from "../services/serverUrl";
import { CartContext } from "../context/CartContext"; // ✅ import context

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const [productDetails, setAllProductDetails] = useState({});
  const [detailsOpen,setDetailsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();
  const { setCartCount } = useContext(CartContext); // ✅ access setCartCount
  const navigate = useNavigate()
  useEffect(() => {
    getProdutDetails();
  }, [id]);

  const maxLimit = 10;

  const decrementQty = () => setQty((v) => (v > 1 ? v - 1 : v));
  const incrementQty = () => setQty((v) => (v < maxLimit ? v + 1 : v));

const handleAddToCart = async () => {
  try {
    const response = await addToCartAPI({
      productId: productDetails._id,
      quantity: qty,
    });

    if (response.status === 200 || response.status === 201) {
      console.log("Add to cart response:", response.data);

      // ✅ Increment count safely
      setCartCount((prev) => prev + qty);

      // ✅ Trigger global update (Navbar + App)
      window.dispatchEvent(new Event("cartUpdated"));

      alert("Item added to cart successfully!");
    } else {
      alert("Sorry! Unable to find your account, please login/register");
      navigate('/login')
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};

  const getProdutDetails = async () => {
    try {
      const result = await getSingleProductByUser(id);
      if (result.status === 200) {
        setAllProductDetails(result.data.singleProduct);
      } else {
        console.log("Unexpected response", result);
      }
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };
  const handleNext = () => {
    if (
      productDetails.productImages &&
      currentIndex < productDetails.productImages.length - 1
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <main className="max-w-6xl mx-auto p-6 lg:p-10 text-gray-800 antialiased">
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li>•</li>
          <li className="text-gray-700">{productDetails.name}</li>
        </ol>
      </nav>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT */}
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden bg-white p-6 shadow-sm">
            <div className="relative">
              <span className="absolute left-4 top-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white shadow">
                {productDetails.offer}% OFF
              </span>
              <img
                src={
                  productDetails.productImages?.[currentIndex]
                    ? `${SERVER_URL}/${productDetails.productImages[currentIndex].replace(/\\/g, "/")}`
                    : "https://via.placeholder.com/300x300.png?text=No+Image"
                }
                alt={productDetails.name}
                className="w-full h-96 object-contain rounded-lg transition-all duration-300"
              />


              {/* Prev/Next Buttons */}
              {productDetails.productImages?.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 px-3 py-1 rounded-full shadow hover:bg-gray-300 disabled:opacity-50"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === productDetails.productImages.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 px-3 py-1 rounded-full shadow hover:bg-gray-300 disabled:opacity-50"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              About this product
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {productDetails.description}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="sticky top-6">
          <div className="bg-white rounded-xl shadow p-6 lg:p-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold leading-tight">
              {productDetails.name}
            </h1>

            <div className="mt-4 flex items-end gap-4">
              <div>
                <div className="text-3xl lg:text-4xl font-extrabold">
                  ₹{productDetails.price}
                </div>
                <div className="text-sm text-blue-600 font-medium mt-1">
                  {productDetails.brand}
                </div>
              </div>

              <div className="ml-auto text-right">
                <button
                  aria-label="Add to wishlist"
                  className="p-2 rounded-md border hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-pink-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.656 3.172 11.83a4 4 0 010-5.656z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quantity */}
                     <div className="mt-5">
              <label
                htmlFor="qty"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity{" "}
                <span className="text-xs text-gray-400">
                  ({productDetails.stock})
                </span>
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border overflow-hidden">
                  <button
                    onClick={decrementQty}
                    className="px-4 py-2 text-lg bg-white hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    id="qty"
                    type="number"
                    value={qty}
                    min="1"
                    max="10"
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-16 text-center outline-none p-2"
                  />
                  <button
                    onClick={incrementQty}
                    className="px-4 py-2 text-lg bg-white hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="ml-auto flex-1 lg:flex-none bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-6 py-3 shadow"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>

            <hr className="my-6" />

            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
              <div>
                <dt className="text-xs text-gray-500">Available country</dt>
                <dd className="mt-1">{productDetails.available_country}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Category</dt>
                <dd className="mt-1">{productDetails.category}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Color</dt>
                <dd className="mt-1">{productDetails.color || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Size</dt>
                <dd className="mt-1">{productDetails.size || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">TaxRate</dt>
                <dd className="mt-1">{productDetails.tax_rate || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Ratings</dt>
                <dd className="mt-1">
                  <span className="inline-block px-3 py-1 rounded-full text-xs bg-green-50 text-green-700">
                    {productDetails.ratings}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Collapsible Details */}
          <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between py-2 px-1"
            >
              <span className="font-medium">Reviews</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-500 transition-transform ${detailsOpen ? "rotate-180" : ""
                  }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06-.02L10 10.88l3.71-3.69a.75.75 0 111.06 1.06l-4.24 4.22a.75.75 0 01-1.06 0L5.25 8.25a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {detailsOpen && (
              <div className="mt-3 text-sm text-gray-600">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Calories: 46 kcal per 100g</li>
                  <li>Rich in vitamins A & C</li>
                  <li>Keep refrigerated for longer shelf life</li>
                </ul>
              </div>
            )}
          </div>
        </aside>

      </section>
    </main>
  );
};

export default ProductDetails