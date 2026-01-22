import { useState } from "react";
import Layout from "@/layout";
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
import { Info, Plus, Save, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useGuru } from "@/hooks/useGuru";
import { useKelas } from "@/hooks/useKelas";

interface GuruFormRow {
    rowId: number;
    nama_guru: string;
    nip: string;
    kelas_id: string | number;
    no_hp: string;
    photo: File | null;
}

export default function InputGuruPage() {
    const { storeGuru } = useGuru();
    const [isLoading, setIsLoading] = useState(false);

    const { kelas } = useKelas();

    const [rows, setRows] = useState<GuruFormRow[]>([
        { rowId: Date.now(), nama_guru: "", nip: "", kelas_id: "", no_hp: "", photo: null }
    ]);

    const addRow = () => {
        setRows([...rows, { rowId: Date.now(), nama_guru: "", nip: "", kelas_id: "", no_hp: "", photo: null }]);
    };

    const removeRow = (rowId: number) => {
        if (rows.length > 1) {
            setRows(rows.filter((row) => row.rowId !== rowId));
        }
    };

    const handleInputChange = (rowId: number, field: keyof GuruFormRow, value: any) => {
        setRows(rows.map((row) => (row.rowId === rowId ? { ...row, [field]: value } : row)));
    };

    const handleSubmit = async () => {
        const isInvalid = rows.some(r => !r.nama_guru);
        if (isInvalid) {
            toast.error("Nama Guru wajib diisi.");
            return;
        }

        try {
            setIsLoading(true);

            const formData = new FormData

            rows.forEach((row, index) => {
                formData.append(`${index}[nama_guru]`, row.nama_guru);
                formData.append(`${index}[nip]`, row.nama_guru);
                formData.append(`${index}[kelas_id]`, String(row.kelas_id));
                formData.append(`${index}[no_hp]`, row.no_hp);
                if (row.photo) {
                    formData.append(`${index}[photo]`, row.photo);
                }
            });

            await storeGuru(formData);

            toast.success("Berhasil menyimpan data guru.");
            setRows([{ rowId: Date.now(), nama_guru: "", nip: "", kelas_id: "", no_hp: "", photo: null }]);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Gagal menyimpan data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full max-w-full overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Input Data Siswa</h1>
                        <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                            <Info className="size-3" /> Tambah data siswa secara massal.
                        </p>
                    </div>
                    <div className="flex w-full sm:w-auto gap-2">
                        <Button onClick={addRow} variant="outline" className="flex-1 sm:flex-none gap-2">
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

                <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[1000px] table-fixed">
                            <TableHeader className="bg-zinc-50/50">
                                <TableRow>
                                    <TableHead className="w-[25%]">Nama Lengkap</TableHead>
                                    <TableHead className="w-[15%]">NIP</TableHead>
                                    <TableHead className="w-[15%]">Kelas</TableHead>
                                    <TableHead className="w-[15%]">No. WA</TableHead>
                                    <TableHead className="w-[20%]">Foto</TableHead>
                                    <TableHead className="w-[10%] text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.rowId}>
                                        <TableCell>
                                            <Input
                                                placeholder="Nama Guru..."
                                                value={row.nama_guru}
                                                onChange={(e) => handleInputChange(row.rowId, "nama_guru", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                placeholder="NIP guru"
                                                value={row.nip}
                                                onChange={(e) => handleInputChange(row.rowId, "nip", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <NativeSelect
                                                value={row.kelas_id}
                                                onChange={(e) => handleInputChange(row.rowId, "kelas_id", e.target.value)}
                                            >
                                                <option value="">Pilih Kelas...</option>
                                                {kelas.map((k) => (
                                                    <option key={k.id} value={k.id}>{k.nama_kelas}</option>
                                                ))}
                                            </NativeSelect>
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                placeholder="0812..."
                                                value={row.no_hp}
                                                onChange={(e) => handleInputChange(row.rowId, "no_hp", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    className="text-xs"
                                                    onChange={(e) => handleInputChange(row.rowId, "photo", e.target.files?.[0] || null)}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeRow(row.rowId)}
                                                className="text-zinc-400 hover:text-red-600"
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
            </div>
        </Layout>
    );
}