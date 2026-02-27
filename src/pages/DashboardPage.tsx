import { Users, AlertTriangle, Loader2, ShieldAlert, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/layout";
import { useDashboard } from "@/hooks/useDashboard";
import { PelanggaranChart } from "@/components/ui/create/PelanggaranChart";
import { usePelanggaran } from "@/hooks/usePelanggaran";
import { useMemo } from "react";

export default function DashboardPage() {
    const { chart, siswaTerlanggar, pelanggaranPerWeek, totalSiswa, siswa, loading } = useDashboard();
    const { pelanggaran } = usePelanggaran();

    const topViolation = useMemo(() => {
        if (!pelanggaran || pelanggaran.length === 0) return { nama: "Tidak ada", count: 0 };
        const counts = pelanggaran.reduce((acc: Record<string, number>, curr: any) => {
            const name = curr.pelanggaran?.nama || "Lainnya";
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {});
        const topName = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        return { nama: topName, count: counts[topName] };
    }, [pelanggaran]);

    if (loading && !chart) {
        return (
            <Layout>
                <div className="flex h-screen items-center justify-center bg-emerald-50/20">
                    <Loader2 className="animate-spin text-emerald-600 size-10" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 space-y-8 bg-emerald-50/10 min-h-screen">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight text-emerald-950">
                        SIPESDA <span className="text-emerald-600 font-medium text-lg ml-2">Dail Khairaat</span>
                    </h1>
                    <p className="text-emerald-700/70 font-medium">
                        Selamat datang di panel kendali kedisiplinan siswa.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-emerald-800">Siswa Terlanggar</CardTitle>
                            <div className="p-2 bg-emerald-100 rounded-lg"><Users className="h-4 w-4 text-emerald-600" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-emerald-950">
                                {siswaTerlanggar}
                                <span className="text-sm font-medium text-emerald-400">/{totalSiswa}</span>
                            </div>
                            <p className="text-xs text-emerald-600/60 mt-1 font-medium">Siswa dengan catatan poin</p>
                        </CardContent>
                    </Card>

                    <Card className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-emerald-800">Pelanggaran Minggu Ini</CardTitle>
                            <div className="p-2 bg-emerald-50 rounded-lg"><AlertTriangle className="h-4 w-4 text-emerald-600" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-emerald-950">{pelanggaranPerWeek}</div>
                            <p className="text-xs text-emerald-600/60 mt-1 font-medium">Input data terbaru</p>
                        </CardContent>
                    </Card>

                    <Card className="border-red-100 bg-red-50/30 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-red-900">Siswa Kondisi Kritis</CardTitle>
                            <div className="rounded-lg bg-red-100 p-2"><ShieldAlert className="size-4 text-red-600" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-red-600">{siswa.length ?? '0'}</div>
                            <p className="text-xs text-red-600/60 mt-1 font-medium">Butuh sanksi segera</p>
                        </CardContent>
                    </Card>

                    <Card className="border-emerald-100 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-emerald-800">Top Pelanggaran</CardTitle>
                            <div className="rounded-lg bg-emerald-100 p-2"><Zap className="size-4 text-emerald-600" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold text-emerald-900 truncate" title={topViolation.nama}>
                                {topViolation.nama}
                            </div>
                            <p className="text-xs text-emerald-600/60 mt-1">Terjadi <span className="font-bold">{topViolation.count} kali</span></p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4 border-emerald-100">
                        <CardHeader className="border-b border-emerald-50">
                            <CardTitle className="text-emerald-900">Grafik Pelanggaran</CardTitle>
                        </CardHeader>
                        <div className="p-6"><PelanggaranChart data={chart} /></div>
                    </Card>

                    <Card className="col-span-3 border-emerald-100">
                        <CardHeader className="border-b border-emerald-50">
                            <CardTitle className="text-emerald-900">Siswa Poin Tertinggi</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {loading ? <div className="animate-pulse space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-10 bg-emerald-50 rounded" />)}</div> :
                            siswa.length === 0 ? <p className="text-center text-emerald-500 italic py-10 text-sm">Belum ada siswa poin {">"} 50</p> :
                            <ul className="space-y-3">
                                {siswa.map((item: any, index: number) => (
                                    <li key={index} className="flex justify-between items-center p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-emerald-300">#{index + 1}</span>
                                            <span className="text-sm font-bold text-emerald-900">{item.siswa.nama}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-emerald-100 shadow-sm">
                                            <span className="font-black text-red-600 text-sm">{item.total_poin}</span>
                                            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Poin</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}