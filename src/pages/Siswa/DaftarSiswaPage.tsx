import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, UserPlus } from "lucide-react"
import { useSiswa } from "@/hooks/useSiswa"
import Layout from "@/layout";

export default function DataSiswaPage() {
    const { siswa, loading, deleteSiswa } = useSiswa();

    const handleDelete = async (id: number, nama: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus siswa ${nama}?`)) {
            try {
                await deleteSiswa(id);
                alert("Data berhasil dihapus");
            } catch (err) {
                alert("Gagal menghapus data");
            }
        }
    };

    return (
        <Layout>
            {/* KUNCI 1: overflow-hidden di container utama agar monitor terkunci */}
            <div className="p-6 space-y-4 w-full max-w-full overflow-hidden">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Daftar Siswa</h1>
                        <p className="text-muted-foreground text-sm">Kelola data siswa Da’il Khairaat</p>
                    </div>
                    <Button className="flex gap-2 bg-black hover:bg-zinc-800 shrink-0">
                        <UserPlus className="size-4" /> Tambah Siswa
                    </Button>
                </div>

                {/* KUNCI 2: Border pembungkus dengan overflow-hidden */}
                <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
                    {/* KUNCI 3: Div khusus scroll horizontal tabel */}
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[1000px] table-fixed">
                            <TableCaption className="pb-4">Total: {siswa.length} Siswa terdaftar.</TableCaption>
                            <TableHeader className="bg-zinc-50">
                                <TableRow>
                                    <TableHead className="w-[120px]">NISN</TableHead>
                                    <TableHead className="w-[200px]">Nama Lengkap</TableHead>
                                    <TableHead className="w-[100px]">Kelas</TableHead>
                                    <TableHead className="w-[180px]">Nama Wali</TableHead>
                                    <TableHead className="w-[150px]">No WA Wali</TableHead>
                                    <TableHead className="w-[120px]">Poin</TableHead>
                                    {/* KUNCI 4: Sticky Action agar tombol aksi selalu muncul di kanan */}
                                    <TableHead className="text-right w-[100px] sticky right-0 bg-zinc-50 shadow-l">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-10">
                                            Memuat data siswa...
                                        </TableCell>
                                    </TableRow>
                                ) : siswa.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-10">
                                            Tidak ada data siswa.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    siswa.map((item: any, index: number) => (
                                        <TableRow key={item.id ?? index} className="hover:bg-zinc-50/50 transition-colors">
                                            <TableCell className="font-mono text-xs">{item.nis || "-"}</TableCell>
                                            <TableCell className="font-medium truncate">{item.nama}</TableCell>
                                            <TableCell>{item.kelas}</TableCell>
                                            <TableCell className="truncate">{item.nama_wali}</TableCell>
                                            <TableCell className="text-sm">{item.no_hp_wali}</TableCell>
                                            <TableCell>
                                                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${item.poin > 50 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                                    {item.poin || 0} Poin
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right sticky right-0 bg-white/90 backdrop-blur-sm shadow-l">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-zinc-200">
                                                        <Edit className="size-4 text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200"
                                                        onClick={() => handleDelete(item.id, item.nama)}
                                                    >
                                                        <Trash2 className="size-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}