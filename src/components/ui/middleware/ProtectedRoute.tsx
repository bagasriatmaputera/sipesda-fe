import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton } from "../skeleton";

const ProtectedRouted = () => {
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Simulate auth check
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Skeleton className="w-full h-full" />
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;

}

export default ProtectedRouted;