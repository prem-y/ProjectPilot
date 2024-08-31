import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const [canvasData, setCanvasData] = useState([]);
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetchCanvasData();
  }, []);


  const fetchCanvasData = async() => {
    try{
      const response = await axios.get("http://localhost:5000/data/");
      setCanvasData(response.data);
    } catch(error){
      console.error("Error fetching data: ",error);
    }
  };

  const handleNavigate = (flowId) =>{
    localStorage.setItem('flowId',JSON.stringify(flowId));
    navigate('/canvas');
  }

  const handleCreateButtonClick = async () =>{
    if(inputText === ''){
      alert("Please enter the Project name");
      return;
    }

    const flowData = {
      flowId: uuidv4(),
      projectName: inputText,
      nodes: [],
      edges: [],
    };

    try{
      await axios.post("http://localhost:5000/data/add", flowData, {
        header:{
          "Content-Type":"application/json",
        },
      });
      console.log("Flow data created");
      fetchCanvasData();
      handleNavigate(flowData.flowId);
    } catch(error){
      console.log("Error creating flow data", error);
    }
  };
  return (
    <>
      {/* <Grid /> */}
      <div className="h-96 w-full bg-gradient-to-r from-blue-200 to-blue-400 flex flex-col items-center justify-center p-8">
        <div className="w-full text-center">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Create a New UML Diagram
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="h-36 w-60 bg-white shadow-lg rounded-lg flex items-center justify-center text-gray-800 text-xl font-semibold transform hover:scale-105 transition-transform">
              Class Diagram
            </div>
            <div className="h-36 w-60 bg-white shadow-lg rounded-lg flex items-center justify-center text-gray-800 text-xl font-semibold transform hover:scale-105 transition-transform">
              State Diagram
            </div>
            <div className="h-36 w-60 bg-white shadow-lg rounded-lg flex items-center justify-center text-gray-800 text-xl font-semibold transform hover:scale-105 transition-transform">
              Activity Diagram
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <select className="p-3 text-lg rounded-lg border-2 border-gray-300 shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform">
            <option value="" className="text-gray-700">
              -Select-
            </option>
            <option value="state" className="text-gray-700">
              State Diagram
            </option>
            <option value="class" className="text-gray-700">
              Class Diagram
            </option>
            <option value="activity" className="text-gray-700">
              Activity Diagram
            </option>
          </select>

          <input
            type="text"
            placeholder="Enter the Project name"
            className="p-3 text-lg rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full sm:w-80"
            onChange={(evt) => setInputText(evt.target.value)}
          />

          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-transform"
          onClick={handleCreateButtonClick}
          >
            Create
          </button>
        </div>
      </div>

      <div>
        <div>All Projects</div>
        <input type="text" placeholder="Search projects..." />
        <ul>
          {canvasData.map(function (data) {
            return (
              <>
                <li 
                key={data.flowId}
                className="cursor-pointer hover:underline" 
                onClick={() => handleNavigate(data.flowId)}
                >
                  {data.projectName}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
