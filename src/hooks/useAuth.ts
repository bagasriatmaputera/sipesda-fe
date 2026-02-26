import axiosInstance from "@/lib/axios";
import type { RequestLogin, User } from "@/types/type";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();
    // const [token, setToken] = useState<any>();

    const navigate = useNavigate();
    const login = async (data: RequestLogin) => {
        try {
            setLoading(true)
            const res = await axiosInstance.post('/login', data);

            const token = res.data.token;

            const user = res.data.data;

            setUser(user);

            if (token) {
                localStorage.setItem('token', token);

                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                navigate('/');
            }

            if(user){
                localStorage.setItem('name', res.data.data.data.name)
                localStorage.setItem('email', res.data.data.data.email)
            }
            setLoading(false)
        } catch (error) {
            console.error("Login Error:", error);
            // toast.error("NIP atau Password salah, silakan coba lagi.");
            setLoading(false)
        }
    };

    const logout = async () => {
        try {
            setLoading(true)
            await axiosInstance.get('/logout');
            setLoading(false)
        } catch (error) {
            console.error("Logout server error:", error);
        } finally {
            localStorage.removeItem('token');

            delete axiosInstance.defaults.headers.common['Authorization'];

            navigate('/login');
        }
    };

    const register = async (data: any) => {
        try {
            const res = await axiosInstance.post('/register', data);

            const token = res.data.token;

            if (token) {
                localStorage.setItem('token', token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                alert("Registrasi Berhasil!");
                navigate('/');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || "Registrasi gagal";
            alert(message);
        }
    };

    useEffect(() => {
    }, [])

    return {
        login,
        register,
        logout,
        loading,
        user
    }
}