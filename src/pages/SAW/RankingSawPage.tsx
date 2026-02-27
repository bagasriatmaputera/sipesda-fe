import React from "react";
import Layout from "@/layout";
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
import { Trophy, Users, BarChart3, AlertTriangle, Loader2, ArrowUpRight } from "lucide-react";
import { useSAW } from "@/hooks/useSaw";

export default function RankingSAWPage() {
    const { siswa, loading } = useSAW(); 

    const getBadgeColor = (nilai: number) => {
        const val = Number(nilai);
        if (val >= 0.75) return "bg-red-600 text-white shadow-red-100 shadow-md";
        if (val >= 0.50) return "bg-amber-500 text-white shadow-amber-100 shadow-md";
        return "bg-emerald-600 text-white shadow-emerald-100 shadow-md";
    };

    const daftarTahap = [1, 2, 3, 4, 5];

    if (loading) return (
        <Layout>
            <div className="flex flex-col h-screen w-full items-center justify-center bg-emerald-50/10">
                <Loader2 className="animate-spin size-12 text-emerald-600 mb-4" />
                <p className="text-emerald-900 font-black animate-pulse uppercase tracking-widest">Menghitung Matrix SAW...</p>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className="p-6 space-y-10 w-full max-w-7xl mx-auto bg-white min-h-screen">
                {/* Hero Header */}
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
                                <Trophy className="size-10 text-emerald-300" />
                                Perangkingan SAW
                            </h1>
                            <p className="text-emerald-100 max-w-2xl font-medium">
                                Rekomendasi sanksi kedisiplinan berdasarkan perhitungan matrix preferensi 
                                <b> (Poin Pelanggaran × Frekuensi × Tingkat Sanksi)</b>.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                            <div className="text-3xl font-black">{siswa.length}</div>
                            <div className="text-xs font-bold uppercase tracking-wider text-emerald-200">Total Analisis</div>
                        </div>
                    </div>
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {daftarTahap.map((id) => {
                        const dataPerTahap = siswa.filter((item: any) => item.tahap_id === id);
                        const namaTahap = dataPerTahap.length > 0 ? dataPerTahap[0].tahap : `Tahap ${id}`;

                        return (
                            <div key={id} className="space-y-4">
                                <div className="flex items-center gap-3 px-2">
                                    <div className="bg-emerald-100 text-emerald-700 font-black px-4 py-1 rounded-full text-sm">#{id}</div>
                                    <h2 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">{namaTahap}</h2>
                                    <div className="h-px flex-1 bg-emerald-100"></div>
                                </div>

                                <Card className="shadow-xl border-emerald-50 overflow-hidden hover:border-emerald-200 transition-all">
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader className="bg-emerald-50/50">
                                                    <TableRow className="border-emerald-100 hover:bg-transparent">
                                                        <TableHead className="w-[80px] text-center font-black text-emerald-900">RANK</TableHead>
                                                        <TableHead className="min-w-[300px] font-black text-emerald-900">NAMA SISWA</TableHead>
                                                        <TableHead className="text-center font-black text-emerald-900">REKOMENDASI</TableHead>
                                                        <TableHead className="text-right pr-12 font-black text-emerald-900">NILAI PREFERENSI (V)</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {dataPerTahap.length > 0 ? (
                                                        dataPerTahap.map((item: any, index: number) => (
                                                            <TableRow key={index} className="hover:bg-emerald-50/30 border-emerald-50 group">
                                                                <TableCell className="text-center">
                                                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-xs ${index === 0 ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : 'bg-emerald-50 text-emerald-300'}`}>
                                                                        {index + 1}
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div className="flex flex-col">
                                                                        <span className="font-bold text-emerald-950 flex items-center gap-2">
                                                                            <Users className="size-3 text-emerald-400" />
                                                                            {item.nama_siswa}
                                                                        </span>
                                                                        <span className="text-[10px] text-emerald-500 font-mono font-bold tracking-tighter">DAIL KHAIRAAT SYSTEM</span>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="text-center">
                                                                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                                        {item.deskripsi}
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell className="text-right pr-12">
                                                                    <Badge className={`${getBadgeColor(item.nilai_preferensi)} font-mono font-black px-4 py-1.5 text-sm`}>
                                                                        {item.nilai_preferensi}
                                                                        <ArrowUpRight className="size-3 ml-1 opacity-50" />
                                                                    </Badge>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell colSpan={4} className="h-32 text-center bg-zinc-50/20 italic text-emerald-300">
                                                                <AlertTriangle className="size-6 mx-auto mb-2 opacity-30" />
                                                                Tidak ada anomali atau data kriteria mencukupi pada tahapan ini.
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}