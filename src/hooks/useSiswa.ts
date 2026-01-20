import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import type { Siswa } from "@/types/type";

export const useSiswa = () => {
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(false);

  // READ: Ambil semua data siswa
  const fetchSiswa = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/siswa");
      setSiswa(res.data.data);
    } catch (err) {
      console.error("Gagal ambil data siswa", err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE: Tambah siswa
  const storeSiswa = async (data: any) => {
    try {
      await axiosInstance.post("/siswa", data);
      fetchSiswa(); // Refresh data
    } catch (err) {
      throw err;
    }
  };

  // UPDATE: Edit siswa
  const updateSiswa = async (id: number, data: any) => {
    try {
      await axiosInstance.put(`/siswa/${id}`, data);
      fetchSiswa();
    } catch (err) {
      throw err;
    }
  };

  // DELETE: Hapus siswa
  const deleteSiswa = async (id: number) => {
    try {
      await axiosInstance.delete(`/siswa/${id}`);
      fetchSiswa();
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  return {
    siswa,
    loading,
    storeSiswa,
    updateSiswa,
    deleteSiswa,
    refresh: fetchSiswa,
  };
};
