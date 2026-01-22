import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // Sesuaikan dengan URL Laravel Anda
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;

// 4. EKSPOR FUNGSI TAMBAHAN (Opsional, gunakan Named Export)
export const apiSiswa = () => axiosInstance.get('/siswa');
export const apiGuru = () => axiosInstance.get('/guru');
export const apiJenisPelanggaran = () => axiosInstance.get('/pelanggaran/jenis-pelanggaran');