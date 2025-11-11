import React, { useEffect, useState } from "react";
import { getAllUsersAPI, updateUserStatusAPI } from "../services/allAPI";
import SERVER_URL from "../services/serverUrl";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUserDetails();
  }, []);

  const getAllUserDetails = async () => {
    try {
      const response = await getAllUsersAPI();
      if (response.status === 200) {
        const users = response.data?.allUsers ?? [];
        users.sort((a, b) => a.username.localeCompare(b.username));
        setAllUsers(users);
      } else {
        alert(response.data.error || "Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      const res = await updateUserStatusAPI(userId, newStatus);
      if (res.status === 200) {
        alert(`User status changed to "${newStatus}"`);
        getAllUserDetails();
      } else {
        alert(res.data?.message || "Failed to update user status");
      }
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  const formatBio = (bio) => {
    if (!bio) return [];
    const words = bio.split(" ");
    const result = [];
    for (let i = 0; i < words.length; i += 5) {
      result.push(words.slice(i, i + 5).join(" "));
    }
    return result;
  };

  return (
    <>
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold text-[#c8a876] mt-2">{allUsers.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Active Users</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {allUsers.filter((u) => u.status === "Active").length}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Inactive Users</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {allUsers.filter((u) => u.status === "Inactive").length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b font-bold text-[#c8a876]">User List</div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-purple-50">
              <tr>
                <th className="p-4">Profile</th>
                <th className="p-4">Role</th>
                <th className="p-4">Address</th>
                <th className="p-4">Age</th>
                <th className="p-4">Status</th>
                <th className="p-4">Bio</th>
              </tr>
            </thead>

            <tbody>
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`${SERVER_URL}/uploads/${user.profilePic}`}
                          alt="Profile"
                          className="w-14 h-14 rounded-full shadow"
                        />
                        <div className="text-[13px] md:text-sm">
                          <p className="font-semibold">{user.username}</p>
                          <p className="text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-sm">{user.role || "N/A"}</td>
                    <td className="p-4 text-sm break-words">{user.address || "N/A"}</td>
                    <td className="p-4 text-sm">{user.age || "N/A"}</td>

                    {/* ✅ Enable / Disable Button */}
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(user._id, user.status)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold shadow ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        {user.status === "Active" ? "Disable" : "Enable"}
                      </button>
                    </td>

                    <td className="p-4 text-[13px] leading-tight">
                      {formatBio(user.bio).map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center" colSpan="6">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
