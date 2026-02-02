import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/layout";
import { usePelanggaran } from "@/hooks/usePelanggaran";
import { useGuru } from "@/hooks/useGuru";
import { useJenisPelanggaran } from "@/hooks/useJenisPelanggaran";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { Loader2, ArrowLeft, Save, ShieldAlert, Calendar, UserCheck, FileText } from "lucide-react";
import { toast } from "sonner";

export default function EditPelanggaranPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const { showPelanggaran, updatePelanggaran, loading: loadingAction } = usePelanggaran();
    const { guru } = useGuru();
    const { jenisPelanggaran } = useJenisPelanggaran();

    const [formData, setFormData] = useState({
        guru_id: "",
        jenis_pelanggaran_id: "",
        keterangan: "",
        tanggal: "",
    });
    const [namaSiswa, setNamaSiswa] = useState("");
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (id) {
                const data = await showPelanggaran(id); 
                if (data) {
                    setFormData({
                        guru_id: data.guru_id?.toString() || "",
                        jenis_pelanggaran_id: data.jenis_pelanggaran_id?.toString() || "",
                        keterangan: data.keterangan || "",
                        tanggal: data.tanggal || "",
                    });
                    setNamaSiswa(data.siswa?.nama || "Siswa tidak dikenal");
                }
                setFetching(false);
            }
        };
        loadData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            _method: "PATCH",
            guru_id: parseInt(formData.guru_id),
            jenis_pelanggaran_id: parseInt(formData.jenis_pelanggaran_id),
            keterangan: formData.keterangan || null,
            tanggal: formData.tanggal || null,
        };

        try {
            await updatePelanggaran(Number(id), payload);
            toast.success("Data pelanggaran berhasil diperbarui");
            navigate("/pelanggaran");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Gagal memperbarui data");
        }
    };

    if (fetching) {
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
            <div className="p-6 space-y-6 w-full max-w-3xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="p-0 hover:bg-transparent">
                        <ArrowLeft className="size-5" />
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Edit Data Pelanggaran</h1>
                </div>

                <Card className="shadow-sm border-zinc-200">
                    <CardHeader className="bg-zinc-50/50 border-b py-4">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <ShieldAlert className="size-4 text-red-600" /> 
                            Informasi Pelanggaran: <span className="text-blue-600">{namaSiswa}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Guru Pelapor */}
                            <div className="space-y-2">
                                <Label htmlFor="guru_id" className="flex items-center gap-2">
                                    <UserCheck className="size-4 text-zinc-400" /> Guru Pelapor (Wajib)
                                </Label>
                                <NativeSelect id="guru_id" value={formData.guru_id} onChange={handleChange} required>
                                    <option value="">Pilih Guru</option>
                                    {guru?.map((g: any) => (
                                        <option key={g.id} value={g.id}>{g.nama}</option>
                                    ))}
                                </NativeSelect>
                            </div>

                            {/* Jenis Pelanggaran */}
                            <div className="space-y-2">
                                <Label htmlFor="jenis_pelanggaran_id" className="flex items-center gap-2">
                                    <ShieldAlert className="size-4 text-zinc-400" /> Jenis Pelanggaran (Wajib)
                                </Label>
                                <NativeSelect id="jenis_pelanggaran_id" value={formData.jenis_pelanggaran_id} onChange={handleChange} required>
                                    <option value="">Pilih Jenis Pelanggaran</option>
                                    {jenisPelanggaran?.map((jp: any) => (
                                        <option key={jp.id} value={jp.id}>{jp.nama_pelanggaran} (Poin: {jp.poin})</option>
                                    ))}
                                </NativeSelect>
                            </div>

                            {/* Tanggal Pelanggaran */}
                            <div className="space-y-2">
                                <Label htmlFor="tanggal" className="flex items-center gap-2">
                                    <Calendar className="size-4 text-zinc-400" /> Tanggal Kejadian
                                </Label>
                                <Input id="tanggal" type="date" value={formData.tanggal} onChange={handleChange} />
                            </div>

                            {/* Keterangan */}
                            <div className="space-y-2">
                                <Label htmlFor="keterangan" className="flex items-center gap-2">
                                    <FileText className="size-4 text-zinc-400" /> Keterangan Tambahan
                                </Label>
                                <Textarea 
                                    id="keterangan" 
                                    value={formData.keterangan} 
                                    onChange={handleChange} 
                                    placeholder="Ceritakan kronologi singkat..."
                                    className="resize-none h-24"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                                    Batal
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]" 
                                    disabled={loadingAction}
                                >
                                    {loadingAction ? <Loader2 className="animate-spin size-4 mr-2" /> : <Save className="size-4 mr-2" />}
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}