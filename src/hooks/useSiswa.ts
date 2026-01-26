import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import type { Siswa } from "@/types/type";
import { toast } from "sonner";

export const useSiswa = () => {
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(false);

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

  const storeSiswa = async (data: any) => {
    try {
      await axiosInstance.post("/siswa", data);
      fetchSiswa();
    } catch (err) {
      throw err;
    }
  };

  const updateSiswa = async (id: number, data: any) => {
    try {
      await axiosInstance.put(`/siswa/${id}`, data);
      fetchSiswa();
    } catch (err) {
      throw err;
    }
  };

  const deleteSiswa = async (id: number) => {
    try {
      await axiosInstance.delete(`/siswa/${id}`);
      fetchSiswa();
    } catch (err) {
      throw err;
    }
  };

  const showSiswa = async (id: string | number) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/siswa/${id}`);
      return res.data.data;
    } catch (err: any) {
      toast.error("Gagal ambil detail siswa");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  return {
    siswa,
    loading,
    showSiswa,
    storeSiswa,
    updateSiswa,
    deleteSiswa,
    refresh: fetchSiswa,
  };
};
