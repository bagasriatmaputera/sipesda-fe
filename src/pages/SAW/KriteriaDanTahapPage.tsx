import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PlusCircle, AlertTriangle } from "lucide-react";
import Layout from "@/layout";
import { useSAW } from "@/hooks/useSaw";
export default function KriteriaDanTahapPage() {
    const {
        kriteria,
        loading,
        tahap,
        deleteKriteria,
        deleteTahap,
        storeKriteria,
        storeTahap,
    } = useSAW();

    const handleDeleteKriteria = async (id: number, nama: string) => {
        if (confirm(`Hapus kriteria: ${nama}?`)) {
            try {
                await deleteKriteria(id);
            } catch (err) {
                tahap
                alert("Gagal menghapus kriteria");
            }
        }
    };

    const handleDeleteTahap = async (id: number, nama: string) => {
        if (confirm(`Hapus tahap: ${nama}?`)) {
            try {
                await deleteTahap(id);
            } catch (err) {
                alert("Gagal menghapus tahap");
            }
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-4 w-full max-w-full overflow-hidden">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">
                            Kelola Kriteria dan Tahap
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Daftar tahap sanksi dan kriteria dalam perhitungan SAW.
                        </p>
                    </div>
                    <Button
                        className="bg-black hover:bg-zinc-800 text-white flex gap-2 shrink-0 shadow-sm"
                    >
                        <PlusCircle className="size-4" /> Tambah Jenis
                    </Button>
                </div>

                {/* Tabel Kriteria */}
                <h3>Kriteria</h3>
                <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[900px] table-fixed">
                            <TableHeader className="bg-zinc-50">
                                <TableRow>
                                    <TableHead className="w-[60px] text-center">No</TableHead>
                                    <TableHead className="w-[150px]">Nama Kriteria</TableHead>
                                    <TableHead className="w-[180px]">Kode Kriteria</TableHead>
                                    <TableHead className="text-right w-[80px] sticky right-0 bg-zinc-50 shadow-l">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center py-20 text-muted-foreground"
                                        >
                                            Memuat data...
                                        </TableCell>
                                    </TableRow>
                                ) : kriteria.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center py-20 text-muted-foreground"
                                        >
                                            Belum ada data kriteria.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    kriteria.map((item: any, index: number) => (
                                        <TableRow
                                            key={item.id ?? index}
                                            className="hover:bg-zinc-50/50 transition-colors"
                                        >
                                            <TableCell className="text-center text-zinc-500 font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-medium text-zinc-900 leading-relaxed whitespace-normal break-words line-clamp-2">
                                                    {item.nama}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle className="size-3 text-zinc-400" />
                                                    <span className="font-bold">{item.kode}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right sticky right-0 bg-white/90 backdrop-blur-sm shadow-l">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200 hover:bg-zinc-50 transition-all"
                                                    >
                                                        <Edit className="size-4 text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200 hover:bg-red-50 hover:border-red-200 transition-all group"
                                                        onClick={() =>
                                                            handleDeleteKriteria(item.id, item.nama)
                                                        }
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

                {/* Tabel Tahap */}
                <h3>Tahap</h3>
                <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[900px] table-fixed">
                            <TableHeader className="bg-zinc-50">
                                <TableRow>
                                    <TableHead className="w-auto text-center">No</TableHead>
                                    <TableHead className="w-auto">Tahap</TableHead>
                                    <TableHead className="w-auto">Kode Tahap</TableHead>
                                    <TableHead className="w-auto">Deskripsi Tahap</TableHead>
                                    <TableHead className="text-right w-[120px] sticky right-0 bg-zinc-50 shadow-l">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center py-20 text-muted-foreground"
                                        >
                                            Memuat data...
                                        </TableCell>
                                    </TableRow>
                                ) : tahap.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center py-20 text-muted-foreground"
                                        >
                                            Belum ada data tahap.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tahap.map((item: any, index: number) => (
                                        <TableRow
                                            key={item.id ?? index}
                                            className="hover:bg-zinc-50/50 transition-colors"
                                        >
                                            <TableCell className="text-center text-zinc-500 font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-medium text-zinc-900 leading-relaxed whitespace-normal break-words line-clamp-2">
                                                    {item.nama}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle className="size-3 text-zinc-400" />
                                                    <span className="font-bold">{item.kode}</span>
                                                </div>
                                            </TableCell><TableCell className="max-w-[00px]">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-sm text-zinc-700 truncate" title={item.deskripsi}>
                                                        {item.deskripsi}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right sticky right-0 bg-white/90 backdrop-blur-sm shadow-l">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200 hover:bg-zinc-50 transition-all"
                                                    >
                                                        <Edit className="size-4 text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200 hover:bg-red-50 hover:border-red-200 transition-all group"
                                                        onClick={() =>
                                                            handleDeleteTahap(item.id, item.nama)
                                                        }
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
    );
}
