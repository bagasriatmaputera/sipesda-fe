import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/layout";
import { useSiswa } from "@/hooks/useSiswa";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, ShieldAlert, BarChart3, Phone, School, Hash, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DetailSiswaPage() {
    const { id } = useParams();
    const { showSiswa, loading, exportPdf } = useSiswa();
    const [siswa, setSiswa] = useState<any>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (id) {
                const data = await showSiswa(id);
                setSiswa(data);
            }
        };
        fetchDetail();
    }, [id]);

    const getBadgeColor = (nilai: number) => {
        if (nilai >= 0.75) return "bg-red-600 hover:bg-red-700 text-white"; // Merah
        if (nilai >= 0.50) return "bg-yellow-500 hover:bg-yellow-600 text-white"; // Kuning
        return "bg-green-600 hover:bg-green-700 text-white"; // Hijau
    };
    

    const navigate = useNavigate()

    if (loading) {
        return (
            <Layout>
                <div className="flex h-screen w-full items-center justify-center">
                    <Loader2 className="animate-spin size-8 text-zinc-500" />
                </div>
            </Layout>
        );
    }

    if (!siswa) {
        return (
            <Layout>
                <div className="p-6 text-center">Data tidak ditemukan.</div>
            </Layout>
        );
    }


    return (
        <Layout>
            <div className="p-6 space-y-8 max-w-7xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/siswa")}
                    className="w-fit p-0 h-auto hover:bg-transparent text-zinc-500 hover:text-zinc-900 flex gap-2"
                >
                    <ArrowLeft className="size-4" /> Kembali ke Daftar Siswa
                </Button>
                {/* 1. TABLE / CARD DETAIL BIODATA */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-1 shadow-sm border-zinc-200">
                        <CardHeader className="bg-zinc-50/50 border-b">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <User className="size-5 text-blue-600" /> Profil Siswa
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-zinc-500 text-sm flex items-center gap-2"><Hash className="size-4" /> NIS</span>
                                    <span className="font-mono font-bold">{siswa.nis}</span>
                                </div>
                                <div className="flex flex-col border-b pb-2">
                                    <span className="text-zinc-500 text-sm flex items-center gap-2"><User className="size-4" /> Nama Lengkap</span>
                                    <span className="font-semibold text-zinc-900">{siswa.nama}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-zinc-500 text-sm flex items-center gap-2"><School className="size-4" /> Kelas</span>
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{siswa.kelas}</Badge>
                                </div>
                                <div className="flex flex-col border-b pb-2">
                                    <span className="text-zinc-500 text-sm">Wali Murid</span>
                                    <span className="font-medium">{siswa.nama_wali}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 text-sm flex items-center gap-2"><Phone className="size-4" /> No. HP Wali</span>
                                    <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md">{siswa.no_hp_wali}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. TABLE RIWAYAT PELANGGARAN */}
                    <Card className="lg:col-span-2 shadow-sm border-zinc-200 overflow-hidden">
                        <CardHeader className="bg-zinc-50/50 border-b">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <ShieldAlert className="size-5 text-red-600" /> Riwayat Pelanggaran
                            </CardTitle>
                            <CardDescription>Daftar tindakan indisipliner yang tercatat.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-zinc-50/30">
                                            <TableHead className="w-[120px]">Tanggal</TableHead>
                                            <TableHead>Jenis Pelanggaran</TableHead>
                                            <TableHead className="w-[100px]">Tingkat</TableHead>
                                            <TableHead className="text-center">Poin</TableHead>
                                            <TableHead>Guru Pelapor</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {siswa.pelanggaran?.map((p: any) => (
                                            <TableRow key={p.id}>
                                                <TableCell className="text-sm text-zinc-600">{p.tanggal}</TableCell>
                                                <TableCell className="font-medium max-w-[200px] whitespace-normal break-words leading-relaxed" title={p.jenis_pelanggaran.nama}>
                                                    {p.jenis_pelanggaran.nama}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={
                                                        p.jenis_pelanggaran.tingkat === 'berat' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }>
                                                        {p.jenis_pelanggaran.tingkat}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center font-bold text-red-600">{p.poin}</TableCell>
                                                <TableCell className="text-sm italic">{p.guru.nama}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. TABLE ANALISIS SAW */}
                <Card className="shadow-sm border-zinc-200 overflow-hidden">
                    <CardHeader className="bg-zinc-50/50 border-b">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <BarChart3 className="size-5 text-purple-600" /> Hasil Analisis SAW
                        </CardTitle>
                        <CardDescription>Rekomendasi tindakan berdasarkan perhitungan bobot kriteria.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-zinc-50/30 text-xs uppercase tracking-wider">
                                        <TableHead className="w-[100px]">Tahapan</TableHead>
                                        <TableHead>Rekomendasi Tindakan (Deskripsi)</TableHead>
                                        <TableHead className="text-center">Kriteria (C1/C2/C3)</TableHead>
                                        <TableHead className="text-center">Nilai Preferensi</TableHead>
                                        <TableHead className="text-right">Periode</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {siswa.saw?.map((s: any) => (
                                        <TableRow key={s.id} className="hover:bg-zinc-50/50">
                                            <TableCell className="font-bold text-blue-600">{s.tahap.Tahapan}</TableCell>
                                            <TableCell className="max-w-[300px] text-sm whitespace-normal break-words leading-relaxed">
                                                {s.tahap.deskripsi}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col items-center gap-1 text-[10px]">
                                                    <span className="bg-zinc-100 px-2 py-0.5 rounded-full">Poin: {s.kriteria.c1_poin}</span>
                                                    <span className="bg-zinc-100 px-2 py-0.5 rounded-full">Freq: {s.kriteria.c2_frekuensi}</span>
                                                    <span className="bg-zinc-100 px-2 py-0.5 rounded-full">Lvl: {s.kriteria.c3_tingkat}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge className={`${getBadgeColor(Number(s.nilai_preferensi))}`}>
                                                    {s.nilai_preferensi}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right text-xs text-zinc-500">
                                                {s.periode}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
                <Button
                    onClick={() => exportPdf(siswa.id)}
                    variant="outline"
                    className="flex gap-2 border-red-200 text-red-600 hover:bg-red-50"
                >
                    <FileText className="size-4" /> Cetak PDF
                </Button>
            </div>
        </Layout>
    );
}