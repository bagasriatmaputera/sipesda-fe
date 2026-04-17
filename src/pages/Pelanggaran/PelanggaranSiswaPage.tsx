import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, UserPlus, Search, Loader2, Calendar, MessageCircle } from "lucide-react"
import { usePelanggaran } from "@/hooks/usePelanggaran"
import Layout from "@/layout"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"

export default function PelanggaranSiswa() {
    const { pelanggaran, loading, deletePelanggaran, fetchPelanggaran } = usePelanggaran();
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleDelete = async (id: number) => {
        if (confirm(`Hapus data pelanggaran ini?`)) {
            try {
                await deletePelanggaran(id);
                toast.success("Data pelanggaran dihapus");
            } catch (error) {
                toast.error("Gagal menghapus data");
            }
        }
    };

    const handleWhatsApp = (item: any) => {
        // const noWali = item.siswa?.no_wali;
        const noWali =  6283816989642;
        
        const namaSiswa = item.siswa?.nama;
        const kelas = item.siswa?.kelas;
        const namaPelanggaran = item.pelanggaran?.nama;
        const tingkat = item.pelanggaran?.tingkat;
        const poin = item.poin;
        const tanggal = item.tanggal;
        
        if (!noWali) {
            toast.error("Nomor WhatsApp wali tidak tersedia");
            return;
        }
        
        const pesan = `Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\n` +
            `*Pemberitahuan Kedisiplinan Siswa (SIPESDA)*\n\n` +
            `Menginformasikan bahwa pada tanggal *${tanggal}*, telah tercatat data pelanggaran siswa sebagai berikut:\n\n` +
            `*Detail Siswa:*\n` +
            `- Nama: ${namaSiswa}\n` +
            `- Kelas: ${kelas}\n\n` +
            `*Detail Pelanggaran:*\n` +
            `- Jenis: ${namaPelanggaran}\n` +
            `- Tingkat: ${tingkat}\n` +
            `- Poin Pelanggaran: ${poin}\n` +
            `- Keterangan: -\n\n` +
            `Mohon Bapak/Ibu Wali Murid dapat memberikan perhatian serta bimbingan kepada ananda agar hal serupa tidak terulang kembali demi kebaikan proses pendidikan ananda di Madrasah.\n\n` +
            `Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.\n\n` +
            `Wassalamu'alaikum Warahmatullahi Wabarakatuh.`;
        
        const whatsappUrl = `https://wa.me/${noWali}?text=${encodeURIComponent(pesan)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Layout>
            <div className="flex flex-col gap-6 p-6 bg-emerald-50/10 min-h-screen w-full max-w-full overflow-hidden">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-emerald-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-emerald-950 tracking-tight">Data Pelanggaran</h1>
                        <p className="text-emerald-600 font-medium">Log aktivitas indisipliner siswa Da’il Khairaat.</p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                            <Input
                                type="search"
                                placeholder="Cari nama siswa atau NIS..."
                                className="pl-10 border-emerald-100 focus:ring-emerald-500 bg-white"
                                value={keyword}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setKeyword(val);
                                    if (val.length === 0) fetchPelanggaran("");
                                    else if (val.length >= 3) fetchPelanggaran(val);
                                }}
                            />
                        </div>

                        <Button 
                            onClick={() => navigate('/pelanggaran/input-pelanggaran')} 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 gap-2 shrink-0"
                        >
                            <UserPlus className="size-4" /> 
                            <span className="hidden sm:inline">Input Pelanggaran</span>
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="border border-emerald-100 rounded-2xl bg-white overflow-hidden shadow-sm">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[1100px] table-fixed">
                            <TableHeader className="bg-emerald-600">
                                <TableRow className="hover:bg-emerald-600 border-none">
                                    <TableHead className="text-white font-bold w-[180px]">Siswa</TableHead>
                                    <TableHead className="text-white font-bold w-[180px]">Guru Pelapor</TableHead>
                                    <TableHead className="text-white font-bold w-[300px]">Detail Pelanggaran</TableHead>
                                    <TableHead className="text-white font-bold w-[150px]">Tanggal</TableHead>
                                    <TableHead className="text-white font-bold w-[80px] text-center">Poin</TableHead>
                                    <TableHead className="text-white font-bold w-[200px]">Keterangan</TableHead>
                                    <TableHead className="text-right text-white font-bold w-[140px] sticky right-0 bg-emerald-600 shadow-l">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-20">
                                            <Loader2 className="animate-spin text-emerald-600 mx-auto size-8" />
                                        </TableCell>
                                    </TableRow>
                                ) : pelanggaran.length === 0 ? (
                                    <TableRow><TableCell colSpan={7} className="text-center py-20 text-emerald-400">Data tidak ditemukan.</TableCell></TableRow>
                                ) : (
                                    pelanggaran.map((item: any, index: number) => (
                                        <TableRow key={item.id ?? index} className="hover:bg-emerald-50/50 transition-colors border-emerald-50">
                                            <TableCell className="font-bold text-emerald-950 truncate">{item.siswa?.nama}</TableCell>
                                            <TableCell className="text-emerald-700 font-medium truncate">{item.guru?.nama}</TableCell>
                                            <TableCell>
                                                <p className="line-clamp-2 text-xs font-medium text-emerald-900 leading-relaxed">
                                                    {item.pelanggaran?.nama}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-xs text-emerald-600">
                                                    <Calendar className="size-3" />
                                                    {item.tanggal}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className="bg-red-50 text-red-600 px-2 py-1 rounded font-black text-sm border border-red-100">
                                                    {item.poin}
                                                </span>
                                            </TableCell>
                                            <TableCell className="truncate text-emerald-500 italic text-xs">{item.keterangan || '-'}</TableCell>

                                            <TableCell className="text-right sticky right-0 bg-white/95 backdrop-blur-sm shadow-l">
                                                <div className="flex justify-end gap-1">
                                                    <Button 
                                                        onClick={() => handleWhatsApp(item)} 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="text-green-600 hover:bg-green-50" 
                                                        title="Kirim ke WhatsApp"
                                                    >
                                                        <MessageCircle className="size-4" />
                                                    </Button>
                                                    <Button onClick={() => navigate(`/pelanggaran/${item.id}`)} variant="ghost" size="icon" className="text-emerald-600 hover:bg-emerald-100"><Edit className="size-4" /></Button>
                                                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleDelete(item.id)}><Trash2 className="size-4" /></Button>
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