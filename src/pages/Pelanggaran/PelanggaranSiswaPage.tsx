import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" // Pastikan sudah install component input shadcn
import { Edit, Trash2, UserPlus, Search } from "lucide-react" // Tambah icon Search
import { usePelanggaran } from "@/hooks/usePelanggaran"
import Layout from "@/layout"
import { useNavigate } from "react-router-dom"
import { useState } from "react" // Tambahkan useState

export default function PelanggaranSiswa() {
    // 1. Tambahkan fungsi search (asumsi hook usePelanggaran punya fungsi search)
    const { pelanggaran, loading, deletePelanggaran, fetchPelanggaran } = usePelanggaran();
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate()

    const handleDelete = async (id: number) => {
        if (confirm(`Hapus data pelanggaran ini?`)) {
            await deletePelanggaran(id);
        }
    };

    const btnInputPelanggaran = () => {
        navigate('/pelanggaran/input-pelanggaran')
    }

    return (
        <Layout>
            <div className="flex flex-col gap-4 w-full max-w-full overflow-hidden">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">Data Pelanggaran Siswa</h1>
                        <p className="text-muted-foreground text-sm">Kelola Pelanggaran Siswa.</p>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        {/* 3. Form Input Search */}
                        <form className="relative flex-1 md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                            <Input
                                type="search"
                                placeholder="Cari nama atau NIS..."
                                className="pl-9 bg-white"
                                value={keyword}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setKeyword(val);
                                    if (val.length === 0) {
                                        fetchPelanggaran("");
                                    }
                                    else if (val.length >= 3) {
                                        fetchPelanggaran(val);
                                    }
                                }}
                            />
                        </form>

                        <Button onClick={btnInputPelanggaran} className="bg-black hover:bg-zinc-800 text-white flex gap-2 shrink-0">
                            <UserPlus className="size-4" /> <span className="hidden sm:inline">Input Pelanggaran</span>
                        </Button>
                    </div>
                </div>

                {/* Container Tabel */}
                <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[1100px] table-fixed">
                            <TableHeader className="bg-zinc-50">
                                <TableRow>
                                    <TableHead className="w-[180px]">Siswa</TableHead>
                                    <TableHead className="w-[180px]">Guru</TableHead>
                                    <TableHead className="w-[300px]">Jenis Pelanggaran</TableHead>
                                    <TableHead className="w-[120px]">Tanggal</TableHead>
                                    <TableHead className="w-[80px]">Poin</TableHead>
                                    <TableHead className="w-[200px]">Keterangan</TableHead>
                                    <TableHead className="text-right w-[100px] sticky right-0 bg-zinc-50 shadow-l">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={7} className="text-center py-10">Memuat...</TableCell></TableRow>
                                ) : pelanggaran.length === 0 ? (
                                    <TableRow><TableCell colSpan={7} className="text-center py-10">Data tidak ditemukan.</TableCell></TableRow>
                                ) : (
                                    pelanggaran.map((item: any, index: number) => (
                                        <TableRow key={item.id ?? index}>
                                            <TableCell className="truncate font-medium">{item.siswa?.nama}</TableCell>
                                            <TableCell className="truncate">{item.guru?.nama}</TableCell>
                                            <TableCell>
                                                <p className="line-clamp-2 text-xs leading-relaxed">
                                                    {item.pelanggaran?.nama}
                                                </p>
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">{item.tanggal}</TableCell>
                                            <TableCell className="font-bold text-red-600">{item.poin}</TableCell>
                                            <TableCell className="truncate text-zinc-500 italic text-xs">{item.keterangan || '-'}</TableCell>

                                            <TableCell className="text-right space-x-2 sticky right-0 bg-white shadow-l">
                                                <div className="flex justify-end gap-1">
                                                    <Button onClick={() => { navigate(`/pelanggaran/${item.id}`) }} variant="outline" size="sm" className="h-8 w-8 p-0"><Edit className="size-4" /></Button>
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(item.id)}><Trash2 className="size-4 text-red-600" /></Button>
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