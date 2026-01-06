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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, UserPlus, Phone } from "lucide-react"
import { useGuru } from "@/hooks/useGuru"
import Layout from "@/layout"
export default function DataGuruPage() {
    const { guru, loading, deleteGuru } = useGuru();

    const handleDelete = async (id: number, nama: string) => {
        if (confirm(`Hapus data guru ${nama}?`)) {
            await deleteGuru(id);
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">Data Guru</h1>
                        <p className="text-muted-foreground text-sm">Kelola informasi tenaga pengajar Da’il Khairaat.</p>
                    </div>
                    <Button className="bg-black hover:bg-zinc-800 text-white flex gap-2">
                        <UserPlus className="size-4" /> Tambah Guru
                    </Button>
                </div>

                {/* Tabel */}
                <div className="border rounded-lg bg-white">
                    <Table>
                        <TableHeader className="bg-zinc-50">
                            <TableRow>
                                <TableHead className="w-[80px]">Photo</TableHead>
                                <TableHead>NIP</TableHead>
                                <TableHead>Nama Guru</TableHead>
                                <TableHead>No. HP</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
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
                                guru.map((item: any) => (
                                    <TableRow key={item.id} className="hover:bg-zinc-50/50">
                                        <TableCell>
                                            <Avatar className="h-10 w-10 border">
                                                {/* Asumsi item.photo berisi URL gambar dari Laravel storage */}
                                                <AvatarImage src={item.photo} alt={item.nama_guru} className="object-cover" />
                                                <AvatarFallback className="bg-zinc-100 text-xs">
                                                    {item.nama_guru?.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">{item.nip || "-"}</TableCell>
                                        <TableCell className="font-medium text-zinc-900">{item.nama_guru}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm text-zinc-600">
                                                <Phone className="size-3" />
                                                {item.no_hp || "-"}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                <Edit className="size-4 text-blue-600" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => handleDelete(item.id, item.nama_guru)}
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