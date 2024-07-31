import React from "react";

const Menu = ({ addNode }) => {
  return (
    <>
      <div style={{ height: "20vw", width: "20vw" }}>
        <div>Menu</div>
        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={()=>addNode()}
        >
          Add Node
        </button>
      </div>
    </>
  );
};

export default Menu;
