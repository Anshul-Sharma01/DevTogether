import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function RequireAuth({ allowedRoles }){
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    
    if(!isLoggedIn){
        window.alert("You have to log in first");
        return <Navigate to="/auth/login" />
    }
    
    return <Outlet />
}

export default RequireAuth;

