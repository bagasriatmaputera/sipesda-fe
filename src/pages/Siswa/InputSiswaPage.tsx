import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useKelas } from "@/hooks/useKelas";
import { useSiswa } from "@/hooks/useSiswa";
import Layout from "@/layout";
import { Info, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SiswaFormRow {
    rowId: number;
    nis: number;
    photo: File | null;
    nama: string;
    kelas_id: number;
    nama_wali: string;
    no_hp_wali: number;
}

export default function InputSiswaPage() {
    const { storeSiswa } = useSiswa();
    const [isLoading, setIsLoading] = useState(false);

    const { kelas } = useKelas();

    const [rows, setRows] = useState<SiswaFormRow[]>([
        { rowId: Date.now(), nis: 0, nama: "", kelas_id: 0, nama_wali: "", no_hp_wali: 0, photo: null }
    ]);

    const addRow = () => {
        setRows([...rows, { rowId: Date.now(), nis: 0, nama: "", kelas_id: 0, nama_wali: "", no_hp_wali: 0, photo: null }]);
    };

    const removeRow = (rowId: number) => {
        if (rows.length > 1) {
            setRows(rows.filter((row) => row.rowId !== rowId));
        }
    };

    const handleInputChange = (rowId: number, field: keyof SiswaFormRow, value: any) => {
        setRows(rows.map((row) => (row.rowId === rowId ? { ...row, [field]: value } : row)));
    };

    const handleSubmit = async () => {
        const isInvalid = rows.some(r => !r.nama || !r.nama_wali || !r.nis || !r.no_hp_wali);
        if (isInvalid) {
            toast.error("Nama siswa, wali, nomor serta nis wajib diisi.");
            return;
        }

        try {
            setIsLoading(true);

            const formData = new FormData;

            rows.forEach((row, index) => {
                formData.append(`${index}[nis]`, String(row.nis));
                formData.append(`${index}[nama]`, row.nama);
                formData.append(`${index}[kelas_id]`, String(row.kelas_id));
                formData.append(`${index}[nama_wali]`, row.nama_wali);
                formData.append(`${index}[no_hp_wali]`, String(row.no_hp_wali));
                if (row.photo) {
                    formData.append(`${index}[photo]`, row.photo);
                }
            });

            await storeSiswa(formData);

            toast.success("Berhasil menyimpan data guru.");
        setRows([{ rowId: Date.now(), nis: 0, nama: "", kelas_id: 0, nama_wali: "", no_hp_wali: 0, photo: null }]);
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
                                    <TableHead className="w-[25%]">Nama Siswa</TableHead>
                                    <TableHead className="w-[15%]">NIS</TableHead>
                                    <TableHead className="w-[15%]">Kelas</TableHead>
                                    <TableHead className="w-[15%]">Nama Wali</TableHead>
                                    <TableHead className="w-[15%]">Nomor WA Wali</TableHead>
                                    <TableHead className="w-[20%]">Foto</TableHead>
                                    <TableHead className="w-[10%] text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.rowId}>
                                        <TableCell>
                                            <Input
                                                placeholder="Nama Siswa..."
                                                value={row.nama}
                                                onChange={(e) => handleInputChange(row.rowId, "nama", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                placeholder="NIS siswa"
                                                value={row.nis}
                                                onChange={(e) => handleInputChange(row.rowId, "nis", e.target.value)}
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
                                                placeholder="Nama wali..."
                                                value={row.nama_wali}
                                                onChange={(e) => handleInputChange(row.rowId, "nama_wali", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                placeholder="Nomor wa wali..."
                                                value={row.no_hp_wali}
                                                onChange={(e) => handleInputChange(row.rowId, "no_hp_wali", e.target.value)}
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