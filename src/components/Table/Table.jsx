import React, { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import Navbar from '../Navbar/Navbar'

import ActiveBadge from "./ActiveBadge";
import "./table.css";
import employeeData from "../Table/data.json";

// ==============================================register community modules
ModuleRegistry.registerModules([AllCommunityModule]);

function Table({ employees: allEmployees }) {
    //========================================= Use passed employees or default from data.json
    const allEmps = allEmployees || employeeData.employees;

    //================================================= State for filtered employees
    const [filteredEmployees, setFilteredEmployees] = useState(allEmps);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    // Detect screen size for responsive columns
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // =====================Column Define Here================================
    const columns = useMemo(() => {
        const baseColumns = [
            {
                headerName: "ID",
                field: "id",
                width: 80,
                sortable: true,
                cellClass: "cell-id",
                minWidth: 70,
                
            },

            {
                headerName: "Name",
                valueGetter: (params) => {
                    return params.data.firstName + " " + params.data.lastName;
                },
                flex: 2,
                sortable: true,
                cellClass: "cell-name",
                minWidth: 160
            },

            {
                headerName: "Email",
                field: "email",
                flex: 2.6,
                cellClass: "cell-email",
                minWidth: 250,
                hide: isMobile
            },

            {
                headerName: "Department",
                field: "department",
                flex: 1.2,
                cellClass: "cell-dept",
                minWidth: 170,
                hide: isMobile
            },

            {
                headerName: "Position",
                field: "position",
                flex: 1.4,
                cellClass: "cell-position",
                minWidth: 180,
                hide: isMobile
            },

            {
                headerName: "Skills",
                field: "skills",
                flex: 2.2,
                cellClass: "cell-position",
                minWidth: 300,
                hide: isMobile,
                cellRenderer: (params) => {
                    const skills = params.data.skills;
                    return Array.isArray(skills) ? skills.slice(0, 2).join(", ") + (skills.length > 2 ? "..." : "") : "";
                }
            },

            {
                headerName: "Location",
                field: "location",
                flex: 1.1,
                cellClass: "cell-location",
                minWidth: 130,
                hide: isMobile
            },

            {
                headerName: "Age",
                field: "age",
                width: 90,
                cellClass: "cell-age",
                minWidth: 80,
                hide: isMobile
            },

            {
                headerName: "Salary",
                field: "salary",
                flex: 1.2,
                cellClass: "cell-salary",
                minWidth: 140,
                hide: isMobile,
                cellRenderer: (params) => {
                    return params.data.salary ? `$${(params.data.salary / 1000).toFixed(0)}K` : "N/A";
                }
            },

            {
                headerName: "Performance",
                field: "performanceRating",
                width: 120,
                cellClass: "cell-performance",
                minWidth: 160,
                hide: isMobile
            },

            {
                headerName: "Projects",
                field: "projectsCompleted",
                width: 110,
                cellClass: "cell-projects",
                minWidth: 115,
                hide: isMobile
            },

            {
                headerName: "Manager",
                field: "manager",
                flex: 1.3,
                cellClass: "cell-manager",
                minWidth: 150,
                hide: isMobile
            },

            {
                headerName: "Hire Date",
                field: "hireDate",
                flex: 1.2,
                cellClass: "cell-hiredate",
                minWidth: 140,
                hide: isMobile
            },

            {
                headerName: "Active",
                field: "isActive",
                 minWidth: 140,
                cellRenderer: ActiveBadge,
                cellClass: "cell-active"
            }
        ];

        // Remove non-essential columns on mobile
        if (isMobile) {
            return baseColumns.filter(col => !col.hide);
        }
        return baseColumns;
    }, [isMobile]);

    // compute a sensible minimum width for the HTML table / grid wrapper
    const minTableWidth = useMemo(() => {
        try {
            const total = columns.reduce((acc, c) => acc + (c.minWidth || 120), 0);
            // leave some padding room
            return Math.max(total + 40, 760);
        } catch (e) {
            return 900;
        }
    }, [columns]);

    // cap the min width to viewport so the table doesn't force an oversized layout
    const effectiveMinWidth = useMemo(() => {
        // keep a small padding so scrollbars and side paddings are accounted for
        const avail = (windowWidth || 900) - 40;
        return Math.min(minTableWidth, Math.max(avail, 420));
    }, [minTableWidth, windowWidth]);



    {/*=================================Search Handler=============================*/ }
    function handleSearch(text) {
        if (!text || text.trim() === "") {
            // empty search -> reset
            setFilteredEmployees(allEmps);
            return;
        }

        const searchText = text.trim().toLowerCase();

        const newList = allEmps.filter((emp) =>
            (emp.firstName && emp.firstName.toLowerCase().includes(searchText)) ||
            (emp.lastName && emp.lastName.toLowerCase().includes(searchText)) ||
            (emp.email && emp.email.toLowerCase().includes(searchText)) ||
            (emp.department && emp.department.toLowerCase().includes(searchText)) ||
            (emp.position && emp.position.toLowerCase().includes(searchText)) ||
            (emp.location && emp.location.toLowerCase().includes(searchText))
        );

        setFilteredEmployees(newList);
    }

    
    
    // ============================== Filter Handler======================================================
    function handleFilter(filters) {
        let temp = allEmps;

        if (filters.department.length > 0) {
            temp = temp.filter(emp => filters.department.includes(emp.department));
        }

        if (filters.position.length > 0) {
            temp = temp.filter(emp => filters.position.includes(emp.position));
        }

        if (filters.isActive.length > 0) {
            temp = temp.filter(emp => filters.isActive.includes(emp.isActive ? "Active" : "Inactive"));
        }

        // Location filter (match exact location)
        if (filters.location && filters.location.length > 0) {
            temp = temp.filter(emp => filters.location.includes(emp.location));
        }

        // Skills filter (match if employee has ANY of the selected skills)
        if (filters.skills && filters.skills.length > 0) {
            temp = temp.filter(emp => {
                if (!Array.isArray(emp.skills)) return false;
                return filters.skills.some(skill => emp.skills.includes(skill));
            });
        }

        setFilteredEmployees(temp);
    }





    return (
        <div className="w-full h-full flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-xl sm:text-2xl md:text-3xl ml-130 font-bold text-blue-600 tracking-wide">
                    Employee Data
                </h2>

                <Navbar
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                />
            </div>

            {/* Table Container - horizontally scrollable on small screens */}
                <div className="flex-1 w-full rounded-lg">
                    {isMobile ? (
                        // Mobile: render a horizontal-scrollable HTML table so user can pan across columns
                        <div className="overflow-x-auto px-4 md:px-0">
                            <table className="mobile-table w-full" style={{ minWidth: effectiveMinWidth }}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Position</th>
                                        <th>Skills</th>
                                        <th>Location</th>
                                        <th>Age</th>
                                        <th>Salary</th>
                                        <th>Performance</th>
                                        <th>Projects</th>
                                        <th>Manager</th>
                                        <th>Hire Date</th>
                                        <th>Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployees && filteredEmployees.length > 0 ? (
                                        filteredEmployees.map(emp => (
                                            <tr key={emp.id} className="bg-white">
                                                <td className="py-2 px-3">{emp.id}</td>
                                                <td className="py-2 px-3">{emp.firstName} {emp.lastName}</td>
                                                <td className="py-2 px-3">{emp.email}</td>
                                                <td className="py-2 px-3">{emp.department}</td>
                                                <td className="py-2 px-3">{emp.position}</td>
                                                <td className="py-2 px-3">{Array.isArray(emp.skills) ? emp.skills.join(', ') : ''}</td>
                                                <td className="py-2 px-3">{emp.location}</td>
                                                <td className="py-2 px-3">{emp.age}</td>
                                                <td className="py-2 px-3">${(emp.salary / 1000).toFixed(0)}K</td>
                                                <td className="py-2 px-3">{emp.performanceRating}</td>
                                                <td className="py-2 px-3">{emp.projectsCompleted}</td>
                                                <td className="py-2 px-3">{emp.manager || 'N/A'}</td>
                                                <td className="py-2 px-3">{emp.hireDate}</td>
                                                <td className="py-2 px-3"><span className={emp.isActive ? 'active-badge' : 'inactive-badge'}>{emp.isActive ? 'Active' : 'Inactive'}</span></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={14} className="text-center text-gray-600 p-6">No records found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        // Desktop or tablet: AG Grid with horizontal scroll support
                        <div className="overflow-x-auto px-4 md:px-0">
                            <div style={{ minWidth: effectiveMinWidth }}>
                                <div
                                    className="ag-theme-alpine grid-desine w-full"
                                        style={{
                                            minHeight: "400px",
                                            height: "calc(100vh - 460px)",
                                        }}
                                >
                                    <AgGridReact
                                        rowData={filteredEmployees}
                                        columnDefs={columns}
                                        pagination={true}
                                        paginationPageSize={10}
                                        animateRows={true}
                                        rowHeight={45}
                                        domLayout="normal"
                                        suppressHorizontalScroll={false}
                                        enableColResize={true}
                                        defaultColDef={{
                                            resizable: true,
                                            sortable: true,
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
