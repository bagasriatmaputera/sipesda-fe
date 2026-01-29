import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

export const useDashboard = () => {
  const [totalPelanggaran, setTotalPelanggaran] = useState();
  const [siswaTerlanggar, setSiswaTerlanggar] = useState();
  const [pelanggaranPerWeek, setPelanggaranPerWeek] = useState();
  const [siswa, setSiswa] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTotalPelanggaran = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/total-pelanggaran");
      setTotalPelanggaran(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal mengambil data", err);
    } finally {
      setLoading(false);
    }
  };

  const totalSiswaTerlanggar = async () => {
    try {
      const res = await axiosInstance.get("/total-siswa-terlanggar");
      setSiswaTerlanggar(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal mengambil data", err);
      throw err;
    }
  };

  const perWeek = async () => {
    try {
      const res = await axiosInstance.get(`/pelanggaran-per-week`);
      setPelanggaranPerWeek(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal ambil data", err);
      throw err;
    }
  };

  const siswaBigPoin = async () => {
    try {
      const res = await axiosInstance.get(`/siswa-big-poin`);
      setSiswa(res.data.data || res.data)
    } catch (err) {
      console.error("Gagal menghapus data siswa:", err);
      throw err;
    }
  };

  useEffect(() => {
    getTotalPelanggaran();
    totalSiswaTerlanggar();
    perWeek();
    siswaBigPoin();
  }, []);

  return {
    totalPelanggaran,
    siswaTerlanggar,
    pelanggaranPerWeek,
    siswa,
    loading,
    refresh:  getTotalPelanggaran,totalSiswaTerlanggar,perWeek,siswaBigPoin,
  };
};
