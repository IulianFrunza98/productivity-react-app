import { useState, useEffect } from "react";
import { FaRegSun, FaRegMoon } from "react-icons/fa";

function FloatingDarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300 shadow-lg"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <FaRegSun size={20} /> : <FaRegMoon size={20} />}
    </button>
  );
}

export default FloatingDarkModeToggle;
