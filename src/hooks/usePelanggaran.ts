import axiosInstance from "@/lib/axios"
import type { Pelanggaran } from "@/types/type"
import { useEffect, useState } from "react"

export const usePelanggaran = () => {
    const [pelanggaran, setPelanggaran] = useState<Pelanggaran[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchPelanggaran = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/pelanggaran");
            setPelanggaran(res.data.data);
        } catch (err) {
            console.error("Gagal ambil data pelanggaran siswa", err);
        } finally {
            setLoading(false);
        }
    };

    const deletePelanggaran = async (id: number) => {
        try {
            await axiosInstance.delete(`/pelanggaran/delete/${id}`);
            fetchPelanggaran();
        } catch (err) {
            throw err
        }

    }


    useEffect(() => {
        fetchPelanggaran();
    }, [])

    return { pelanggaran, loading,refresh: fetchPelanggaran, deletePelanggaran }
}