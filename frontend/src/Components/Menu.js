import React, { useState, useEffect } from "react";
import FormTypeClass from "./FormTypeClass";

const Menu = ({
  addNode,
  node,
  setNode,
  updateNode,
  projectName,
  projectType,
  table,
  setTable
}) => {
  const handleRelationshipChange = (e) => {
    const updatedNode = {
      ...node,
      type: e.target.value,
    };
    setNode(updatedNode);
    updateNode(updatedNode);
  };
  // const [table, setTable] = useState([]);
  const [number, setNumber] = useState(1);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");

  const addTableContent = (e) => {
    e.preventDefault();
    if (activity.trim() && duration.trim()) {
      setTable((prevTable) => [...prevTable, { number, activity, duration }]);
      setActivity("");
      setDuration("");
      setNumber((prevNumber) => prevNumber + 1);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <div className="mb-4 text-lg font-semibold">Project: {projectName}</div>
      <div className="mb-4 text-lg font-semibold">Menu</div>
      {projectType === "Diagram" ? (
        <>
          {node.type === "association" || node.type === "composition" ? (
            <FormTypeClass
              addNode={addNode}
              node={node}
              setNode={setNode}
              updateNode={updateNode}
              handleRelationshipChange={handleRelationshipChange}
            />
          ) : null}

          <div className="flex flex-col space-y-2">
            <button
              className="bg-blue-500 text-white w-full p-2 rounded-md shadow-md hover:bg-blue-600"
              onClick={() => addNode("newNode")}
            >
              Add Node
            </button>
            <button
              className="bg-blue-500 text-white w-full p-2 rounded-md shadow-md hover:bg-blue-600"
              onClick={() => addNode("classBlock")}
            >
              Class Block
            </button>
          </div>
        </>
      ) : null}
      {projectType === "Plan" ? (
        <>
          <form>
            <label>Enter: </label>
            <div className="flex m-1">
              <input
                type="text"
                className="border w-1/3 cursor-not-allowed m-1"
                value={number}
                disabled
              />{" "}
              <input
                type="text"
                className="w-1/3 m-1"
                placeholder="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />{" "}
              <input
                type="text"
                className="w-1/3 m-1"
                placeholder="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white w-full p-1 rounded-md shadow-md hover:bg-blue-600"
              onClick={addTableContent}
            >
              Add
            </button>
          </form>
          <table className="w-full mt-6 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left font-medium">No.</th>
                <th className="border px-4 py-2 text-left font-medium">
                  Activity
                </th>
                <th className="border px-4 py-2 text-left font-medium">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {table.length > 0 ? (
                table.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-50 transition"
                  >
                    <td className="border px-4 py-2">{row.number}</td>
                    <td className="border px-4 py-2">{row.activity}</td>
                    <td className="border px-4 py-2">{row.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="border px-4 py-4 text-center text-gray-500"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button
              className="bg-blue-500 text-white w-full p-2 rounded-md shadow-md hover:bg-blue-600 mt-4"
              onClick={() => addNode("activity")}
            >
              Generate
            </button>
        </>
      ) : null}
    </div>
  );
};

export default Menu;
