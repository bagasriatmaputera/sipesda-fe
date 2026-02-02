import axiosInstance from "@/lib/axios";
import type { Pelanggaran } from "@/types/type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const usePelanggaran = () => {
  const [pelanggaran, setPelanggaran] = useState<Pelanggaran[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState<string>()

  const navigate = useNavigate()

  const fetchPelanggaran = async (keyword?: string) => {
    setLoading(true);
    try {
      if (keyword) {
        setKeyword(keyword)
      }

      const res = await axiosInstance.get(`/pelanggaran`, {
        params: {
          keyword: keyword || null
        }
      });
      setPelanggaran(res.data.data);
    } catch (err) {
      console.error("Gagal ambil data pelanggaran siswa");
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  const storePelanggaran = async (any: any) => {
    try {
      await axiosInstance.post("/pelanggaran/create-pelanggaran", any);
      fetchPelanggaran();
    } catch (error) {
      toast.error("Gagal input pelanggaran, mohon coba lagi");
      console.error(error);
    }
  };

  const showPelanggaran = async (id: number | string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/pelanggaran/show/${id}`)
      setLoading(false)
      return res.data.data || res.data
    } catch (err) {
      toast.error('Gagal ambil data')
      console.error(err)
    }

  }

  const updatePelanggaran = async (id: number | string, data: any,) => {
    try {
      setLoading(true)
      await axiosInstance.patch(`pelanggaran/update/${id}`, data)
      setLoading(false);
      navigate('/pelanggaran')
    } catch (err) {
      toast.error('Gagal update data')
      console.error(err)
    }
  }

  const deletePelanggaran = async (id: number) => {
    try {
      await axiosInstance.delete(`/pelanggaran/delete/${id}`);
      fetchPelanggaran();
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPelanggaran(keyword);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  return {
    pelanggaran,
    storePelanggaran,
    updatePelanggaran,
    loading,
    showPelanggaran,
    fetchPelanggaran,
    refresh: fetchPelanggaran,
    deletePelanggaran,
  };
};
