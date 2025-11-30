import React, { useState } from 'react'
import { Link } from "react-router-dom";

import './Sidebar.css'
import factwise from '../../assets/factwiseLogo.webp'
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaUsersSolid } from "react-icons/lia";
import { MdAnalytics, MdSettings } from "react-icons/md";


function Sidebar({ onClose }) {

  const [expand, setExpand] = useState(true);

  return (
    <div className={`${expand ? "w-56" : "w-20"} h-screen bg-[#2f3c70]/45 custom-css text-white transition-all duration-300 overflow-y-auto flex flex-col`}>

      {/*==============Company Logo=============================*/}
      <div className="logo flex justify-center p-3">
        <img src={factwise} alt="Logo" className={`${expand ? "w-12 h-12" : "w-10 h-10"} bg-white rounded transition-all`} />
      </div>

      {/*============================== Dashboard Link================================= */}
      <div className="relative group">
        <Link to="/" onClick={onClose} className={`flex items-center px-4 py-3 transition-colors rounded mx-2 mt-4 ${expand ? "hover:bg-[#777779]" : "justify-center hover:bg-[#3d4a7f]"}`}>
          <LuLayoutDashboard size={24} color="white" strokeWidth={3} />
          <span className={`ml-4 text-white font-bold tracking-widest transition-all ${expand ? "opacity-100 block" : "opacity-0 hidden"}`}>Dashboard</span>
        </Link>
        {!expand && <div className="absolute left-24 top-3 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">Dashboard</div>}
      </div>

      {/*============================== Employees Link================================= */}
      <div className="relative group">
        <Link to="/employees" onClick={onClose} className={`flex items-center px-4 py-3 transition-colors rounded mx-2 mt-3 ${expand ? "hover:bg-[#777779]" : "justify-center hover:bg-[#3d4a7f]"}`}>
          <LiaUsersSolid size={24} color="white" strokeWidth={0} />
          <span className={`ml-4 text-white font-bold tracking-widest transition-all ${expand ? "opacity-100 block" : "opacity-0 hidden"}`}>Employees</span>
        </Link>
        {!expand && <div className="absolute left-24 top-3 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">Employees</div>}
      </div>

      {/*============================== Reports Link================================= */}
      <div className="relative group">
        <Link to="/reports" onClick={onClose} className={`flex items-center px-4 py-3 transition-colors rounded mx-2 mt-3 ${expand ? "hover:bg-[#777779]" : "justify-center hover:bg-[#3d4a7f]"}`}>
          <MdAnalytics size={24} color="white" />
          <span className={`ml-4 text-white font-bold tracking-widest transition-all ${expand ? "opacity-100 block" : "opacity-0 hidden"}`}>Reports</span>
        </Link>
        {!expand && <div className="absolute left-24 top-3 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">Reports</div>}
      </div>

      {/*============================== Settings Link================================= */}
      <div className="relative group">
        <Link to="/settings" onClick={onClose} className={`flex items-center px-4 py-3 transition-colors rounded mx-2 mt-3 ${expand ? "hover:bg-[#777779]" : "justify-center hover:bg-[#3d4a7f]"}`}>
          <MdSettings size={24} color="white" />
          <span className={`ml-4 text-white font-bold tracking-widest transition-all ${expand ? "opacity-100 block" : "opacity-0 hidden"}`}>Settings</span>
        </Link>
        {!expand && <div className="absolute left-24 top-3 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">Settings</div>}
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Collapse Button */}
      <button
        onClick={() => setExpand(!expand)}
        className="bg-white text-black px-2 py-1 rounded-xl m-3 text-sm hover:bg-gray-200 transition-colors hidden md:block"
      >
        {expand ? "<" : ">"}
      </button>
    </div>
  )
}

export default Sidebar