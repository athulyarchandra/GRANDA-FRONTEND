import React from "react";
import { Link, Outlet } from "react-router-dom";
import adminImg from "../assets/guest-admin.jpg";

const AdminPortal = () => {
  
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md hidden sm:block">
          <div className="p-6 font-bold text-[#c8a876] text-2xl">
            AdminPanel
          </div>
          <nav className="mt-8">
            <Link to={"/adminPortal/dashboard"} className="block py-3 px-6 text-gray-700 hover:bg-purple-100">
              Products
            </Link>
            <Link to={"/adminPortal/users"}  className="block py-3 px-6 text-gray-700 hover:bg-purple-100">
              Users
            </Link>
            <Link to={"/adminPortal/categories"}  className="block py-3 px-6 text-gray-700 hover:bg-purple-100">
              Categories
            </Link>
            <Link to={"/adminPortal/orders"}  className="block py-3 px-6 text-gray-700 hover:bg-purple-100">
              Orders
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#c8a876]">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#e8bb74] flex items-center justify-center text-white font-bold">
                AR
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6 space-y-6">
            <Outlet/>
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
              <img
                src={adminImg}
                alt="Profile"
                className="w-20 h-20 rounded-full shadow"
              />
              <div>
                <h3 className="text-xl font-bold text-purple-700">
                  Athulya R Chandra
                </h3>
                <p className="text-gray-500">Administrator</p>
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-white p-4 mt-10 text-center text-sm text-gray-400 border-t">
              © 2025 AdminPanel. All rights reserved.
            </footer>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPortal;
