import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, UserPlus, Phone, Eye, Loader2 } from "lucide-react"
import { useGuru } from "@/hooks/useGuru"
import Layout from "@/layout"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function DataGuruPage() {
    const { guru, loading, deleteGuru } = useGuru();
    const navigate = useNavigate();

    const handleDelete = async (id: number, nama: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus data guru ${nama}?`)) {
            try {
                await deleteGuru(id);
                toast.success("Data guru berhasil dihapus");
            } catch (error) {
                toast.error("Gagal menghapus data guru");
            }
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden p-6 bg-emerald-50/10 min-h-screen">
                <div className="flex justify-between items-end border-b border-emerald-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-emerald-950 tracking-tight">Data Guru</h1>
                        <p className="text-emerald-600 font-medium">Kelola informasi tenaga pengajar Da’il Khairaat.</p>
                    </div>
                    <Button 
                        onClick={() => navigate('/guru/create')} 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 gap-2 px-6 shrink-0"
                    >
                        <UserPlus className="size-4" /> Tambah Guru Baru
                    </Button>
                </div>

                <div className="border border-emerald-100 rounded-2xl bg-white overflow-hidden shadow-sm">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[800px] table-fixed">
                            <TableHeader className="bg-emerald-600">
                                <TableRow className="hover:bg-emerald-600 border-none">
                                    <TableHead className="text-white font-bold w-[100px]">Photo</TableHead>
                                    <TableHead className="text-white font-bold w-[180px]">NIP</TableHead>
                                    <TableHead className="text-white font-bold min-w-[200px]">Nama Guru</TableHead>
                                    <TableHead className="text-white font-bold w-[200px]">No. WhatsApp</TableHead>
                                    <TableHead className="text-right text-white font-bold w-[120px] sticky right-0 bg-emerald-600 shadow-l">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-20">
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="animate-spin text-emerald-600 size-8" />
                                                <span className="text-emerald-600 font-bold">Memuat data guru...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : guru.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-20 text-emerald-400 font-medium italic">
                                            Belum ada data tenaga pengajar terdaftar.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    guru.map((item: any, index: number) => (
                                        <TableRow key={item.id ?? index} className="hover:bg-emerald-50/50 transition-colors border-emerald-50">
                                            <TableCell>
                                                <Avatar className="h-12 w-12 border-2 border-emerald-100 shadow-sm">
                                                    <AvatarImage src={`http://127.0.0.1:8000/storage/${item.photo}`} alt={item.nama} className="object-cover" />
                                                    <AvatarFallback className="bg-emerald-100 text-xs font-black text-emerald-700">
                                                        {item.nama?.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell className="font-mono text-sm text-emerald-600 font-bold">
                                                {item.nip || "-"}
                                            </TableCell>
                                            <TableCell className="font-bold text-emerald-950 truncate">
                                                {item.nama}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                                                    <Phone className="size-3" />
                                                    {item.no_hp || "-"}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right sticky right-0 bg-white/95 backdrop-blur-sm shadow-l">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        onClick={() => navigate(`/guru/detail/${item.id}`)}
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-emerald-600 hover:bg-emerald-100"
                                                    >
                                                        <Eye className="size-4" />
                                                    </Button>
                                                    <Button 
                                                        onClick={() => navigate(`/guru/edit/${item.id}`)} 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="text-blue-600 hover:bg-blue-50"
                                                    >
                                                        <Edit className="size-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-500 hover:bg-red-50"
                                                        onClick={() => handleDelete(item.id, item.nama)}
                                                    >
                                                        <Trash2 className="size-4" />
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