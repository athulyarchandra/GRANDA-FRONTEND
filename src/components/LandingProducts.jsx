import React, { useEffect, useState } from "react";
import { getAllProductAPI } from "../services/allAPI";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const LandingProducts = () => {
  const [allHomeProducts, setAllHomeProducts] = useState([]);
  const [allFilteredProducts, setAllFilteredProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Categories");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; // Number of products per page

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const result = await getAllProductAPI();
      if (result.status === 200) {
        const products = result.data.allProductsList || [];
        setAllHomeProducts(products);
        setAllFilteredProducts(products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setAllFilteredProducts(allHomeProducts);
      return;
    }

    const filtered = allHomeProducts.filter((item) =>
      [item.name, item.brand, item.category, item.color, item.description]
        .some((field) => field?.toLowerCase().includes(query))
    );

    setAllFilteredProducts(filtered);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);

    if (value === "All Categories") {
      setAllFilteredProducts(allHomeProducts);
    } else {
      const filtered = allHomeProducts.filter(
        (item) => item.category?.toLowerCase() === value.toLowerCase()
      );
      setAllFilteredProducts(filtered);
    }
  };

  // Pagination logic
  const pageCount = Math.ceil(allFilteredProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentData = allFilteredProducts.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll up when page changes
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Products
        </h2>

        {/* Dropdown */}
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="text-white bg-[#eaa739] hover:bg-[#eba32f] font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
            type="button"
          >
            {selected}
            <svg
              className={`w-2.5 h-2.5 ms-3 transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-sm">
              <ul className="p-3 space-y-3 text-sm text-gray-700">
                {[
                  "All Categories",
                  "Electronics",
                  "Fashion",
                  "Home Appliances",
                  "Books",
                  "Beauty & Health",
                ].map((option, index) => (
                  <li key={index}>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        checked={selected === option}
                        onChange={() => handleSelect(option)}
                        name="category"
                        className="mr-2"
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-xl mx-auto my-5">
          <input
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="rounded-full w-full h-14 pl-8 pr-28 outline-none border-2 border-gray-100 shadow-md focus:ring-[#efcf97] focus:border-[#c8a871]"
            type="text"
          />
        </div>

        {/* Products Grid */}
        {currentData.length === 0 ? (
          <p className="text-gray-500 text-center">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentData.map((product, index) => (
              <Link
                key={index}
                to={`/user/singleProduct/${product._id}`}
                className="group  shadow p-2 rounded-md"
              >
                <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-md">
                  <img
                    src={
                      product.productImages?.[0]
                        ? `http://localhost:3000/${product.productImages[0]}`
                        : "https://via.placeholder.com/300x300.png?text=No+Image"
                    }
                    alt={product.name}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex justify-between mt-4 mx-4">
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.brand}</p>
                </div>

                <div className="flex justify-between mx-4">
                  <p className="text-lg font-medium text-gray-900">
                    ₹{product.price}
                  </p>
                  <p className="text-sm text-yellow-600 font-medium">
                    {product.ratings || "NA"}⭐
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center mt-10">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next →"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              previousLabel="← Prev"
              containerClassName="flex cursor-pointer items-center gap-3 text-sm"
              pageClassName="px-3 py-1 border rounded-md hover:bg-[#f4e5c3]"
              activeClassName="bg-[#c8a876] text-white border-none"
              previousClassName="px-3 py-1 border rounded-md hover:bg-[#f4e5c3]"
              nextClassName="px-3 py-1 border rounded-md hover:bg-[#f4e5c3]"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingProducts;
