import React, { useEffect, useState } from 'react'
import { addCategoryAPi, deleteCategoryAPi, getAllCategoryApi, updateCategoryAPi } from '../services/allAPI'

const Categories = () => {
    const [allCategory, setAllCategory] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);

    const [inputCategory, setInputCategory] = useState({
        name: "",
        description: ""
    });

    const [editCategory, setEditCategory] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    useEffect(() => {
        getAllCategory();
    }, []);

    const getAllCategory = async () => {
        const response = await getAllCategoryApi();
        const categories = response?.data || [];
        categories.sort((a, b) => a.name.localeCompare(b.name));
        setAllCategory(categories);
    };

    const handleAddCategory = async () => {
        try {
            if (inputCategory.name && inputCategory.description) {
                const response = await addCategoryAPi(inputCategory);
                alert(response.data.message);
                setShowCategoryModal(false);
                setInputCategory({ name: "", description: "" });
                getAllCategory();
            } else {
                alert("All fields are required!");
            }
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.error || "Something went wrong");
        }
    };

    const handleUpdateCategory = async () => {
        try {
            if (!editCategory.name || !editCategory.description) {
                alert("All fields are required");
                return;
            }

            const response = await updateCategoryAPi(editCategory._id, editCategory);

            if (response.status === 200) {
                alert("Category updated!");
                setEditCategory(null);
                getAllCategory();
            }
        } catch (err) {
            console.log(err);
            alert("Update failed!");
        }
    };

    const handleDeleteModalOpen = (category) => {
        setSelectedDeleteCategory(category);
        setShowDeleteModal(true);
    };

    const handleDeleteCategory = async () => {
        try {
            const response = await deleteCategoryAPi(selectedDeleteCategory._id);
            if (response.status === 200) {
                alert("Category deleted successfully!");
                setShowDeleteModal(false);
                setSelectedDeleteCategory(null);
                getAllCategory();
            }
        } catch (err) {
            console.log(err);
            alert("Delete failed!");
        }
    };

    return (
        <>
            <button
                onClick={() => setShowCategoryModal(true)}
                className="bg-[#c8a876] text-white py-3 px-5 rounded-lg shadow hover:bg-[#d0983f]"
            >
                Add Category
            </button>
            <a className='mx-1 bg-blue-200 rounded-lg shadow py-3 px-5'>Total no of categories : {allCategory.length}</a>
            <table className='w-full text-left min-w-[700px]'>
                <thead className='bg-amber-50'>
                    <tr>
                        <th className='p-4'>Categories</th>
                        <th className='p-4'>Description</th>
                        <th className='p-4'>Edit</th>
                        <th className='p-4'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allCategory.length > 0 ? (
                        allCategory.map((category, i) => (
                            <React.Fragment key={i}>
                                <tr className="border-t">
                                    <td className="p-4 text-[13px] leading-tight">{category.name}</td>
                                    <td className="p-4 text-[13px] leading-tight">{category.description}</td>
                                    <td className="p-4 text-[13px] leading-tight">
                                        <button
                                            className="text-blue-600"
                                            onClick={() => setEditCategory(category)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="p-4 text-[13px] leading-tight">
                                        <button
                                            className="text-red-600"
                                            onClick={() => handleDeleteModalOpen(category)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                                {editCategory?._id === category._id && (
                                    <tr>
                                        <td colSpan="4">
                                            <div className="p-4 border bg-gray-50 rounded-md mt-2">
                                                <h3 className="font-semibold mb-2">Edit Category</h3>

                                                <input
                                                    type="text"
                                                    value={editCategory.name}
                                                    onChange={(e) =>
                                                        setEditCategory({ ...editCategory, name: e.target.value })
                                                    }
                                                    className="border p-2 w-full mb-2"
                                                />

                                                <textarea
                                                    value={editCategory.description}
                                                    onChange={(e) =>
                                                        setEditCategory({ ...editCategory, description: e.target.value })
                                                    }
                                                    className="border p-2 w-full mb-2"
                                                />

                                                <div className="flex gap-2">
                                                    <button
                                                        className="bg-green-600 text-white px-4 py-2 rounded"
                                                        onClick={handleUpdateCategory}
                                                    >
                                                        Update
                                                    </button>

                                                    <button
                                                        className="bg-gray-400 text-white px-4 py-2 rounded"
                                                        onClick={() => setEditCategory(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td className="border-t p-4 text-[15px] text-center" colSpan="4">
                                No Categories Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-2">
                        <h3 className="text-lg font-semibold mb-4">Add Category</h3>
                        <input
                            value={inputCategory.name}
                            onChange={e => setInputCategory({ ...inputCategory, name: e.target.value })}
                            type="text"
                            placeholder="Category Name"
                            className="border w-full p-2 rounded"
                        />
                        <textarea
                            value={inputCategory.description}
                            onChange={e => setInputCategory({ ...inputCategory, description: e.target.value })}
                            placeholder="Category description"
                            className="border w-full p-2 rounded"
                        ></textarea>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowCategoryModal(false)}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCategory}
                                className="bg-[#c8a876] text-white py-2 px-4 rounded hover:bg-[#d0983f]"
                            >
                                Add Category
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 text-center w-[420px] shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Are you sure you want to delete this category?
                        </h3>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteCategory}
                                className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Categories;
