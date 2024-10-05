import React from "react";
import { Link } from 'react-router-dom';
import { FaMoneyCheckAlt, FaTrashAlt, FaUsers, FaTruck, FaBuilding, FaRecycle } from 'react-icons/fa';

const MainAdminDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#F6F1E5] to-[#E2E8CE] p-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-6xl font-extrabold text-[#9e972f] mb-4 drop-shadow-lg">Admin Dashboard</h1>
        <p className="text-xl text-gray-700 drop-shadow-sm">Effortlessly manage your waste management platform</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Payment Manager */}
        <Link to="/showpayments" className="group">
          <div className="flex flex-col justify-center items-center bg-gradient-to-br from-[#FFC107] to-[#FFDDC1] w-52 h-52 rounded-2xl border-2 border-[#9e972f] shadow-lg group-hover:shadow-2xl transform group-hover:scale-105 transition duration-300">
            <FaMoneyCheckAlt className="text-6xl text-[#9e972f] mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <p className="text-2xl font-semibold text-[#9e972f]">Payment Manager</p>
          </div>
        </Link>

        {/* Residential Waste Manager */}
        <Link to="/adminpickup" className="group">
          <div className="flex flex-col justify-center items-center bg-gradient-to-br from-[#8BC34A] to-[#C6F1D6] w-52 h-52 rounded-2xl border-2 border-[#9e972f] shadow-lg group-hover:shadow-2xl transform group-hover:scale-105 transition duration-300">
            <FaTrashAlt className="text-6xl text-[#9e972f] mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <p className="text-2xl font-semibold text-[#9e972f] text-center">Residential Waste</p>
          </div>
        </Link>

        {/* Mass & Hazardous Waste Manager */}
        <Link to="/MnHManager" className="group">
          <div className="flex flex-col justify-center items-center bg-gradient-to-br from-[#E57373] to-[#FFE6E6] w-52 h-52 rounded-2xl border-2 border-[#9e972f] shadow-lg group-hover:shadow-2xl transform group-hover:scale-105 transition duration-300">
            <FaBuilding className="text-6xl text-[#9e972f] mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <p className="text-2xl font-semibold text-[#9e972f] text-center">Mass & Hazardous Waste</p>
          </div>
        </Link>

        {/* Employee Manager */}
        <Link to="/employeeview" className="group">
          <div className="flex flex-col justify-center items-center bg-gradient-to-br from-[#2196F3] to-[#DCE5F6] w-52 h-52 rounded-2xl border-2 border-[#9e972f] shadow-lg group-hover:shadow-2xl transform group-hover:scale-105 transition duration-300">
            <FaUsers className="text-6xl text-[#9e972f] mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <p className="text-2xl font-semibold text-[#9e972f] text-center">Employee Manager</p>
          </div>
        </Link>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {/* Vehicle Inventory Manager */}
        <Link to="/allvehicles" className="group">
          <div className="flex flex-col justify-center items-center bg-gradient-to-br from-[#FFEB3B] to-[#FFF9C4] w-52 h-52 rounded-2xl border-2 border-[#9e972f] shadow-lg group-hover:shadow-2xl transform group-hover:scale-105 transition duration-300">
            <FaTruck className="text-6xl text-[#9e972f] mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <p className="text-2xl font-semibold text-[#9e972f] text-center">Vehicle Manager</p>
          </div>
        </Link>

        {/* Customer Manager */}
        <Link to="/customerview" className="group">
          <div className="flex flex-col justify-center items-center bg-gradient-to-br from-[#FFC107] to-[#FFECB3] w-52 h-52 rounded-2xl border-2 border-[#9e972f] shadow-lg group-hover:shadow-2xl transform group-hover:scale-105 transition duration-300">
            <FaUsers className="text-6xl text-[#9e972f] mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <p className="text-2xl font-semibold text-[#9e972f] text-center">Customer Manager</p>
          </div>
        </Link>

        {/* Recycle Waste Manager */}
        <Link to="/recyclewastemanager" className="group">
          <div className="flex flex-col justify-center items-center bg-gradient-to-br from-[#8BC34A] to-[#D4E157] w-52 h-52 rounded-2xl border-2 border-[#9e972f] shadow-lg group-hover:shadow-2xl transform group-hover:scale-105 transition duration-300">
            <FaRecycle className="text-6xl text-[#9e972f] mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <p className="text-2xl font-semibold text-[#9e972f] text-center">Recycle Manager</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainAdminDashboard;
