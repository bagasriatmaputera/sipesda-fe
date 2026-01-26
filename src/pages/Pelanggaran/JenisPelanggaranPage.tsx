import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, PlusCircle, AlertTriangle } from "lucide-react"
import { useJenisPelanggaran } from "@/hooks/useJenisPelanggaran"
import Layout from "@/layout"
import { useNavigate } from "react-router-dom"

export default function JenisPelanggaranPage() {
    const { jenisPelanggaran, loading, deleteJenisPelanggaran } = useJenisPelanggaran();

    const handleDelete = async (id: number, nama: string) => {
        if (confirm(`Hapus jenis pelanggaran: ${nama}?`)) {
            try {
                await deleteJenisPelanggaran(id);
            } catch (err) {
                alert("Gagal menghapus data");
            }
        }
    };

    // Fungsi helper untuk warna tingkat pelanggaran
    const getTingkatStyle = (tingkat: string) => {
        switch (tingkat.toLowerCase()) {
            case 'berat': return 'bg-red-100 text-red-700 border-red-200';
            case 'sedang': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    const navigate = useNavigate();

    const toCreatePage = ()=> {
        navigate('/pelanggaran/create-jenis-pelanggaran')

    }
    return (
        <Layout>
            <div className="p-6 space-y-4 w-full max-w-full overflow-hidden">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">Kelola Jenis Pelanggaran</h1>
                        <p className="text-muted-foreground text-sm">Daftar kategori dan bobot poin pelanggaran siswa.</p>
                    </div>
                    <Button onClick={toCreatePage} className="bg-black hover:bg-zinc-800 text-white flex gap-2 shrink-0 shadow-sm">
                        <PlusCircle className="size-4" /> Tambah Jenis
                    </Button>
                </div>

                {/* Tabel dengan Scroll Internal */}
                <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[900px] table-fixed">
                            <TableHeader className="bg-zinc-50">
                                <TableRow>
                                    <TableHead className="w-[60px] text-center">No</TableHead>
                                    <TableHead className="w-[350px]">Nama Pelanggaran</TableHead>
                                    <TableHead className="w-[180px]">Tingkat</TableHead>
                                    <TableHead className="w-[120px]">Poin</TableHead>
                                    <TableHead className="text-right w-[120px] sticky right-0 bg-zinc-50 shadow-l">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-20 text-muted-foreground">
                                            Memuat data jenis pelanggaran...
                                        </TableCell>
                                    </TableRow>
                                ) : jenisPelanggaran.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-20 text-muted-foreground">
                                            Belum ada data jenis pelanggaran.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    jenisPelanggaran.map((item: any, index: number) => (
                                        <TableRow key={item.id ?? index} className="hover:bg-zinc-50/50 transition-colors">
                                            <TableCell className="text-center text-zinc-500 font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-medium text-zinc-900 leading-relaxed whitespace-normal break-words line-clamp-2">
                                                    {item.nama_pelanggaran}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getTingkatStyle(item.tingkat)}`}>
                                                    {item.tingkat}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle className="size-3 text-zinc-400" />
                                                    <span className="font-bold">{item.poin}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right sticky right-0 bg-white/90 backdrop-blur-sm shadow-l">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-zinc-200 hover:bg-zinc-50 transition-all">
                                                        <Edit className="size-4 text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200 hover:bg-red-50 hover:border-red-200 transition-all group"
                                                        onClick={() => handleDelete(item.id, item.nama_pelanggaran)}
                                                    >
                                                        <Trash2 className="size-4 text-red-600 group-hover:scale-110" />
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