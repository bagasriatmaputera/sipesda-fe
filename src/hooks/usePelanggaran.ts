import axiosInstance from "@/lib/axios";
import type { Pelanggaran } from "@/types/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const usePelanggaran = () => {
  const [pelanggaran, setPelanggaran] = useState<Pelanggaran[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState<string>()


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
    loading,
    fetchPelanggaran,
    refresh: fetchPelanggaran,
    deletePelanggaran,
  };
};
