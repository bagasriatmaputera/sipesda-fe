import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/layout";
import { useGuru } from "@/hooks/useGuru";
import { useKelas } from "@/hooks/useKelas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { Loader2, ArrowLeft, Save, Upload, User, Hash, Phone, School } from "lucide-react";
import { toast } from "sonner";

export default function EditGuruPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showGuru, updateGuru, loading } = useGuru();
    const { kelas } = useKelas();

    const [formData, setFormData] = useState({
        nip: "",
        nama_guru: "",
        kelas_id: "",
        no_hp: "",
        user_id: "",
    });
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        const loadGuru = async () => {
            if (id) {
                const data = await showGuru(id);
                if (data) {
                    setFormData({
                        nip: data.nip || "",
                        nama_guru: data.nama || "",
                        kelas_id: data.kelas?.id || "",
                        no_hp: data.no_hp || "",
                        user_id: data.user?.id || "",
                    });
                    if (data.photo) setPreview(data.photo);
                }
            }
        };
        loadGuru();
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
        data.append("nip", formData.nip);
        data.append("nama_guru", formData.nama_guru);
        if (formData.kelas_id) data.append("kelas_id", formData.kelas_id);
        if (formData.no_hp) data.append("no_hp", formData.no_hp);
        if (formData.user_id) data.append("user_id", formData.user_id);
        if (photo) data.append("photo", photo); // Maks 2048 KB

        try {
            await updateGuru(Number(id), data);
            toast.success("Data guru berhasil diperbarui");
            navigate("/guru");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Gagal memperbarui data guru");
        }
    };

    if (loading && !formData.nama_guru) {
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
            <div className="p-6 space-y-6 w-full max-w-5xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="p-0 hover:bg-transparent">
                        <ArrowLeft className="size-5" />
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Edit Profil Guru</h1>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sisi Kiri: Foto */}
                    <Card className="lg:col-span-1 h-fit shadow-sm border-zinc-200">
                        <CardHeader>
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Upload className="size-4 text-blue-600" /> Foto Guru
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-5">
                            <div className="size-48 rounded-2xl border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden bg-zinc-50/50">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="size-full object-cover" />
                                ) : (
                                    <User className="size-16 text-zinc-300" />
                                )}
                            </div>
                            <div className="w-full space-y-2">
                                <Label htmlFor="photo" className="cursor-pointer flex items-center justify-center w-full px-4 py-2.5 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-lg text-sm font-medium transition-all shadow-sm">
                                    Ubah Foto
                                </Label>
                                <Input id="photo" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg" />
                                <p className="text-[11px] text-zinc-400 text-center">Format: JPG, JPEG, PNG (Maks. 2MB)</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sisi Kanan: Form */}
                    <Card className="lg:col-span-2 shadow-sm border-zinc-200">
                        <CardHeader className="border-b bg-zinc-50/30">
                            <CardTitle className="text-sm font-semibold text-zinc-700">Informasi Kedinasan & Kontak</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nip" className="flex items-center gap-2">
                                        <Hash className="size-4 text-zinc-400" /> NIP (Wajib)
                                    </Label>
                                    <Input id="nip" value={formData.nip} onChange={handleChange} placeholder="Contoh: 1980..." required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nama_guru" className="flex items-center gap-2">
                                        <User className="size-4 text-zinc-400" /> Nama Lengkap (Wajib)
                                    </Label>
                                    <Input id="nama_guru" value={formData.nama_guru} onChange={handleChange} placeholder="Nama beserta gelar" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="kelas_id" className="flex items-center gap-2">
                                        <School className="size-4 text-zinc-400" /> Wali Kelas (Opsional)
                                    </Label>
                                    <NativeSelect id="kelas_id" value={formData.kelas_id} onChange={handleChange}>
                                        <option value="">Bukan Wali Kelas</option>
                                        {kelas?.map((k: any) => (
                                            <option key={k.id} value={k.id}>{k.nama_kelas}</option>
                                        ))}
                                    </NativeSelect>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="no_hp" className="flex items-center gap-2">
                                        <Phone className="size-4 text-zinc-400" /> No. HP WhatsApp
                                    </Label>
                                    <Input id="no_hp" value={formData.no_hp} onChange={handleChange} placeholder="Contoh: 08..." />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t">
                                <Button type="button" variant="ghost" onClick={() => navigate(-1)} className="text-zinc-500">
                                    Batal
                                </Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px] shadow-md shadow-blue-100" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin size-4 mr-2" /> : <Save className="size-4 mr-2" />}
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </Layout>
    );
}