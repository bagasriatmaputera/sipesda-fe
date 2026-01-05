import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import type { Guru } from "@/types/type";


export const useGuru = () => {
    const [guru, setGuru] = useState<Guru[]>([]);
    const [loading, setLoading] = useState(false);

    // 1. READ: Ambil semua data guru
    const fetchGuru = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/guru");
            // Sesuaikan dengan struktur JSON Laravel Anda (biasanya res.data atau res.data.data)
            setGuru(res.data.data || res.data);
        } catch (err) {
            console.error("Gagal mengambil data guru:", err);
        } finally {
            setLoading(false);
        }
    };

    // 2. CREATE: Tambah guru (Mendukung upload foto)
    const storeGuru = async (formData: FormData) => {
        try {
            await axiosInstance.post("/guru", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            fetchGuru(); // Refresh data setelah simpan
        } catch (err) {
            console.error("Gagal menyimpan data guru:", err);
            throw err;
        }
    };

    // 3. UPDATE: Edit data guru
    const updateGuru = async (id: number, formData: FormData) => {
        try {
            // Laravel terkadang butuh spoofing method _method=PUT untuk multipart/form-data
            await axiosInstance.post(`/guru/${id}?_method=PUT`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            fetchGuru();
        } catch (err) {
            console.error("Gagal update data guru:", err);
            throw err;
        }
    };

    // 4. DELETE: Hapus guru
    const deleteGuru = async (id: number) => {
        try {
            await axiosInstance.delete(`/guru/${id}`);
            fetchGuru();
        } catch (err) {
            console.error("Gagal menghapus data guru:", err);
            throw err;
        }
    };

    // Jalankan fetch saat pertama kali load
    useEffect(() => {
        fetchGuru();
    }, []);

    return { 
        guru, 
        loading, 
        storeGuru, 
        updateGuru, 
        deleteGuru, 
        refresh: fetchGuru 
    };
};