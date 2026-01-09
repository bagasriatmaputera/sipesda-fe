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
    // Memanggil data dan fungsi dari custom hook
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
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Daftar Siswa</h1>
                        <p className="text-muted-foreground text-sm">Kelola data siswa Da’il Khairaat</p>
                    </div>
                    <Button className="flex gap-2">
                        <UserPlus className="size-4" /> Tambah Siswa
                    </Button>
                </div>

                <div className="border rounded-lg">
                    <Table>
                        <TableCaption>Total: {siswa.length} Siswa terdaftar.</TableCaption>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-[100px]">NISN</TableHead>
                                <TableHead>Nama Lengkap</TableHead>
                                <TableHead>Kelas</TableHead>
                                <TableHead>Nama Wali</TableHead>
                                <TableHead>No WA Wali</TableHead>
                                <TableHead>Poin Pelanggaran</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">
                                        Memuat data siswa...
                                    </TableCell>
                                </TableRow>
                            ) : siswa.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">
                                        Tidak ada data siswa.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                siswa.map((item: any) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.nis || "-"}</TableCell>
                                        <TableCell>{item.nama}</TableCell>
                                        <TableCell>{item.kelas}</TableCell>
                                        <TableCell>{item.nama_wali}</TableCell>
                                        <TableCell>{item.no_hp_wali}</TableCell>
                                        <TableCell>
                                            <span className={`font-bold ${item.poin > 50 ? 'text-red-600' : 'text-green-600'}`}>
                                                {item.poin || 0}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                <Edit className="size-4 text-blue-600" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => handleDelete(item.id, item.nama)}
                                            >
                                                <Trash2 className="size-4 text-red-600" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Layout>
    )
}