import { useState, useRef, useEffect } from "react";
import ThemeToggle from "../components/Misc/ThemeToggle";
import EditProfile from "../components/Profile/EditProfile.jsx";
import ChangeAvatar from "../components/Profile/ChangeAvatar.jsx";
import UpdateBio from "../components/Profile/UpdateBio.jsx";
import ConfirmLogout from "../components/Auth/ConfirmLogout.jsx";
import DeleteAccount from "../components/Auth/DeleteAccount.jsx";
import NewCollab from "../components/Collabs/NewCollab.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../components/Profile/Profile.jsx";

function NavigationLayout({ children }) {
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn) || false;
    const userData = useSelector((state) => state?.auth?.userData);

    const navigate = useNavigate();

    // State for dropdowns
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
    const [ isSettingsOpen, setIsSettingsOpen ] = useState(false);
    const [ isCollabDropdownOpen, setIsCollabDropdownOpen ] = useState(false);
    const [ showEditProfile, setShowEditProfile ] = useState(false); // State for Edit Profile modal
    const [ showEditAvatar, setShowEditAvatar ] = useState(false); // State for Edit Avatar modal
    const [ showBioModal, setShowBioModal ] = useState(false);
    const [ showLogoutModal, setShowLogoutModal ] = useState(false);
    const [ showDeleteAccountModal, setShowDeleteAccountModal ] = useState(false);
    const [ showNewCollabModal, setShowNewCollabModal ] = useState(false);
    const [ showProfileModal, setShowProfileModal ] = useState(false);

    // Refs for handling outside clicks
    const dropdownRef = useRef(null);
    const collabDropdownRef = useRef(null);

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
        <div className="w-full relative">
            {/* Blurred Background when Modal is Open */}
            {showEditProfile && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"></div>
            )}

            <nav className="flex flex-row justify-between pr-6 items-center dark:bg-gray-700 dark:text-white py-4 sticky top-0 z-50 bg-gray-200">
                <Link to={"/"} className="w-40 h-10 flex flex-row justify-center items-center text-white">
                    <img
                        src="https://i0.wp.com/onegroupnetwork.com/wp-content/uploads/2020/09/dummy-logo-5b.png?ssl=1"
                        alt="Logo"
                    />
                </Link>
                <div className="font-bold tracking-widest text-xl">
                    <span className="dark:text-cyan-300 text-red-400 font-extrabold text-2xl">Dev</span>
                    Together
                </div>
                <ul className="flex flex-row justify-center items-center gap-4">
                    <li className="relative cursor-pointer" onClick={() => navigate("/")}>
                        Home
                    </li>
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
                                    <DropdownItem label="Create New Collab" onClick={() => setShowNewCollabModal(true)} />
                                    <DropdownItem label="Recent Collab" />
                                    <DropdownItem label="All Collabs"  onClick={()=>navigate('/collabs/all-collabs')} />
                                </div>
                            )}
                        </li>
                    )}
                    {!isLoggedIn && (
                        <>
                            <Link to={"/auth/login"}>Log In</Link>
                            <Link to={"/auth/sign-up"}>Sign Up</Link>
                        </>
                    )}
                    <li>
                        <ThemeToggle />
                    </li>

                    {isLoggedIn && (
                        <li className="relative" ref={dropdownRef}>
                            <img
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="h-10 w-10 rounded-full border-gray-200 border-2 object-center hover:cursor-pointer"
                                src={userData?.avatar?.secure_url ||"https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"}
                                alt="User Avatar"
                            />

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-20 border dark:border-gray-700">
                                    <DropdownItem label="Change Avatar" onClick={() => setShowEditAvatar(true)} />
                                    {/* <DropdownItem label="Edit Profile" onClick={() => setShowEditProfile(true)} /> */}
                                    <DropdownItem 
                                        label="My Profile" 
                                        onClick={() => {
                                            setShowProfileModal(true)
                                            setIsDropdownOpen(false)
                                        }} 
                                    />
                                    <DropdownItem
                                        label="Settings"
                                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                        hasSubmenu={true}
                                    />
                                    <DropdownItem label="My Friends" onClick={() => navigate("/user/friends")} />
                                    <DropdownItem label="Logout" onClick={() => setShowLogoutModal(true)} />
                                </div>
                            )}

                            {/* Nested Settings Submenu */}
                            {isSettingsOpen && isDropdownOpen && (
                                <div className="absolute right-48 top-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-30 border dark:border-gray-700">
                                    <DropdownItem label="Change Password" />
                                    <DropdownItem label="Update Bio"  onClick={() => setShowBioModal(true)}/>
                                    <DropdownItem label="Delete Account" onClick={() => setShowDeleteAccountModal(true)} />
                                </div>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
            <main className="w-full h-full">{children}</main>

            {/* Edit Profile Modal */}
            {
                showEditProfile && (
                    <EditProfile showEditProfile={showEditProfile} setShowEditProfile={setShowEditProfile} />
                )
            }
            {/* Edit Avatar Modal */}
            {
                showEditAvatar && (
                    <ChangeAvatar showEditAvatar={setShowEditAvatar} setShowEditAvatar={setShowEditAvatar}/>
                )
            }
            {
                showProfileModal && (
                    <Profile onClose={() => setShowProfileModal(false)} />
                )
            }
            {
                showBioModal && (
                    <UpdateBio showBioModal={showBioModal} setShowBioModal={setShowBioModal}/>
                )
            }
            {
                showLogoutModal && (
                    <ConfirmLogout showLogoutModal={showLogoutModal} setShowLogoutModal={setShowLogoutModal} />
                )
            }
            {
                showDeleteAccountModal && (
                    <DeleteAccount showDeleteAccountModal={showDeleteAccountModal} setShowDeleteAccountModal={setShowDeleteAccountModal} />
                )
            }
            {
                showNewCollabModal && (
                    <NewCollab showNewCollabModal={showNewCollabModal} setShowNewCollabModel={setShowNewCollabModal}/>
                )
            }
        </div>
    );
}

// Reusable Dropdown Item Component
const DropdownItem = ({ label, onClick, hasSubmenu }) => {
    return (
        <div
            onClick={onClick}
            className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center 
                ${label === "Delete Account" && "text-red-600"} 
                ${label === "Logout" && "text-red-600"}`}
        >
            {label}
            {hasSubmenu && <span className="ml-2 text-gray-400 dark:text-gray-300"></span>}
        </div>
    );
};

export default NavigationLayout;
