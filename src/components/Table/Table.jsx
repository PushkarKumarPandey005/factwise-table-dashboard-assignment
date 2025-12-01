import React, { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import Navbar from "../Navbar/Navbar";
import ActiveBadge from "./ActiveBadge";

import "./table.css";
import employeeData from "./data.json";

//================================== Register AG Grid Community Module==========================================
ModuleRegistry.registerModules([AllCommunityModule]);

function Table({ employees: allEmployees }) {
  const allEmps = allEmployees || employeeData.employees;

  const [filteredEmployees, setFilteredEmployees] = useState(allEmps);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;

  //=================================== Detect Window Resize===================================
  useEffect(() => {
    const listen = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", listen);
    return () => window.removeEventListener("resize", listen);
  }, []);

  //======================================= Columns: Full data shows=================================
  const columns = useMemo(
    () => [
      { headerName: "ID", field: "id", minWidth: 70 },
      {
        headerName: "Name",
        minWidth: 160,
        valueGetter: (p) => p.data.firstName + " " + p.data.lastName,
      },
      { headerName: "Email", field: "email", minWidth: 250 },

      { headerName: "Department", field: "department", minWidth: 150 },

      { headerName: "Position", field: "position", minWidth: 170 },

      {
        headerName: "Skills",
        field: "skills",
        minWidth: 240,
        cellRenderer: (p) =>
          Array.isArray(p.data.skills) ? p.data.skills.join(", ") : "",
      },

      { headerName: "Location", field: "location", minWidth: 140 },

      { headerName: "Age", field: "age", minWidth: 80 },

      {
        headerName: "Salary",
        field: "salary",
        minWidth: 130,
        cellRenderer: (p) => `$${(p.data.salary / 1000).toFixed(0)}K`,
      },

      { headerName: "Performance", field: "performanceRating", minWidth: 120 },

      { headerName: "Projects", field: "projectsCompleted", minWidth: 115 },

      { headerName: "Manager", field: "manager", minWidth: 150 },

      { headerName: "Hire Date", field: "hireDate", minWidth: 130 },

      {
        headerName: "Active",
        field: "isActive",
        minWidth: 100,
        cellRenderer: ActiveBadge,
      },
    ],
    []
  );

  //======================================== Auto-calculated Table Width=================================
  const minWidth = useMemo(() => {
    return columns.reduce(
      (acc, col) => acc + (col.minWidth || 120),
      0
    );
  }, [columns]);

  // ======================================Search Handler==================================
  const handleSearch = (text) => {
    const s = text.trim().toLowerCase();
    if (!s) return setFilteredEmployees(allEmps);

    setFilteredEmployees(
      allEmps.filter(
        (e) =>
          e.firstName.toLowerCase().includes(s) ||
          e.lastName.toLowerCase().includes(s) ||
          e.email.toLowerCase().includes(s) ||
          e.department.toLowerCase().includes(s) ||
          e.position.toLowerCase().includes(s) ||
          e.location.toLowerCase().includes(s)
      )
    );
  };

  //=================================== Filters===============================================
  const handleFilter = (filters) => {
    let temp = [...allEmps];

    if (filters.department.length)
      temp = temp.filter((e) => filters.department.includes(e.department));

    if (filters.position.length)
      temp = temp.filter((e) => filters.position.includes(e.position));

    if (filters.isActive.length)
      temp = temp.filter((e) =>
        filters.isActive.includes(e.isActive ? "Active" : "Inactive")
      );

    if (filters.location.length)
      temp = temp.filter((e) => filters.location.includes(e.location));

    if (filters.skills.length)
      temp = temp.filter((e) =>
        filters.skills.some((skill) => e.skills?.includes(skill))
      );

    setFilteredEmployees(temp);
  };

  return (
    <div className="w-full flex flex-col gap-4">

      {/*===================================== Header================================================ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
          Employee Data
        </h2>

        <Navbar onSearch={handleSearch} onFilter={handleFilter} />
      </div>

      {/*================================= TABLE SECTION============================================= */}
      <div className="w-full flex-1 rounded-lg">

        {/*=========================== MOBILE VIEW (HTML TABLE)================================== */}
        {isMobile ? (
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table className="mobile-table" style={{ minWidth }}>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.headerName}>{col.headerName}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    {columns.map((col) => {
                      const val = col.valueGetter
                        ? col.valueGetter({ data: emp })
                        : col.field === "isActive"
                        ? emp.isActive
                          ? "Active"
                          : "Inactive"
                        : emp[col.field];

                      return <td key={col.headerName}>{val}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /*============================= DESKTOP + TABLET AG GRID================================ */
          <div style={{ overflowX: "auto", width: "100%" }}>
            <div style={{ minWidth }}>
              <div
                className="ag-theme-alpine grid-desine"
                style={{ height: "calc(100vh - 430px)", minHeight: "420px" }}
              >
                <AgGridReact
                  rowData={filteredEmployees}
                  columnDefs={columns}
                  pagination={true}
                  paginationPageSize={10}
                  rowHeight={45}
                  animateRows={true}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    filter: true,
                  }}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Table;
