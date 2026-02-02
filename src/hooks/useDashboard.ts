import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export const useDashboard = () => {
  const [totalPelanggaran, setTotalPelanggaran] = useState();
  const [siswaTerlanggar, setSiswaTerlanggar] = useState();
  const [totalSiswa, setTotalSiswa] = useState();
  const [pelanggaranPerWeek, setPelanggaranPerWeek] = useState();
  const [siswa, setSiswa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chart, setChart] = useState([])


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
      setSiswaTerlanggar(res.data.data.siswa_terlanggar || res.data);
      setTotalSiswa(res.data.data.total_siswa)
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

    const getChart = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get('/chart-by-month')
      setChart(res.data.data)
      setLoading(false)
    } catch (err) {
      toast.error('Gagal ambil data chart')
      console.error(err)
    }
  }

  useEffect(() => {
    getTotalPelanggaran();
    totalSiswaTerlanggar();
    perWeek();
    siswaBigPoin();
    getChart();
  }, []);

  return {
    totalPelanggaran,
    siswaTerlanggar,
    totalSiswa,
    pelanggaranPerWeek,
    chart,
    siswa,
    loading,
    refresh:  getTotalPelanggaran,totalSiswaTerlanggar,perWeek,siswaBigPoin,
  };
};
