import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useJenisPelanggaran } from "@/hooks/useJenisPelanggaran";
import Layout from "@/layout";
import { Info, Plus, Save, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

// 1. Definisikan Interface di luar komponen agar rapi
interface FormRow {
    rowId: number;
    nama_pelanggaran: string;
    tingkat_pelanggaran_id: number | string;
    poin: number | string;
}

export default function InputJenisPelanggaran() {
    const { storeJenisPelanggaran } = useJenisPelanggaran();
    const [isLoading, setIsLoading] = useState(false);

    // 2. Data Master Tingkat
    const tingkatOptions = [
        { label: 'Rendah', value: 1 },
        { label: 'Sedang', value: 2 },
        { label: 'Berat', value: 3 },
    ];

    // 3. State Baris Input
    const [rows, setRows] = useState<FormRow[]>([
        { rowId: Date.now(), nama_pelanggaran: '', tingkat_pelanggaran_id: 0, poin: 0 }
    ]);

    const addRow = () => {
        setRows([...rows, { rowId: Date.now(), nama_pelanggaran: '', tingkat_pelanggaran_id: 0, poin: 0 }]);
    };

    const removeRow = (rowId: number) => {
        if (rows.length > 1) {
            setRows(rows.filter((row) => row.rowId !== rowId));
        } else {
            toast.warning("Minimal harus ada satu baris input.");
        }
    };

    const handleInputChange = (rowId: number, field: keyof FormRow, value: string) => {
        setRows(rows.map((row) => (row.rowId === rowId ? { ...row, [field]: value } : row)));
    };

    const handleSubmit = async () => {
        // 4. Validasi Input Kosong
        const isInvalid = rows.some(r => !r.nama_pelanggaran || !r.tingkat_pelanggaran_id || r.poin === "");

        if (isInvalid) {
            toast.error("Mohon lengkapi semua kolom pada tiap baris.");
            return;
        }

        if (rows.some(r => r.nama_pelanggaran === '')) {
            toast.warning('Nama pelanggaran tidak boleh ada yang kosong')
        }

        if (rows.some(r => Number(r.poin) > 100)) {
            toast.info('Poin tidak boleh lebih dari 100')
        }


        const payload = rows.map(({ rowId, ...rest }) => ({
            nama_pelanggaran: rest.nama_pelanggaran,
            tingkat_pelanggaran_id: Number(rest.tingkat_pelanggaran_id),
            poin: Number(rest.poin)
        }));

        try {
            setIsLoading(true);
            await storeJenisPelanggaran(payload);

            toast.success("Berhasil menambahkan jenis pelanggaran massal.");

            // Reset form ke satu baris kosong
            setRows([{ rowId: Date.now(), nama_pelanggaran: "", tingkat_pelanggaran_id: "", poin: "" }]);
        } catch (error: any) {
            console.error("Gagal tambah data:", error);
            toast.error(error.response?.data?.message || "Gagal menyimpan data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full max-w-full overflow-hidden">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Input Jenis Pelanggaran</h1>
                        <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                            <Info className="size-3" /> Tambah beberapa kategori pelanggaran sekaligus.
                        </p>
                    </div>
                    <div className="flex w-full sm:w-auto gap-2">
                        <Button onClick={addRow} variant="outline" className="flex-1 sm:flex-none gap-2 border-zinc-300">
                            <Plus className="size-4" /> Tambah Baris
                        </Button>
                        <Button
                            className="flex-1 sm:flex-none bg-black text-white hover:bg-zinc-800 gap-2"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                            {isLoading ? "Menyimpan..." : "Simpan Semua"}
                        </Button>
                    </div>
                </div>

                {/* Table Area */}
                <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[800px] table-fixed">
                            <TableHeader className="bg-zinc-50/50">
                                <TableRow>
                                    <TableHead className="w-[45%]">Nama Pelanggaran</TableHead>
                                    <TableHead className="w-[25%]">Tingkat Keseriusan</TableHead>
                                    <TableHead className="w-[20%]">Bobot Poin</TableHead>
                                    <TableHead className="w-[10%] text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.rowId} className="hover:bg-zinc-50/30 transition-colors">
                                        <TableCell>
                                            <Input
                                                placeholder="Misal: Terlambat masuk kelas"
                                                className="focus-visible:ring-zinc-400"
                                                value={row.nama_pelanggaran}
                                                onChange={(e) => handleInputChange(row.rowId, "nama_pelanggaran", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <NativeSelect
                                                value={row.tingkat_pelanggaran_id}
                                                onChange={(e) => handleInputChange(row.rowId, "tingkat_pelanggaran_id", e.target.value)}
                                            >
                                                <option value="">Pilih Tingkat...</option>
                                                {tingkatOptions.map((t) => (
                                                    <option key={t.value} value={t.value}>{t.label}</option>
                                                ))}
                                            </NativeSelect>
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                placeholder="between: 0.1 - 1.0"
                                                className="focus-visible:ring-zinc-400"
                                                value={row.poin}
                                                onChange={(e) => handleInputChange(row.rowId, "poin", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeRow(row.rowId)}
                                                className="text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
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

                <div className="px-1 text-xs text-muted-foreground italic bg-zinc-50 p-3 rounded-lg border border-dashed">
                    <p>💡 Tips: Gunakan tombol "Tambah Baris" untuk menginput data dalam jumlah banyak sekaligus.</p>
                </div>
            </div>
        </Layout>
    );
}