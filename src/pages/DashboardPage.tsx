import {
    Users,
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Layout from "@/layout"

export default function DashboardPage() {
    return (
        <Layout>
            <div className="p-6 space-y-8">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Sistem Informasi Pelanggaran Siswa Da’il Khairaat
                    </h1>
                    <p className="text-muted-foreground">
                        Selamat datang di panel kendali kedisiplinan siswa.
                    </p>
                </div>

                {/* KPI Cards Section */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    {/* KPI: Siswa Terlanggar */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Siswa Terlanggar</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">128</div>
                            <p className="text-xs text-muted-foreground">
                                Total siswa dengan catatan poin
                            </p>
                        </CardContent>
                    </Card>

                    {/* KPI: Pelanggaran Aktif (Unresolved) */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pelanggaran Baru</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">
                                Butuh tindak lanjut segera
                            </p>
                        </CardContent>
                    </Card>

                    {/* KPI: Response/Penyelesaian */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">94%</div>
                            <p className="text-xs text-muted-foreground">
                                Laporan berhasil ditangani
                            </p>
                        </CardContent>
                    </Card>

                    {/* KPI: Rekomendasi - Tren Pelanggaran */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tren Mingguan</CardTitle>
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">-5%</div>
                            <p className="text-xs text-muted-foreground">
                                Penurunan tingkat pelanggaran
                            </p>
                        </CardContent>
                    </Card>

                </div>

                {/* Placeholder untuk Chart AHP atau Tabel di masa depan */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Grafik Pelanggaran</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[200px] flex items-center justify-center border-dashed border-2 m-4 rounded-lg">
                            Statistik Mingguan (Chart)
                        </CardContent>
                    </Card>

                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Siswa Terancam DO (Poin Tertinggi)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-sm">
                                    <span>Ahmad Syahrul</span>
                                    <span className="font-bold text-red-600">150 Poin</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span>Bagas Pratama</span>
                                    <span className="font-bold text-orange-600">85 Poin</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}