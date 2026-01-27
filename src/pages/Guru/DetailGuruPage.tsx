import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/layout";
import { useGuru } from "@/hooks/useGuru";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    User,
    Phone,
    School,
    Hash,
    Loader2,
    ArrowLeft,
    Edit,
    Mail
} from "lucide-react";

export default function DetailGuruPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showGuru, loading } = useGuru();
    const [guru, setGuru] = useState<any>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (id) {
                const data = await showGuru(id);
                setGuru(data);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="flex h-screen w-full items-center justify-center">
                    <Loader2 className="animate-spin size-8 text-zinc-500" />
                </div>
            </Layout>
        );
    }

    if (!guru) return null;

    return (
        <Layout>
            <div className="p-4 sm:p-6 space-y-6 w-full min-h-screen bg-zinc-50/50">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/guru")}
                            className="w-fit p-0 h-auto hover:bg-transparent text-zinc-500 hover:text-zinc-900 flex gap-2"
                        >
                            <ArrowLeft className="size-4" /> Kembali ke Daftar Guru
                        </Button>
                        <h1 className="text-2xl font-bold tracking-tight mt-2">Detail Data Guru</h1>
                    </div>

                    {/* Tombol Edit */}
                    <Button
                        onClick={() => navigate(`/guru/edit/${guru.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex gap-2 shadow-sm"
                    >
                        <Edit className="size-4" /> Edit Data Guru
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card Utama: Informasi Profil */}
                    <Card className="md:col-span-2 shadow-sm border-zinc-200">
                        <CardHeader className="bg-white border-b py-4">
                            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                                <User className="size-5 text-blue-600" /> Informasi Pribadi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                            <Hash className="size-3" /> NIP
                                        </span>
                                        <p className="text-lg font-mono font-bold text-zinc-900">{guru.nip || "-"}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                            <User className="size-3" /> Nama Lengkap
                                        </span>
                                        <p className="text-lg font-semibold text-zinc-900">{guru.nama}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                            <Mail className="size-3" /> Email Sistem
                                        </span>
                                        <p className="text-zinc-700">{guru.user?.email || "Tidak ada email"}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                            <Phone className="size-3" /> Nomor WhatsApp
                                        </span>
                                        <p className="text-green-700 font-medium bg-green-50 w-fit px-2 py-0.5 rounded border border-green-100">
                                            {guru.no_hp}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card Samping: Tugas & Jabatan */}
                    <Card className="md:col-span-1 shadow-sm border-zinc-200 h-fit">
                        <CardHeader className="bg-white border-b py-4">
                            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                                <School className="size-5 text-purple-600" /> Penugasan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-col gap-4">
                                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                    <span className="text-xs font-bold text-purple-700 uppercase">Wali Kelas</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <School className="size-5 text-purple-600" />
                                        <span className="text-xl font-bold text-purple-900">
                                            {guru.kelas?.nama_kelas || "Bukan Wali Kelas"}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-sm text-zinc-500 leading-relaxed italic">
                                    * Guru ini bertanggung jawab atas data pelanggaran siswa di kelas tersebut.
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}