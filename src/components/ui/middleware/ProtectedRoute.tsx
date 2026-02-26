import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouted = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;

}

export default ProtectedRouted;