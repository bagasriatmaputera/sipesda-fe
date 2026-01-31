import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import type { Guru, jenisPelanggaran } from "@/types/type";
import clsx from "clsx";
import { toast } from "sonner";


export const useJenisPelanggaran = () => {
    const [jenisPelanggaran, setJenisPelanggran] = useState<jenisPelanggaran[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchJenisPelanggaran = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/pelanggaran/jenis-pelanggaran");
            setJenisPelanggran(res.data.data || res.data);
        } catch (err) {
            console.error("Gagal mengambil data guru:", err);
        } finally {
            setLoading(false);
        }
    };

    const storeJenisPelanggaran = async (param: any) => {
        try {
            await axiosInstance.post("/pelanggaran/jenis-pelanggaran/create", param, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            fetchJenisPelanggaran(); 
        } catch (err) {
            console.error("Gagal menyimpan data guru:", err);
            throw err;
        }
    };

    const updateJenisPelanggaran = async (id: number, formData: FormData) => {
        try {
            await axiosInstance.post(`/pelanggaran/jenis-pelanggaran/${id}?_method=PUT`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            fetchJenisPelanggaran();
        } catch (err) {
            console.error("Gagal update data guru:", err);
            throw err;
        }
    };

    const deleteJenisPelanggaran = async (id: number) => {
        try {
            await axiosInstance.delete(`/pelanggaran/jenis-pelanggaran/${id}`);
            toast.success("Berhasil menghapus!")
            fetchJenisPelanggaran();
        } catch (err) {
            console.error("Gagal menghapus data guru:", err);
            throw err;
        }
    };

    // Jalankan fetch saat pertama kali load
    useEffect(() => {
        fetchJenisPelanggaran();
    }, []);

    return { 
        jenisPelanggaran, 
        loading, 
        storeJenisPelanggaran, 
        updateJenisPelanggaran, 
        deleteJenisPelanggaran, 
        refresh: fetchJenisPelanggaran 
    };
};