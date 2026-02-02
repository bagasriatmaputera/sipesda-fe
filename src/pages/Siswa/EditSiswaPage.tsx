import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/layout";
import { useSiswa } from "@/hooks/useSiswa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select"; // Asumsi komponen select Anda
import { Loader2, ArrowLeft, Save, Upload, User } from "lucide-react";
import { toast } from "sonner";
import { useKelas } from "@/hooks/useKelas";

export default function EditSiswaPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSiswa, updateSiswa, loading } = useSiswa();
    const { kelas } = useKelas();

    const [formData, setFormData] = useState({
        nama: "",
        kelas_id: "",
        nama_wali: "",
        no_hp_wali: "",
    });
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        const loadSiswa = async () => {
            if (id) {
                const data = await showSiswa(id);
                if (data) {
                    setFormData({
                        nama: data.nama || "",
                        kelas_id: data.kelas_id || "",
                        nama_wali: data.nama_wali || "",
                        no_hp_wali: data.no_hp_wali || "",
                    });
                    if (data.photo) setPreview(data.photo);
                }
            }
        };
        loadSiswa();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("_method", "PATCH");
        if (formData.nama) data.append("nama", formData.nama);
        if (formData.kelas_id) data.append("kelas_id", formData.kelas_id);
        if (formData.nama_wali) data.append("nama_wali", formData.nama_wali);
        if (formData.no_hp_wali) data.append("no_hp_wali", formData.no_hp_wali);
        if (photo) data.append("photo", photo);

        try {
            await updateSiswa(Number(id), data);
            toast.success("Data siswa berhasil diperbarui");
            navigate("/siswa");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Gagal memperbarui data");
        }
    };

    if (loading && !formData.nama) {
        return (
            <Layout>
                <div className="flex h-screen w-full items-center justify-center">
                    <Loader2 className="animate-spin size-8 text-zinc-500" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="p-0 hover:bg-transparent">
                        <ArrowLeft className="size-5" />
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Data Siswa</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-1 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium">Foto Siswa</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                <div className="size-40 rounded-full border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden bg-zinc-50">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="size-full object-cover" />
                                    ) : (
                                        <User className="size-12 text-zinc-300" />
                                    )}
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="photo" className="cursor-pointer inline-flex items-center justify-center w-full px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-md text-sm font-medium transition-colors gap-2">
                                        <Upload className="size-4" /> Pilih Foto
                                    </Label>
                                    <Input id="photo" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                    <p className="text-[10px] text-zinc-500 mt-2 text-center">Format: JPG, JPEG, PNG. Maks 2MB</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Kolom Kanan: Form Data */}
                        <Card className="md:col-span-2 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium">Informasi Akademik & Wali</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="nama">Nama Lengkap</Label>
                                    <Input id="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama siswa" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="kelas_id">Kelas</Label>
                                    <NativeSelect id="kelas_id" value={formData.kelas_id} onChange={handleChange}>
                                        {/* <option value="">Saat ini: {formData.kelas_id}</option> */}
                                        {kelas.map((k) => (
                                            <option key={k.id} value={k.id}>{k.nama_kelas}</option>
                                        ))}
                                        {/* Map data kelas Anda di sini */}
                                    </NativeSelect>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="nama_wali">Nama Wali Murid</Label>
                                    <Input id="nama_wali" value={formData.nama_wali} onChange={handleChange} placeholder="Nama wali" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="no_hp_wali">No. HP Wali (WhatsApp)</Label>
                                    <Input id="no_hp_wali" value={formData.no_hp_wali} onChange={handleChange} placeholder="Contoh: 08123456789" />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>Batal</Button>
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white gap-2" disabled={loading}>
                                        {loading ? <Loader2 className="animate-spin size-4" /> : <Save className="size-4" />}
                                        Simpan Perubahan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </Layout>
    );
}