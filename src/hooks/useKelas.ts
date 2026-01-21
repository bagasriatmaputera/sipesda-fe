import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import type { Kelas } from "@/types/type";
import clsx from "clsx";
import { toast } from "sonner";


export const useKelas = () => {
    const [kelas, setKelas] = useState<Kelas[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchKelas = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/kelas");
            setKelas(res.data.data || res.data);
            console.log(res.data.data)
        } catch (err) {
            console.error("Gagal mengambil data kelas", err);
        } finally {
            setLoading(false);
        }
    };
    
    const storeKelas = async (param: any) => {
        try {
            await axiosInstance.post("/kelas", param, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success('Berhasil buat kelas!')
            fetchKelas(); 
        } catch (err) {
            toast.error('Gagal menambah data kelas')
            console.error("Gagal menyimpan data kelas:", err);
            throw err;
        }
    };

    const updateKelas= async (id: number, formData: FormData) => {
        try {
            await axiosInstance.post(`/kelas/${id}?_method=PUT`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success('Berhasi ubah kelas!')
            fetchKelas();
        } catch (err) {
            toast.error('Gagal update guru')
            console.error("Gagal update data kelas:", err);
            throw err;
        }
    };

    const deleteKelas = async (id: number) => {
        try {
            await axiosInstance.delete(`/kelas/${id}`);
            toast.success("Berhasil menghapus!")
            fetchKelas();
        } catch (err) {
            toast.error('Gagal menghapus data')
            console.error("Gagal menghapus data kelas:", err);
            throw err;
        }
    };

    // Jalankan fetch saat pertama kali load
    useEffect(() => {
        fetchKelas();
    }, []);

    return { 
        kelas, 
        loading, 
        storeKelas, 
        updateKelas, 
        deleteKelas, 
        refresh: fetchKelas 
    };
};