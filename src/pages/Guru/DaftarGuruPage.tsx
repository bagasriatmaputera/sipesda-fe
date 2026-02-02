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
import { Edit, Trash2, UserPlus, Phone, Eye } from "lucide-react"
import { useGuru } from "@/hooks/useGuru"
import Layout from "@/layout"
import { useNavigate } from "react-router-dom"

export default function DataGuruPage() {
    const { guru, loading, deleteGuru } = useGuru();

    const handleDelete = async (id: number, nama: string) => {
        if (confirm(`Hapus data guru ${nama}?`)) {
            await deleteGuru(id);
        }
    };

    const navigate = useNavigate()

    const btnInputGuru = () => {
        navigate('/guru/create')
    }

    return (
        <Layout>
            <div className="flex flex-col gap-4 w-full max-w-full overflow-hidden p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">Data Guru</h1>
                        <p className="text-muted-foreground text-sm">Kelola informasi tenaga pengajar Da’il Khairaat.</p>
                    </div>
                    <Button onClick={btnInputGuru} className="bg-black hover:bg-zinc-800 text-white flex gap-2 shrink-0">
                        <UserPlus className="size-4" /> Tambah Guru
                    </Button>
                </div>

                {/* Container Tabel dengan Scroll Internal */}
                <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
                    {/* Area Scroll Horizontal Khusus Tabel */}
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[800px] table-fixed">
                            {/* min-w-[800px] memastikan kolom tidak terlalu sempit di layar kecil */}
                            <TableHeader className="bg-zinc-50">
                                <TableRow>
                                    <TableHead className="w-[80px]">Photo</TableHead>
                                    <TableHead className="w-[150px]">NIP</TableHead>
                                    <TableHead className="min-w-[200px]">Nama Guru</TableHead>
                                    <TableHead className="w-[180px]">No. HP</TableHead>
                                    <TableHead className="text-right w-[100px] sticky right-0 bg-zinc-50">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                            Menghubungkan ke API...
                                        </TableCell>
                                    </TableRow>
                                ) : guru.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                            Belum ada data guru.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    guru.map((item: any, index: number) => (
                                        <TableRow key={item.id ?? index} className="hover:bg-zinc-50/50">
                                            <TableCell>
                                                <Avatar className="h-10 w-10 border shadow-sm">
                                                    <AvatarImage src={`http://127.0.0.1:8000/storage/${item.photo}`} alt={item.nama} className="object-cover" />
                                                    <AvatarFallback className="bg-zinc-100 text-xs font-bold text-zinc-500">
                                                        {item.nama?.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell className="font-mono text-sm text-zinc-600">
                                                {item.nip || "-"}
                                            </TableCell>
                                            <TableCell className="font-medium text-zinc-900 truncate">
                                                {item.nama}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-sm text-zinc-600">
                                                    <Phone className="size-3" />
                                                    {item.no_hp || "-"}
                                                </div>
                                            </TableCell>
                                            {/* Sticky Action agar tombol selalu terlihat di monitor saat scroll tabel */}
                                            <TableCell className="text-right sticky right-0 bg-white/90 backdrop-blur-sm shadow-l">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        onClick={() => navigate(`/guru/detail/${item.id}`)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200 hover:bg-blue-50"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye className="size-4 text-blue-600" />
                                                    </Button>
                                                    <Button onClick={()=>{navigate(`/guru/edit/${item.id}`)}} variant="outline" size="sm" className="h-8 w-8 p-0 border-zinc-200">
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