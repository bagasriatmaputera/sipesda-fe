import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash2, UserPlus } from "lucide-react"
import { useSiswa } from "@/hooks/useSiswa"
import Layout from "@/layout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function DataSiswaPage() {
    const { siswa, loading, deleteSiswa } = useSiswa();
    const navigate = useNavigate();

    const handleDelete = async (id: number, nama: string) => {
        if (confirm(`Hapus data siswa ${nama}?`)) {
            try {
                await deleteSiswa(id);
                toast.success("Data berhasil dihapus");
            } catch (err) {
                toast.error("Gagal menghapus data");
            }
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-6 bg-white min-h-screen">
                <div className="flex justify-between items-end border-b border-emerald-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-emerald-950 tracking-tight">Daftar Siswa</h1>
                        <p className="text-emerald-600 font-medium">Kelola database siswa Da’il Khairaat</p>
                    </div>
                    <Button onClick={() => navigate('/siswa/create')} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 gap-2 px-6">
                        <UserPlus className="size-4" /> Tambah Siswa Baru
                    </Button>
                </div>

                <div className="border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableCaption className="bg-emerald-50/30 py-4 text-emerald-700 font-medium">
                                Total: {siswa.length} Siswa Terdaftar
                            </TableCaption>
                            <TableHeader className="bg-emerald-600">
                                <TableRow className="hover:bg-emerald-600 border-none">
                                    <TableHead className="text-white font-bold w-[120px]">NISN</TableHead>
                                    <TableHead className="text-white font-bold w-[250px]">Nama Lengkap</TableHead>
                                    <TableHead className="text-white font-bold">Kelas</TableHead>
                                    <TableHead className="text-white font-bold">Wali Murid</TableHead>
                                    <TableHead className="text-white font-bold">No. WhatsApp</TableHead>
                                    <TableHead className="text-white font-bold text-center">Status Poin</TableHead>
                                    <TableHead className="text-right text-white font-bold sticky right-0 bg-emerald-600 shadow-l">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? <TableRow><TableCell colSpan={7} className="text-center py-20 text-emerald-600 font-bold animate-pulse">Memproses Data...</TableCell></TableRow> :
                                 siswa.length === 0 ? <TableRow><TableCell colSpan={7} className="text-center py-20 text-emerald-400">Belum ada data tersedia.</TableCell></TableRow> :
                                 siswa.map((item: any) => (
                                    <TableRow key={item.id} className="hover:bg-emerald-50/50 transition-colors border-emerald-50">
                                        <TableCell className="font-mono text-emerald-600 font-bold">{item.nis || "-"}</TableCell>
                                        <TableCell className="font-bold text-emerald-950">{item.nama}</TableCell>
                                        <TableCell><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">{item.kelas}</span></TableCell>
                                        <TableCell className="text-emerald-800">{item.nama_wali}</TableCell>
                                        <TableCell className="font-medium text-emerald-600">{item.no_hp_wali}</TableCell>
                                        <TableCell className="text-center">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-black shadow-sm ${item.total_poin > 50 ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                                                {item.total_poin || 0} Poin
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right sticky right-0 bg-white/95 backdrop-blur-sm shadow-l">
                                            <div className="flex justify-end gap-1">
                                                <Button onClick={() => navigate(`/siswa/detail/${item.id}`)} variant="ghost" size="icon" className="text-emerald-600 hover:bg-emerald-100"><Eye className="size-4" /></Button>
                                                <Button onClick={() => navigate(`/siswa/edit/${item.id}`)} variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50"><Edit className="size-4" /></Button>
                                                <Button onClick={() => handleDelete(item.id, item.nama)} variant="ghost" size="icon" className="text-red-500 hover:bg-red-50"><Trash2 className="size-4" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}