import React from "react";

function Card({ title, value, color }) {
  return (
    <div
      className="w-64 h-28 mt-10 rounded-2xl p-4 text-[#171718] bg-[#c6c9d5] "
      style={{ background: color }}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default Card;
