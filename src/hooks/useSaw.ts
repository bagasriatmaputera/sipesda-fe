import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import type { BobotRule, RankingSiswaSaw } from "@/types/type";
import { toast } from "sonner";

export const useSAW = () => {
  const [bobotRule, setBobotRule] = useState<BobotRule[]>([]);
  const [tahap, setTahap] = useState<any[]>([]);
  const [kriteria, setKriteria] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [siswa, setSiswa] = useState<RankingSiswaSaw[]>([]);

  const fetchBobotRule = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/bobot/");
      setBobotRule(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal mengambil data bobot:", err);
    } finally {
      setLoading(false);
    }
  };

  const storeBobotRule = async (param: any) => {
    try {
      await axiosInstance.post("/bobot/", param, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchBobotRule();
    } catch (err) {
      toast.error("Gagal menyimpan data bobot");
      console.error("Gagal menyimpan data bobot:", err);
      throw err;
    }
  };

  const updateBobotRule = async (id: number, formData: FormData) => {
    try {
      await axiosInstance.post(`/bobot/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchBobotRule();
      toast.success("berhasil update bobot");
    } catch (err) {
      toast.error("Gagal update data bobot");
      console.error("Gagal update data bobot:", err);
      throw err;
    }
  };

  const deleteBobotRule = async (id: number) => {
    try {
      await axiosInstance.delete(`/pelanggaran/jenis-pelanggaran/${id}`);
      toast.success("Berhasil menghapus!");
      fetchBobotRule();
    } catch (err) {
      console.error("Gagal menghapus data guru:", err);
      throw err;
    }
  };

  const fetchTahap = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/saw/tahap");
      setTahap(res.data.data);
    } catch (error) {
      toast.error("Gagal mengambil data tahap");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const storeTahap = async (formData: FormData) => {
    try {
      setLoading(true);
      await axiosInstance.post("/saw/tahap", formData);
      toast.success("Berhasil menambah tahap");
    } catch (err) {
      toast.error("Gagal menambah tahap");
      console.error("Gagal menambah tahap", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTahap = async (id: number, formData: FormData) => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/saw/tahap/${id}`, formData);
      toast.success("Berhasil merubah data");
    } catch (err) {
      toast.error("Gagal merubah data");
      console.error("Gagal merubah data ", err);
    } finally {
      setLoading(false);
    }
  };

  const showTahap = async (id: number) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/saw/tahap/${id}`);
      setKriteria(res.data.data || res.data);
    } catch (err) {
      toast.error("Gagal mengambil data");
      console.error("Gagal mengambil data, ", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTahap = async (id: number) => {
    try {
      setLoading(false);
      await axiosInstance.delete(`/saw/tahap/${id}`);
      toast.success("Berhasil hapus data tahap");
      fetchKriteria;
    } catch (err) {
      toast.error("Gagal mengahpus data tahap");
      console.error("Gagal mengapus data tahap,", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchKriteria = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/saw/kriteria");
      setKriteria(res.data.data);
    } catch (error) {
      toast.error("Gagal mengambil data tahap");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const storeKriteria = async (formData: FormData) => {
    try {
      setLoading(true);
      await axiosInstance.post("/saw/kriteria", formData);
      toast.success("Berhasil menambah kriteria");
    } catch (err) {
      toast.error("Gagal menambah kriteria");
      console.error("Gagal menambah kriteria", err);
    } finally {
      setLoading(false);
    }
  };

  const updateKriteria = async (id: number, formData: FormData) => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/saw/kriteria/${id}`, formData);
      toast.success("Berhasil merubah data");
    } catch (err) {
      toast.error("Gagal merubah data");
      console.error("Gagal merubah data ", err);
    } finally {
      setLoading(false);
    }
  };

  const showKriteria = async (id: number) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/saw/kriteria/${id}`);
      setKriteria(res.data.data || res.data);
    } catch (err) {
      toast.error("Gagal mengambil data");
      console.error("Gagal mengambil data, ", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteKriteria = async (id: number) => {
    try {
      setLoading(false);
      await axiosInstance.delete(`/saw/kriteria/${id}`);
      toast.success("Berhasil hapus data kriteria");
      fetchKriteria;
    } catch (err) {
      toast.error("Gagal mengahpus data kriteria");
      console.error("Gagal mengapus data kriteria,", err);
    } finally {
      setLoading(false);
    }
  };

  const getRanking = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get('/saw/hasil/ranking');
      setSiswa(res.data.data || res.data)
      setLoading(false)
    } catch (err) {
      toast.error("Error, coba lagi nanti")
      console.error(err)
    }
  }

  useEffect(() => {
    fetchBobotRule();
    fetchTahap();
    fetchKriteria();
    getRanking()
  }, []);

  return {
    bobotRule,
    loading,
    tahap,
    kriteria,
    siswa,
    showKriteria,
    getRanking,
    updateKriteria,
    deleteKriteria,
    storeKriteria,
    showTahap,
    updateTahap,
    deleteTahap,
    storeTahap,
    storeBobotRule,
    updateBobotRule,
    deleteBobotRule,
    refresh: [fetchBobotRule, fetchTahap, fetchKriteria, getRanking],
  };
};
