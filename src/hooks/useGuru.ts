import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import type { Guru } from "@/types/type";
import { toast } from "sonner";

export const useGuru = () => {
  const [guru, setGuru] = useState<Guru[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. READ: Ambil semua data guru
  const fetchGuru = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/guru");
      setGuru(res.data.data || res.data);
      console.log(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data guru:", err);
    } finally {
      setLoading(false);
    }
  };

  const storeGuru = async (formData: FormData) => {
    try {
      await axiosInstance.post("/guru", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchGuru();
    } catch (err) {
      console.error("Gagal menyimpan data guru:", err);
      throw err;
    }
  };

  // 3. UPDATE: Edit data guru
  const updateGuru = async (id: number, formData: FormData) => {
    try {
      await axiosInstance.patch(`/guru/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Gagal update data guru:", err);
      throw err;
    }
  };

  // 4. DELETE: Hapus guru
  const deleteGuru = async (id: number) => {
    try {
      await axiosInstance.delete(`/guru/${id}`);
      toast.success("Berhasil menghapus data guru.");
      fetchGuru();
    } catch (err) {
      toast.error("Gagal menghapus data guru," + err);
      console.error("Gagal menghapus data guru:", err);
      throw err;
    }
  };

  const showGuru = async (id: number | string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/guru/${id}`);
      return res.data.data
    } catch (err) {
      toast.error('Gagal ambil data guru' + err)
      console.error('Gagal ambil data guru', err)
    } finally {
      setLoading(false)
    }
  }

  // Jalankan fetch saat pertama kali load
  useEffect(() => {
    fetchGuru();
  }, []);

  return {
    guru,
    loading,
    showGuru,
    storeGuru,
    updateGuru,
    deleteGuru,
    refresh: fetchGuru,
  };
};
