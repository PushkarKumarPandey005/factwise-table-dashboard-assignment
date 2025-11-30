import React from 'react'
import Filter from '../Navbar/Navbar-Sub-Components/Filter'
import Search from '../Navbar/Navbar-Sub-Components/Search'

function Navbar({ onSearch, onFilter }){
  return (
    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 md:gap-4 items-stretch md:items-center bg-[#e6e7eb] rounded">
      <Filter onFilter={onFilter}/>
      <Search onSearch={onSearch}/>
    </div>
  )
}

export default Navbar