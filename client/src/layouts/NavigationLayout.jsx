import { useState, useRef, useEffect } from "react";
import ThemeToggle from "../components/Misc/ThemeToggle";
import EditProfile from "../components/Profile/EditProfile.jsx";
import ChangeAvatar from "../components/Profile/ChangeAvatar.jsx";
import UpdateProfile from "../components/Profile/UpdateProfile.jsx";
import ConfirmLogout from "../components/Auth/ConfirmLogout.jsx";
import DeleteAccount from "../components/Auth/DeleteAccount.jsx";
import NewCollab from "../components/Collabs/NewCollab.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../components/Profile/Profile.jsx";
import UpdateUsername from "../components/Profile/UpdateUsername.jsx";
import Footer from "./Footer.jsx";
import Logo from "./Logo.jsx";
import ChangePassword from "../components/Auth/ChangePassword.jsx";
import { startPlayGroundThunk } from "../Redux/Slices/collabSlice.js";

function NavigationLayout({ children }) {
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn) || false;
    const userData = useSelector((state) => state?.auth?.userData);
    const [scrolled, setScrolled] = useState(false);
    const dispatch = useDispatch();
    const recentCollab = useSelector((state) => state?.collab?.recentCollab);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigate = useNavigate();


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCollabDropdownOpen, setIsCollabDropdownOpen] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false); 
    const [showEditAvatar, setShowEditAvatar] = useState(false); 
    const [showBioModal, setShowBioModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [showNewCollabModal, setShowNewCollabModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showUserNameModal, setShowUserNameModel] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const dropdownRef = useRef(null);
    const collabDropdownRef = useRef(null);

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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const startPlayGround = async(collab) => {
        const res = await dispatch(startPlayGroundThunk({ roomId : recentCollab?.roomId }));
        console.log("Res : ", res);
        if(res?.payload?.statusCode === 200){
            console.log("Successfully started the playground");
            setTimeout(() => {
                window.location.href = `http://localhost:${res?.payload?.data?.frontendPort}/room/${res?.payload?.data?.roomId}`;
                console.log("Redirecting");
            }, 500);
        }
    }

    return (
        <div className="w-full relative dark:text-white">
            {showEditProfile && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"></div>
            )}

            <nav className="fixed w-full z-50 bg-white dark:bg-black/60 dark:backdrop-blur-md shadow-sm transition-all duration-75">
                <div className="p-4 flex items-center justify-between gap-10">
                <Link
                    to="/"
                    className={`text-2xl font-bold tracking-tight transform transition-transform duration-1000 ease-in-out scale-${scrolled ? '105' : '100'}`}
                >
                    <Logo scrolled={scrolled}/>
                </Link>



                    <ul className="flex gap-4 ml-auto justify-center items-center">
                        <li className="relative cursor-pointer dark:text-white" onClick={() => navigate("/")}>
                            Home
                        </li>
                        {isLoggedIn && (
                            <li className="relative" ref={collabDropdownRef}>
                                <span
                                    onClick={() => setIsCollabDropdownOpen(!isCollabDropdownOpen)}
                                    className="font-mono cursor-pointer dark:text-white"
                                >
                                    Collabs
                                </span>
                                {isCollabDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-20 border dark:border-gray-700 dark:text-white">
                                        <DropdownItem label="Create New Collab" onClick={() => setShowNewCollabModal(true)} />
                                        {
                                            recentCollab && (
                                                <DropdownItem label="Recent Collab" onClick={startPlayGround} />
                                            )
                                        }
                                        <DropdownItem label="All Collabs" onClick={() => navigate('/collabs/all-collabs')} />
                                    </div>
                                )}
                            </li>
                        )}
                        {!isLoggedIn && (
                            <>
                                <Link to={"/auth/login"}>Log In</Link>
                                <Link to={"/auth/sign-up"}>Register</Link>
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
                                    src={userData?.avatar?.secure_url || "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"}
                                    alt="User Avatar"
                                />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-20 border dark:border-gray-700 dark:text-white">
                                        <DropdownItem label="Change Avatar" onClick={() => setShowEditAvatar(true)} />
                                        <DropdownItem label="My Profile" onClick={() => { setShowProfileModal(true); setIsDropdownOpen(false); }} />
                                        <DropdownItem label="Settings" onClick={() => setIsSettingsOpen(!isSettingsOpen)} hasSubmenu={true} />
                                        <DropdownItem label="Logout" onClick={() => setShowLogoutModal(true)} />
                                    </div>
                                )}
                                {isSettingsOpen && isDropdownOpen && (
                                    <div className="absolute right-48 top-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-30 border dark:border-gray-700">
                                        <DropdownItem label="Change Password" onClick={() => setShowPasswordModal(true)} />
                                        <DropdownItem label="Update Profile" onClick={() => setShowBioModal(true)} />
                                        <DropdownItem label="Update Username" onClick={() => setShowUserNameModel(true)} />
                                        <DropdownItem label="Account Visibility" onClick={() => setShowDeleteAccountModal(true)} />
                                    </div>
                                )}
                            </li>
                        )}
                    </ul>
                </div>
            </nav>

            <main className="w-full h-full">{children}</main>
            <Footer />

            {showEditProfile && <EditProfile showEditProfile={showEditProfile} setShowEditProfile={setShowEditProfile} />}
            {showEditAvatar && <ChangeAvatar showEditAvatar={setShowEditAvatar} setShowEditAvatar={setShowEditAvatar} />}
            {showProfileModal && <Profile onClose={() => setShowProfileModal(false)} />}
            {showBioModal && <UpdateProfile showBioModal={showBioModal} setShowBioModal={setShowBioModal} />}
            {showLogoutModal && <ConfirmLogout showLogoutModal={showLogoutModal} setShowLogoutModal={setShowLogoutModal} />}
            {showDeleteAccountModal && <DeleteAccount showDeleteAccountModal={showDeleteAccountModal} setShowDeleteAccountModal={setShowDeleteAccountModal} />}
            {showNewCollabModal && <NewCollab showNewCollabModal={showNewCollabModal} setShowNewCollabModel={setShowNewCollabModal} />}
            {showUserNameModal && <UpdateUsername setshowUserNameModal={setShowUserNameModel} showUserNameModal={showUserNameModal} />}
            {showPasswordModal && <ChangePassword showPasswordModal={showPasswordModal} setShowPasswordModal={setShowPasswordModal} />}
        </div>
    );
}

const DropdownItem = ({ label, onClick, hasSubmenu }) => {
    return (
        <div
            onClick={onClick}
            className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center 
                ${label === "Account Visibility" && "text-red-600 font-bold"} 
                ${label === "Logout" && " text-red-600 font-bold"}`}
        >
            {label}
            {hasSubmenu && <span className="ml-2 text-gray-400 dark:text-gray-300"></span>}
        </div>
    );
};

export default NavigationLayout;
