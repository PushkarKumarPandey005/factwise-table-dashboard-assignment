import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../components/Table/Table";
import employeeData from "../components/Table/data.json";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const employees = employeeData.employees;

  //===================================== Counts=============================
  const totalEmployees = employees.length;
  const activeUsers = employees.filter(emp => emp.isActive).length;
  const inactiveUsers = employees.filter(emp => !emp.isActive).length;

  //=============================== Card info ================================
  const cardDetails = [
    { title: "Total Employees", value: totalEmployees, color: "bg-blue-500" },
    { title: "Active Employees", value: activeUsers, color: "bg-green-500" },
    { title: "Inactive Employees", value: inactiveUsers, color: "bg-red-500" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#e6e7eb] overflow-x-hidden">

      {/*============================================ Mobile Header=========================== */}
      <div className="md:hidden bg-[#2f3c70] text-white p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-40 shadow-lg">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl hover:bg-[#3d4a7f] p-2 rounded transition"
        >
          {sidebarOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      <div className="flex">

        {/* =================================Sidebar =================================*/}
        <div
          className={`fixed md:relative z-30 bg-white h-full transition-all duration-300 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/*=========================== Mobile Overlay====================================== */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/*============================= Main Content=================================== */}
        <div className="flex-1 flex flex-col w-full mt-16 md:mt-0 overflow-hidden">

          {/* ==============================Info Cards==================================== */}
          <div className="bg-[#e6e7eb] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 
          px-4 md:px-6 lg:px-8 py-6 md:py-8">

            {cardDetails.map((card, index) => (
              <div
                key={index}
                className={`${card.color} rounded-2xl flex flex-col justify-center items-center text-white shadow-lg p-6 min-h-32 md:min-h-40 transition-transform hover:scale-105`}
              >
                <h2 className="text-sm md:text-base lg:text-lg font-semibold text-center">{card.title}</h2>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">{card.value}</p>
              </div>
            ))}
          </div>

          {/* ==================================Table============================================== */}
          <div className="mt-4 table-container md:mt-6 w-full bg-[#e6e7eb] 
          px-2 md:px-6 lg:px-8 pb-6 flex-1 overflow-hidden">

            <div className="w-full overflow-x-auto">
              <Table employees={employees} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
