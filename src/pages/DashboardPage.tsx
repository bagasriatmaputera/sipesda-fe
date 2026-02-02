import {
    Users,
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
    Loader2,
    ShieldAlert,
    Zap,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Layout from "@/layout"
import { useDashboard } from "@/hooks/useDashboard"
import { PelanggaranChart } from "@/components/ui/create/PelanggaranChart"
import { usePelanggaran } from "@/hooks/usePelanggaran"
import { useMemo } from "react"

export default function DashboardPage() {

    const { chart, siswaTerlanggar, pelanggaranPerWeek, totalSiswa, siswa, loading } = useDashboard();

    const { pelanggaran } = usePelanggaran();
    const topViolation = useMemo(() => {
        if (!pelanggaran || pelanggaran.length === 0) return { nama: "Tidak ada", count: 0 };

        const counts = pelanggaran.reduce((acc: Record<string, number>, curr: any) => {
            const name = curr.pelanggaran?.nama|| "Lainnya";
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {});

        const topName = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

        return {
            nama: topName,
            count: counts[topName]
        };
    }, [pelanggaran]);
    if (loading && !chart) {
        return (
            <Layout>
                <div className="flex h-screen items-center justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            </Layout>
        );
    }
    return (
        <Layout>
            <div className="p-6 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Sistem Informasi Pelanggaran Siswa Da’il Khairaat
                    </h1>
                    <p className="text-muted-foreground">
                        Selamat datang di panel kendali kedisiplinan siswa.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Siswa Terlanggar</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {siswaTerlanggar}
                                <span className="text-sm font-medium text-zinc-500">/{totalSiswa}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Total siswa dengan catatan poin
                            </p>
                        </CardContent>
                    </Card>

                    {/* KPI: Pelanggaran Aktif (Unresolved) */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pelanggaran Minggu Ini</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pelanggaranPerWeek}</div>
                            <p className="text-xs text-muted-foreground">
                                Butuh tindak lanjut segera
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-red-100 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-900">
                                Siswa Kondisi Kritis
                            </CardTitle>
                            <div className="rounded-full bg-red-50 p-2">
                                <ShieldAlert className="size-5 text-red-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-red-600">
                                {siswa.length ?? ''}
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">
                                Butuh penanganan sanksi segera
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-200 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-zinc-900">
                                Top Jenis Pelanggaran
                            </CardTitle>
                            <div className="rounded-full bg-yellow-50 p-2">
                                <Zap className="size-5 text-yellow-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-base sm:text-lg font-bold text-zinc-900 break-words leading-tight min-h-[3rem] flex items-center" title={topViolation.nama}>
                                {topViolation.nama}
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">
                                Terjadi sebanyak <span className="font-bold text-zinc-700">{topViolation.count} kali</span> bulan ini
                            </p>
                        </CardContent>
                    </Card>

                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Grafik Pelanggaran</CardTitle>
                        </CardHeader>
                        <div className="p-6">
                            <PelanggaranChart data={chart} />
                        </div>
                    </Card>

                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Siswa Terancam DO (Poin Tertinggi)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-4 animate-pulse">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-4 bg-zinc-100 rounded w-full"></div>
                                    ))}
                                </div>
                            ) : siswa.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-6 text-center">
                                    <p className="text-sm text-zinc-500 italic">Belum ada siswa dengan poin {">"} 50</p>
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {siswa.map((item: any, index: number) => (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center p-2 rounded-lg hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-mono text-zinc-400">0{index + 1}</span>
                                                <span className="text-sm font-medium text-zinc-700">{item.siswa.nama}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-red-600 text-sm">{item.total_poin}</span>
                                                <span className="text-[10px] text-zinc-400 font-semibold uppercase">Poin</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}