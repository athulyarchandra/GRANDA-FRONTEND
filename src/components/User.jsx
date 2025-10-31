import React, { useEffect, useState } from "react";
import granda from "../assets/GRANDA.png";
import uploadImg from "../assets/uploadImg.png";
import {
    deleteProfileApi,
    getUserProfileAPI,
    updateUserApi,
} from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../services/serverUrl";

const User = () => {
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        bio: "",
        age: "",
        gender: "",
        address: "",
        profilePic: "",
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [existingProfileImg, setExistingProfileImg] = useState("");
    const [editing, setEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview("");
        }
    }, [file]);

    const handleDeleteModalOpen = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteProfile = async () => {
        try {
            const response = await deleteProfileApi();
            if (response.status === 200) {
                alert("Profile deleted successfully!");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            alert("Delete failed!");
        }
    };

    const getUser = async () => {
        try {
            const response = await getUserProfileAPI();
            if (response.status === 200) {
                setUserDetails(response.data.user);

                const pic =
                    response.data.user.profilePic ||
                    response.data.user["profilePic"] ||
                    "";

                setExistingProfileImg(pic);
                console.log(response);

            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(userDetails).forEach((key) => {
            if (key !== "profilePic") {
                formData.append(key, userDetails[key]);
            }
        });
        if (file) formData.append("profilePic", file);

        try {
            const response = await updateUserApi(formData);
            if (response.status === 200) {
                alert("Profile Updated Successfully!");
                setEditing(false);
                setUserDetails(response.data.user);
                setPreview(`${SERVER_URL}/uploads/${response.data.user.profilePic}`);
                setFile(null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <section className="w-full overflow-hidden ">
                <div className="flex flex-col">
                    <img
                        src={granda}
                        alt="User Cover"
                        className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] h-[11rem]"
                    />

                    <div className="sm:w-[80%] w-[90%] mx-auto flex items-center">
                        {existingProfileImg || preview ? (
                            <img
                                src={
                                    preview
                                        ? preview
                                        : `${SERVER_URL}/uploads/${existingProfileImg}`
                                }
                                alt="User Profile"
                                className=" object- rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] w-[7rem] h-[7rem]"
                            />
                        ) : (
                            <img
                                src={uploadImg}
                                alt="User Profile"
                                className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] w-[7rem] h-[7rem]"
                            />
                        )}

                        <h1 className="w-full text-left my-4 sm:mx-4 pl-4 text-gray-800 dark:text-black lg:text-4xl md:text-3xl sm:text-3xl text-xl font-serif">
                            {userDetails.username}
                        </h1>
                    </div>

                    <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mt-3 mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 -top-4">
                        {!editing && (
                            <>
                                <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                                    <div className="w-full flex sm:flex-row flex-col gap-2 justify-center">
                                        <div className="w-full">
                                            <dl className="text-gray-900 divide-y divide-gray-200">
                                                <div className="flex flex-col pb-3">
                                                    <label className="mb-1 text-gray-500">Bio</label>
                                                    <p className="font-semibold text-black">
                                                        {userDetails.bio}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col py-3">
                                                    <label className="mb-1 text-gray-500">Age</label>
                                                    <p className="font-semibold text-black">
                                                        {userDetails.age}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col py-3">
                                                    <label className="mb-1 text-gray-500">Gender</label>
                                                    <p className="font-semibold text-black">
                                                        {userDetails.gender}
                                                    </p>
                                                </div>
                                            </dl>
                                        </div>
                                        <div className="w-full">
                                            <dl className="text-gray-900 divide-y divide-gray-200">
                                                <div className="flex flex-col pb-3">
                                                    <label className="mb-1 text-gray-500">Address</label>
                                                    <p className="font-semibold text-black">
                                                        {userDetails.address}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col pt-3">
                                                    <label className="mb-1 text-gray-500">Email</label>
                                                    <p className="font-semibold text-black">
                                                        {userDetails.email}
                                                    </p>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setEditing(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                    Update Profile
                                </button>
                            </>
                        )}

                        <button
                            onClick={handleDeleteModalOpen}
                            className="bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Delete Profile
                        </button>

                        {/* Delete Confirm Modal */}
                        {showDeleteModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                                <div className="bg-white rounded-lg p-6 text-center w-[420px] shadow-lg">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                        Are you sure you want to delete this Profile?
                                    </h3>
                                    <div className="flex justify-center gap-4 mt-4">
                                        <button
                                            onClick={() => setShowDeleteModal(false)}
                                            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleDeleteProfile}
                                            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
                                        >
                                            Yes, Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Update Form */}
                        {editing && (
                            <form
                                onSubmit={handleUpdate}
                                className="w-full bg-gray-200 p-4 mt-6 rounded-md shadow-md"
                            >
                                <h2 className="font-bold text-center mb-4">Edit Profile</h2>

                                <div className="flex flex-col gap-3">
                                    <input
                                        name="username"
                                        value={userDetails.username || ""}
                                        onChange={(e) =>
                                            setUserDetails({
                                                ...userDetails,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        placeholder="Username"
                                        className="p-2 border rounded-md"
                                    />

                                    <input
                                        name="bio"
                                        value={userDetails.bio || ""}
                                        onChange={(e) =>
                                            setUserDetails({
                                                ...userDetails,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        placeholder="Bio"
                                        className="p-2 border rounded-md"
                                    />

                                    <input
                                        type="number"
                                        name="age"
                                        value={userDetails.age || ""}
                                        onChange={(e) =>
                                            setUserDetails({
                                                ...userDetails,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        placeholder="Age"
                                        className="p-2 border rounded-md"
                                    />

                                    <input
                                        name="gender"
                                        value={userDetails.gender || ""}
                                        onChange={(e) =>
                                            setUserDetails({
                                                ...userDetails,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        placeholder="Gender"
                                        className="p-2 border rounded-md"
                                    />

                                    <input
                                        name="address"
                                        value={userDetails.address || ""}
                                        onChange={(e) =>
                                            setUserDetails({
                                                ...userDetails,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        placeholder="Address"
                                        className="p-2 border rounded-md"
                                    />

                                    <input
                                        name="email"
                                        value={userDetails.email || ""}
                                        onChange={(e) =>
                                            setUserDetails({
                                                ...userDetails,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        placeholder="Email"
                                        className="p-2 border rounded-md"
                                    />

                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            setFile(e.target.files[0]);
                                        }}
                                    />
                                </div>

                                <div className="flex gap-4 justify-center mt-4">
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() => {
                                            setEditing(false);
                                            setFile(null);
                                            setPreview("");
                                        }}
                                        type="button"
                                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default User;
