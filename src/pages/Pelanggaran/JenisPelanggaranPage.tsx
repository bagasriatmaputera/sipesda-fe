import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, PlusCircle, AlertTriangle, Loader2 } from "lucide-react"
import { useJenisPelanggaran } from "@/hooks/useJenisPelanggaran"
import Layout from "@/layout"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function JenisPelanggaranPage() {
    const { jenisPelanggaran, loading, deleteJenisPelanggaran } = useJenisPelanggaran();
    const navigate = useNavigate();

    const handleDelete = async (id: number, nama: string) => {
        if (confirm(`Hapus jenis pelanggaran: ${nama}?`)) {
            try {
                await deleteJenisPelanggaran(id);
                toast.success("Data berhasil dihapus");
            } catch (err) {
                toast.error("Gagal menghapus data");
            }
        }
    };

    const getTingkatStyle = (tingkat: string) => {
        switch (tingkat.toLowerCase()) {
            case 'berat': return 'bg-red-100 text-red-700 border-red-200';
            case 'sedang': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-6 bg-emerald-50/10 min-h-screen w-full max-w-full overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-emerald-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-emerald-950 tracking-tight">Kategori Pelanggaran</h1>
                        <p className="text-emerald-600 font-medium">Daftar klasifikasi dan bobot poin kedisiplinan.</p>
                    </div>
                    <Button onClick={() => navigate('/pelanggaran/create-jenis-pelanggaran')} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 gap-2 px-6">
                        <PlusCircle className="size-4" /> Tambah Jenis Kategori
                    </Button>
                </div>

                <div className="border border-emerald-100 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table className="w-full min-w-[900px] table-fixed">
                            <TableHeader className="bg-emerald-600">
                                <TableRow className="hover:bg-emerald-600 border-none">
                                    <TableHead className="w-[60px] text-center text-white font-bold">No</TableHead>
                                    <TableHead className="w-[350px] text-white font-bold">Nama Kategori Pelanggaran</TableHead>
                                    <TableHead className="w-[180px] text-white font-bold">Klasifikasi</TableHead>
                                    <TableHead className="w-[120px] text-white font-bold">Bobot Poin</TableHead>
                                    <TableHead className="text-right w-[120px] sticky right-0 bg-emerald-600 text-white font-bold shadow-l">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={5} className="py-20 text-center"><Loader2 className="animate-spin text-emerald-600 mx-auto size-8" /></TableCell></TableRow>
                                ) : jenisPelanggaran.length === 0 ? (
                                    <TableRow><TableCell colSpan={5} className="py-20 text-center text-emerald-400 font-medium">Belum ada kategori terdaftar.</TableCell></TableRow>
                                ) : (
                                    jenisPelanggaran.map((item: any, index: number) => (
                                        <TableRow key={item.id ?? index} className="hover:bg-emerald-50/50 transition-colors border-emerald-50">
                                            <TableCell className="text-center text-emerald-300 font-bold">{index + 1}</TableCell>
                                            <TableCell className="font-bold text-emerald-950 leading-relaxed">{item.nama_pelanggaran}</TableCell>
                                            <TableCell>
                                                <span className={`px-3 py-1 rounded-full text-xs font-black border ${getTingkatStyle(item.tingkat)} uppercase tracking-tighter`}>
                                                    {item.tingkat}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 bg-emerald-50 w-fit px-3 py-1 rounded-lg border border-emerald-100 font-black text-emerald-700">
                                                    <AlertTriangle className="size-3 text-emerald-400" />
                                                    {item.poin}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right sticky right-0 bg-white/95 backdrop-blur-sm shadow-l">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="text-emerald-600 hover:bg-emerald-100"><Edit className="size-4" /></Button>
                                                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleDelete(item.id, item.nama_pelanggaran)}><Trash2 className="size-4" /></Button>
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