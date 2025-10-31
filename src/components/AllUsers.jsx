import React, { useEffect, useState } from "react";
import { getAllUsersAPI } from "../services/allAPI";
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
        users.sort((a, b) =>
          a.username.localeCompare(b.username)
        );
        console.log(users);
        setAllUsers(users);
      } else {
        alert(response.data.error)
      }

    } catch (err) {
      console.log(err);
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

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const res = await updateUserStatusAPI(userId, newStatus);
      if (res.status === 200) {
        alert(`User status updated to "${newStatus}"`);
        // Refresh user list
        fetchAllUsers();
      }
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  return (
    <>
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold text-[#c8a876] mt-2">{allUsers.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">$24,500</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">New Orders</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">320</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Pending Tickets</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">12</h2>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">

        {/* Title */}
        <div className="p-4 border-b font-bold text-[#c8a876]">
          User List
        </div>

        {/* Responsive Wrapper */}
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
                allUsers.map((user, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <img
                          src={`${SERVER_URL}/${user.profilePic}`}
                          alt="Profile"
                          className="w-14 h-14 rounded-full shadow"
                        />
                        <div className="text-[13px] md:text-sm">
                          <p className="font-semibold">{user.username}</p>
                          <p className="text-gray-500 break-all">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-sm">{user.role || "N/A"}</td>
                    <td className="p-4 text-sm break-words">{user.address || "N/A"}</td>
                    <td className="p-4 text-sm">{user.age || "N/A"}</td>

                    <td className="p-4">
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                        className={`border rounded-lg p-2 text-sm ${user.status === "Active"
                            ? "text-green-600 border-green-400"
                            : "text-red-600 border-red-400"
                          }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>


                    <td className="p-4 text-[13px] leading-tight">
                      {formatBio(user.bio).map((line, index) => (
                        <p key={index} className="whitespace-normal">
                          {line}
                        </p>
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
      {/* Action Buttons */}
      <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-[#c8a876]">
          Add User
        </button>
        <button className="bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700">
          Export Data
        </button>
        <button className="bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700">
          Generate Report
        </button>
        <button className="bg-red-600 text-white py-3 rounded-lg shadow hover:bg-red-700">
          Delete Records
        </button>
      </div>

    </>

  );
};

export default AllUsers;
