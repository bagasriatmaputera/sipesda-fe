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
      await axiosInstance.patch(`/siswa/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

  const exportPdf = async (id: string | number) => {
    try {
      const response = await axiosInstance.get(`/siswa/export-pdf/${id}`, {
        responseType: 'blob', // Penting agar data dibaca sebagai file
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Laporan_Siswa_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      toast.error("Gagal mengekspor PDF");
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  return {
    siswa,
    loading,
    exportPdf,
    showSiswa,
    storeSiswa,
    updateSiswa,
    deleteSiswa,
    refresh: fetchSiswa,
  };
};
