import React from "react";

const ThemeButton = () => {
  return (
    <>
      <button
        className="p-2 mb-4 bg-gray-800 text-white rounded-lg dark:bg-gray-200 dark:text-black"
        onClick={toggleDarkMode}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </>
  );
};

export default ThemeButton;
