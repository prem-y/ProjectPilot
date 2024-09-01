import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [canvasData, setCanvasData] = useState([]);
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCanvasData();
  }, []);

  const fetchCanvasData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data/");
      setCanvasData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleNavigate = (flowId) => {
    localStorage.setItem('flowId', JSON.stringify(flowId));
    navigate('/canvas');
  };

  const handleCreateButtonClick = async () => {
    if (inputText === '') {
      alert("Please enter the Project name");
      return;
    }

    const flowData = {
      flowId: uuidv4(),
      projectName: inputText,
      nodes: [],
      edges: [],
    };

    try {
      await axios.post("http://localhost:5000/data/add", flowData, {
        header: {
          "Content-Type": "application/json",
        },
      });
      console.log("Flow data created");
      fetchCanvasData();
      handleNavigate(flowData.flowId);
    } catch (error) {
      console.log("Error creating flow data", error);
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="h-auto w-full bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 space-y-8">
        <div className="w-full text-center">
          <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Create a New Project Flow
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="h-36 w-72 bg-white shadow-xl rounded-lg flex items-center justify-center text-gray-800 text-xl font-semibold transform hover:scale-110 transition-transform duration-300">
              Design Class Diagram
            </div>
            <div className="h-36 w-72 bg-white shadow-xl rounded-lg flex items-center justify-center text-gray-800 text-xl font-semibold transform hover:scale-110 transition-transform duration-300">
              Create Project Plan
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <select className="p-3 text-lg rounded-lg border-2 border-gray-300 shadow-md bg-white focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform duration-300">
            <option value="" className="text-gray-700">
              -Select-
            </option>
            <option value="class" className="text-gray-700">
              Class Diagram
            </option>
            <option value="activity" className="text-gray-700">
              Project Plan
            </option>
          </select>

          <input
            type="text"
            placeholder="Enter the Project name"
            className="p-3 text-lg rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 bg-white w-full sm:w-80 transition-transform duration-300"
            onChange={(evt) => setInputText(evt.target.value)}
          />

          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg font-semibold shadow-lg transform hover:scale-110 transition-transform duration-300"
            onClick={handleCreateButtonClick}
          >
            Create
          </button>
        </div>
      </div>

      {/* Project List Section */}
      <div className="w-full p-8 md:p-16 lg:p-24">
        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
          All Projects
        </div>
        <input
          type="text"
          placeholder="Search projects..."
          className="p-4 mb-6 text-lg rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 bg-white w-full md:w-1/2 transition-transform duration-300"
        />
        <ul className="space-y-4">
          {canvasData.map((data) => (
            <li
              key={data.flowId}
              className="cursor-pointer bg-white p-4 rounded-lg shadow-md hover:bg-blue-100 transform hover:scale-105 transition-transform duration-300"
              onClick={() => handleNavigate(data.flowId)}
            >
              <span className="text-xl font-semibold text-gray-800">
                {data.projectName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
