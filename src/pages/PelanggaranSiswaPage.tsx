import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, UserPlus } from "lucide-react"
import { usePelanggaran } from "@/hooks/usePelanggaran"
import Layout from "@/layout"

export default function PelanggaranSiswa() {
    const { pelanggaran, loading, deletePelanggaran } = usePelanggaran();
    const handleDelete = async (id: number, nama: string) => {
        if (confirm(`Hapus data pelanggaran ini?`)) {
            await deletePelanggaran(id);
        }
    };

    return (
        <Layout>
            {/* 1. Pembungkus Utama: Tambahkan overflow-hidden agar monitor tidak geser */}
            <div className="flex flex-col gap-4 w-full max-w-full overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">Data Pelanggaran Siswa</h1>
                        <p className="text-muted-foreground text-sm">Kelola Pelanggaran Siswa.</p>
                    </div>
                    <Button className="bg-black hover:bg-zinc-800 text-white flex gap-2 shrink-0">
                        <UserPlus className="size-4" /> Input Pelanggaran
                    </Button>
                </div>

                {/* 2. Container Tabel: overflow-hidden di sini sangat penting */}
                <div className="border rounded-lg bg-white overflow-hidden shadow-sm">

                    {/* 3. Area Scroll Internal: Inilah yang boleh geser */}
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
                                ) : (
                                    pelanggaran.map((item: any, index: number) => (
                                        <TableRow key={item.id ?? index}>
                                            <TableCell className="truncate font-medium">{item.siswa?.nama}</TableCell>
                                            <TableCell className="truncate">{item.guru?.nama}</TableCell>
                                            <TableCell>
                                                {/* Gunakan line-clamp agar teks tidak memaksa tabel melebar berlebihan */}
                                                <p className="line-clamp-2 text-xs leading-relaxed">
                                                    {item.pelanggaran?.nama}
                                                </p>
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">{item.tanggal}</TableCell>
                                            <TableCell className="font-bold text-red-600">{item.poin}</TableCell>
                                            <TableCell className="truncate text-zinc-500 italic text-xs">{item.keterangan || '-'}</TableCell>

                                            {/* Kolom Aksi yang tetap terlihat (Sticky) */}
                                            <TableCell className="text-right space-x-2 sticky right-0 bg-white shadow-l">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0"><Edit className="size-4" /></Button>
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(item.id, item.siswa?.nama)}><Trash2 className="size-4 text-red-600" /></Button>
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
