import { useState, useRef, useEffect } from "react";
import ThemeToggle from "../components/Misc/ThemeToggle";

function NavigationLayout({ children }) {
    const isLoggedIn = true;

    // State to control dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCollabDropdownOpen, setIsCollabDropdownOpen] = useState(false); // New state for Collab dropdown

    // Ref to detect clicks outside the dropdown
    const dropdownRef = useRef(null);
    const collabDropdownRef = useRef(null); // Ref for Collab dropdown

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setIsSettingsOpen(false);
            }
            if (collabDropdownRef.current && !collabDropdownRef.current.contains(event.target)) {
                setIsCollabDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full">
            <nav className="flex flex-row justify-between pr-6 items-center dark:bg-gray-700 dark:text-white py-4 sticky top-0 z-10 bg-gray-200">
                <div className="w-40 h-10 flex flex-row justify-center items-center text-white">
                    <img
                        src="https://i0.wp.com/onegroupnetwork.com/wp-content/uploads/2020/09/dummy-logo-5b.png?ssl=1"
                        alt="Logo"
                    />
                </div>
                <div className="font-bold tracking-widest text-xl">
                    <span className="dark:text-cyan-300 text-red-400 font-extrabold text-2xl">Dev</span>
                    Together
                </div>
                <ul className="flex flex-row justify-center items-center gap-4">
                    {isLoggedIn && (
                        <li className="relative" ref={collabDropdownRef}>
                            <span
                                onClick={() => setIsCollabDropdownOpen(!isCollabDropdownOpen)}
                                className="font-mono cursor-pointer"
                            >
                                Collabs
                            </span>

                            {/* Collab Dropdown Menu */}
                            {isCollabDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-20 border dark:border-gray-700">
                                    <DropdownItem label="Create New Collab" />
                                    <DropdownItem label="Recent Collabs" />
                                    <DropdownItem label="All Collabs" />
                                </div>
                            )}
                        </li>
                    )}
                    {!isLoggedIn && (
                        <>
                            <li>Log In</li>
                            <li>Sign Up</li>
                        </>
                    )}
                    <li>
                        <ThemeToggle />
                    </li>

                    {isLoggedIn && (
                        <li className="relative" ref={dropdownRef}>
                            <img
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="h-10 w-10 rounded-full border-gray-200 border-2 hover:cursor-pointer"
                                src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
                                alt="User  Avatar"
                            />

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-20 border dark:border-gray-700">
                                    <DropdownItem label="Change Avatar" />
                                    <DropdownItem label="Edit Profile" />
                                    <DropdownItem
                                        label="Settings"
                                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                        hasSubmenu={true}
                                    />
                                    <DropdownItem label="My Friends" />
                                    <DropdownItem label="Logout" />
                                </div>
                            )}

                            {/* Nested Settings Submenu */}
                            {isSettingsOpen && isDropdownOpen && (
                                <div className="absolute right-48 top-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-30 border dark:border-gray-700">
                                    <DropdownItem label="Change Password" />
                                    <DropdownItem label="Update Email" />
                                    <DropdownItem label="Delete Account" />
                                </div>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
            <main className="w-full h-full">{children}</main>
        </div>
    );
}

// Reusable Dropdown Item Component
const DropdownItem = ({ label, onClick, hasSubmenu }) => {
    return (
        <div
            onClick={onClick}
            className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center ${label === "Delete Account" && "text-red-600"} ${label === "Logout" && "text-red-600"}`}
        >
            {label}
            {hasSubmenu && (
                <span className="ml-2 text-gray-400 dark:text-gray-300"></span> 
            )}
        </div>
    );
};

export default NavigationLayout;