import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            document.documentElement.classList.toggle("dark", newMode);
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    return (
        <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="hidden" onChange={toggleTheme} />
            <div className="relative flex items-center justify-center w-10 h-10">
                <div
                    className={`icon transition-all duration-300 absolute ${isDarkMode ? "opacity-0" : "opacity-100"}`}
                >
                    <FiMoon size={30} className="text-gray-800 dark:text-blue-300" />
                </div>
                <div
                    className={`icon transition-all duration-300 absolute ${isDarkMode ? "opacity-100" : "opacity-0"}`}
                >
                    <FiSun size={30} className="text-yellow-400 dark:text-orange-300" />
                </div>
            </div>
        </label>
    );
}

export default ThemeToggle;

// Tailwind CSS dark mode styles (in globals.css or tailwind.config.js)
// Add these styles in your global CSS file
/*
  :root {
    --background-light: #ffffff;
    --background-dark: #121826;
    --text-light: #1a1a1a;
    --text-dark: #e0e7ff;
    --accent-dark: #2563eb;
  }
  
  .dark {
    background-color: var(--background-dark);
    color: var(--text-dark);
  }
  
  body {
    background-color: var(--background-light);
    color: var(--text-light);
  }

  .dark a, .dark h1, .dark h2, .dark h3 {
    color: var(--accent-dark);
  }
*/
