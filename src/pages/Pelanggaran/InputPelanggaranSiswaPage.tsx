import React, { useState } from "react";
import Layout from "@/layout";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Save, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSiswa } from "@/hooks/useSiswa"; // Gunakan hook yang sudah dibuat
import { useGuru } from "@/hooks/useGuru";   // Gunakan hook yang sudah dibuat
import { useJenisPelanggaran } from "@/hooks/useJenisPelanggaran";
import { usePelanggaran } from "@/hooks/usePelanggaran";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface FormRow {
    rowId: number;
    siswa_id: number | string;
    guru_id: number | string;
    jenis_pelanggaran_id: number | string;
    keterangan: string;
}

export default function InputPelanggaranPage() {
    const { siswa } = useSiswa();
    const { guru } = useGuru();
    const { jenisPelanggaran } = useJenisPelanggaran();
    const { storePelanggaran } = usePelanggaran();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [rows, setRows] = useState<FormRow[]>([
        { rowId: Date.now(), siswa_id: 0, guru_id: 0, jenis_pelanggaran_id: 0, keterangan: "" }
    ]);

    const addRow = () => {
        setRows([...rows, { rowId: Date.now(), siswa_id: "", guru_id: "", jenis_pelanggaran_id: "", keterangan: "" }]);
    };

    const removeRow = (rowId: number) => {
        if (rows.length > 1) setRows(rows.filter((row) => row.rowId !== rowId));
    };

    const handleInputChange = (rowId: number, field: keyof FormRow, value: string) => {
        setRows(rows.map((row) => (row.rowId === rowId ? { ...row, [field]: value } : row)));
    };

    const handleSubmit = async () => {

        const isInvalid = rows.some(r => !r.siswa_id || !r.guru_id || !r.jenis_pelanggaran_id);

        if (isInvalid) {
            console.error("Mohon lengkapi semua pilihan siswa, guru, dan jenis pelanggaran.");
            toast.error("Mohon lengkapi semua pilihan siswa, guru, dan jenis pelanggaran.");
            return;
        }
        const payload =
            rows.map(({ rowId, ...rest }) => ({
                ...rest,
                siswa_id: Number(rest.siswa_id),
                guru_id: Number(rest.guru_id),
                jenis_pelanggaran_id: Number(rest.jenis_pelanggaran_id)
            }))
            ;

        try {
            setIsLoading(true)
            await storePelanggaran(payload)
            setRows([
                { rowId: Date.now(), siswa_id: "", guru_id: "", jenis_pelanggaran_id: "", keterangan: "" }
            ]);
            navigate('/pelanggaran')
            toast.success("Berhasil input pelanggaran siswa!");
        } catch (error) {
            console.error("gagal tambah data", error)
        }
        finally {
            setIsLoading(false)
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Input Pelanggaran Massal</h1>
                        <p className="text-muted-foreground text-sm flex items-center gap-1">
                            <Info className="size-3" /> Tambah beberapa data pelanggaran sekaligus.
                        </p>
                    </div>
                    <div className="flex w-full sm:w-auto gap-2">
                        <Button onClick={addRow} variant="outline" className="flex-1 sm:flex-none gap-2 border-zinc-300">
                            <Plus className="size-4" /> Baris
                        </Button>
                        <Button className="flex-1 sm:flex-none bg-black text-white hover:bg-zinc-800 gap-2"
                            onClick={handleSubmit}>
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Menyimpan...
                                </span>
                            ) : (
                                <>
                                    <Save className="size-4" /> Simpan
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Table Section dengan Scroll Internal */}
                <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[1000px] table-fixed">
                            <TableHeader className="bg-zinc-50/50">
                                <TableRow>
                                    <TableHead className="w-[220px]">Siswa Pelanggar</TableHead>
                                    <TableHead className="w-[220px]">Guru Pelapor</TableHead>
                                    <TableHead className="w-[200px]">Jenis Pelanggaran</TableHead>
                                    <TableHead className="w-[300px]">Keterangan/Catatan</TableHead>
                                    <TableHead className="w-[80px] text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.rowId} className="hover:bg-zinc-50/30 transition-colors">
                                        <TableCell>
                                            <NativeSelect
                                                value={row.siswa_id}
                                                onChange={(e) => handleInputChange(row.rowId, "siswa_id", e.target.value)}
                                            >
                                                <option value="">Pilih Siswa...</option>
                                                {siswa.map((s) => (
                                                    <option key={s.id} value={s.id}>{s.nama}</option>
                                                ))}
                                            </NativeSelect>
                                        </TableCell>
                                        <TableCell>
                                            <NativeSelect
                                                value={row.guru_id}
                                                onChange={(e) => handleInputChange(row.rowId, "guru_id", e.target.value)}
                                            >
                                                <option value="">Pilih Guru...</option>
                                                {guru.map((g) => (
                                                    <option key={g.id} value={g.id}>{g.nama}</option>
                                                ))}
                                            </NativeSelect>
                                        </TableCell>
                                        <TableCell>
                                            <NativeSelect
                                                value={row.jenis_pelanggaran_id}
                                                onChange={(e) => handleInputChange(row.rowId, "jenis_pelanggaran_id", e.target.value)}
                                            >
                                                <option value="">Pilih Jenis...</option>
                                                {jenisPelanggaran?.map((q) => (
                                                    <option key={q.id} value={q.id}>{q.nama_pelanggaran}</option>

                                                ))}
                                            </NativeSelect>
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                placeholder="Detail kejadian..."
                                                className="focus-visible:ring-zinc-400"
                                                value={row.keterangan}
                                                onChange={(e) => handleInputChange(row.rowId, "keterangan", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeRow(row.rowId)}
                                                className="text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="px-1 text-xs text-muted-foreground italic">
                    * Pastikan semua kolom terisi sebelum menekan tombol simpan.
                </div>
            </div>
        </Layout>
    );
}