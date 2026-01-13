import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/sipesda/public/api", // Sesuaikan dengan URL Laravel Anda
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// Tambahkan interceptor untuk menyematkan token jika sudah login
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;