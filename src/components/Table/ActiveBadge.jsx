import React from "react";


function ActiveBadge(props) {
  const isActive = props.data.isActive;

  return (
    <div className={isActive ? "active-badge" : "inactive-badge"}>
      {isActive ? " Active" : " Inactive"}
    </div>
  );
}

export default ActiveBadge;
