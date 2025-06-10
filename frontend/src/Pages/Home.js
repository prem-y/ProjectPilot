import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ReactComponent as darkModeButton } from "../assets/darkMode.svg";
import { ThemeProvider } from "../contexts/theme";
const Home = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [canvasData, setCanvasData] = useState([]);
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchCanvasData();
  }, []);

  const toggleDarkMode = () => {
    // alert("ok");
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const fetchCanvasData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/flow/");
      const dataWithTimeAgo = response.data.map((item) => {
        return {
          ...item,
          timeAgo: calculateTimeDifference(item.lastModified),
        };
      });
      setCanvasData(dataWithTimeAgo);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const calculateTimeDifference = (lastModified) => {
    const lastModifiedDate = new Date(lastModified);
    const now = new Date();
    const diffInMs = now - lastModifiedDate;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 50);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day(s) ago`;
    } else if (hours > 0) {
      return `${hours} hour(s) ago`;
    } else if (minutes > 0) {
      return `${minutes} minute(s) ago`;
    } else {
      return `${seconds} second(s) ago`;
    }
  };

  const handleSelectChange = (evt) => {
    setSelectedOption(evt.target.value);
  };

  const handleNavigate = (flowId) => {
    localStorage.setItem("flowId", JSON.stringify(flowId));
    navigate("/canvas");
  };

  const handleCreateButtonClick = async () => {
    if (inputText === "") {
      alert("Please enter the Project name");
      return;
    }

    const flowData = {
      flowId: uuidv4(),
      projectName: inputText,
      projectType: selectedOption,
      nodes: [],
      edges: [],
    };

    try {
      await axios.post("http://localhost:5000/flow/add", flowData, {
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

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the flow?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/flow/${id}`)
        .then((response) => {
          console.log(response.data);
          fetchCanvasData();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const [themeMode, setThemMode] = useState('light')

  const darkTheme = () => {
    setThemMode('dark')
  }

  const lightTheme = () => {
    setThemMode('light')
  }

  useEffect(() => {
    document.querySelector('html').classList.remove('dark','light')
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  return (
    <>
      <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
        {/* Header Section */}
        <div
          className={"h-auto w-full bg-gradient-to-r  from-blue-300 via-purple-300 to-blue-400 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 space-y-8"}
        >
          
          <div className="w-full text-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Create a New Project Flow
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="lg:h-36 lg:w-72 md:h-36 p-3 sm:h-36 bg-white shadow-xl rounded-lg flex items-center justify-center text-gray-800 text-xl font-semibold transform hover:scale-110 transition-transform duration-300">
                Design Class Diagram
              </div>
              <div className="lg:h-36 lg:w-72 md:h-36 p-3 sm:h-36 bg-white shadow-xl rounded-lg flex items-center justify-center text-gray-800 text-xl font-semibold transform hover:scale-110 transition-transform duration-300">
                Create Project Plan
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <select
              className="p-3 text-lg rounded-lg border-2 border-gray-300 shadow-md bg-white focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform duration-300"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" className="text-gray-700">
                -Select-
              </option>
              <option value="Diagram" className="text-gray-700">
                Class Diagram
              </option>
              <option value="Plan" className="text-gray-700">
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
        <div className="w-full p-8 md:p-16 lg:p-24 ">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            All Projects
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            className="p-4 mb-6 text-lg rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 bg-white w-full md:w-1/2 transition-transform duration-300"
          />
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4 text-lg font-semibold text-gray-800">
                  Project Name
                </th>
                <th className="p-4 text-lg font-semibold text-gray-800">
                  Project Type
                </th>
                <th className="p-4 text-lg font-semibold text-gray-800">
                  Last Modified
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {canvasData.map((data) => (
                <tr
                  key={data.flowId}
                  className="cursor-pointer hover:bg-blue-100"
                >
                  <td
                    className="p-4 text-gray-800 text-lg font-semibold"
                    onClick={() => handleNavigate(data.flowId)}
                  >
                    {data.projectName}
                  </td>
                  <td
                    className="p-4 text-gray-800 text-lg font-semibold"
                    onClick={() => handleNavigate(data.flowId)}
                  >
                    {data.projectType}
                  </td>
                  <td className="p-4 text-gray-800 text-lg font-semibold">
                    {data.timeAgo}
                  </td>
                  <td className="p-4">
                    <button
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => handleDelete(data.flowId)}
                    >
                      <i
                        className="material-icons"
                        style={{ fontSize: "24px" }}
                      >
                        delete
                      </i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Home;
