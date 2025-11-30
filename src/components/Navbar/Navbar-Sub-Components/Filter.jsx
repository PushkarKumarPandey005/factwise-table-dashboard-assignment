import { useState, useEffect } from "react";
import { LuFilter } from "react-icons/lu";
import employeeData from "../../Table/data.json";

function Filter({ onFilter }) {
  const employees = employeeData.employees;

  const [open, setOpen] = useState(false);

  // Dropdown states
  const [show, setShow] = useState({
    department: false,
    position: false,
    location: false,
    isActive: false,
    skills: false,
  });

  // Selected filter values
  const [selected, setSelected] = useState({
    department: [],
    position: [],
    location: [],
    isActive: [],
    skills: [],
  });

  // Generate dynamic options from JSON
  const [options, setOptions] = useState({
    department: [],
    position: [],
    location: [],
    isActive: ["Active", "Inactive"],
    skills: [],
  });

  // Extract unique values dynamically from JSON
  useEffect(() => {
    const departments = [...new Set(employees.map(e => e.department))];
    const positions = [...new Set(employees.map(e => e.position))];
    const locations = [...new Set(employees.map(e => e.location))];

    // Unique skills from nested arrays
    const skills = [
      ...new Set(employees.flatMap(e => e.skills)),
    ];

    setOptions({
      department: departments,
      position: positions,
      location: locations,
      isActive: ["Active", "Inactive"],
      skills: skills,
    });
  }, []);

  // Generic checkbox toggle
  function toggleCheckbox(category, value) {
    setSelected(prev => {
      const exists = prev[category].includes(value);
      return {
        ...prev,
        [category]: exists
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value],
      };
    });
  }

  // Apply filters
  function applyFilters() {
    if (onFilter) onFilter(selected);
    setOpen(false);
  }

  // Clear All
  function clearAll() {
    const empty = {
      department: [],
      position: [],
      location: [],
      isActive: [],
      skills: [],
    };

    setSelected(empty);
    setShow({
      department: false,
      position: false,
      location: false,
      isActive: false,
      skills: false,
    });

    if (onFilter) onFilter(empty);
  }

  return (
    <div className="relative w-full md:w-auto">

      {/*============================================== Filter Main Button==================================== */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-full md:w-auto bg-[#3841fc] text-white px-3 md:px-4 py-2 rounded hover:bg-[#2d31cc] transition text-sm font-bold tracking-widest"
      >
        <LuFilter size={20} />
        <span className="ml-2">Filter</span>
      </button>

      {/*=====================================Filter pannel==================================== */}
      {open && (
        <div className="absolute top-full left-0 right-0 md:right-0 mt-2 bg-white text-black rounded shadow-lg p-4 w-full md:w-72 z-50 max-h-96 overflow-y-auto">

          {/*========================================= LOOP THROUGH ALL CATEGORIES========================================== */}
          {Object.keys(options).map(category => (
            <div key={category} className="mt-4 first:mt-0">

              {/* ==========================================================CATEGORY TITLE======================================= */}
              <p
                className="cursor-pointer font-bold text-sm md:text-base hover:text-blue-600 transition py-2 border-b pb-2"
                onClick={() => setShow(prev => ({ ...prev, [category]: !prev[category] }))}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} {show[category]}
              </p>

              {/*==================================================================== DROPDOWN OPTIONS===================================== */}
              {show[category] && (
                <div className="ml-4 mt-3 mb-3 flex flex-col gap-2 max-h-40 overflow-y-auto">

                  {options[category].map(option => (
                    <label key={option} className="flex gap-2 items-center text-xs md:text-sm cursor-pointer hover:text-blue-600 transition">
                      <input
                        type="checkbox"
                        checked={selected[category].includes(option)}
                        onChange={() => toggleCheckbox(category, option)}
                        className="cursor-pointer w-4 h-4"
                      />
                      <span>{option}</span>
                    </label>
                  ))}

                </div>
              )}
            </div>
          ))}

          {/* ===================================Buttons========================================= */}
          <div className="flex flex-col sm:flex-row gap-2 mt-6 pt-4 border-t">
            <button
              onClick={applyFilters}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-bold hover:bg-blue-700 transition"
            >
              Apply
            </button>

            <button
              onClick={clearAll}
              className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm font-bold hover:bg-red-700 transition"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
