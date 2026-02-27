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
import { Info, Plus, Save, Trash2, Loader2 } from "lucide-react";
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
            const formData = new FormData();

            rows.forEach((row, index) => {
                formData.append(`${index}[nama_guru]`, row.nama_guru);
                formData.append(`${index}[nip]`, row.nip);
                formData.append(`${index}[kelas_id]`, String(row.kelas_id));
                formData.append(`${index}[no_hp]`, row.no_hp);
                if (row.photo) {
                    formData.append(`${index}[photo]`, row.photo);
                }
            });

            await storeGuru(formData);
            toast.success("Berhasil menyimpan database guru.");
            setRows([{ rowId: Date.now(), nama_guru: "", nip: "", kelas_id: "", no_hp: "", photo: null }]);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Gagal menyimpan data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-6 bg-emerald-50/10 min-h-screen w-full max-w-full overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-emerald-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-emerald-950">Input Massal Guru</h1>
                        <p className="text-emerald-600 font-medium flex items-center gap-2 mt-1">
                            <Info className="size-4" /> Masukkan data tenaga pengajar secara kolektif.
                        </p>
                    </div>
                    <div className="flex w-full sm:w-auto gap-2">
                        <Button 
                            onClick={addRow} 
                            variant="outline" 
                            className="flex-1 sm:flex-none border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold gap-2"
                        >
                            <Plus className="size-4" /> Tambah Baris
                        </Button>
                        <Button
                            className="flex-1 sm:flex-none bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 gap-2"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                            {isLoading ? "Menyimpan..." : "Simpan Database"}
                        </Button>
                    </div>
                </div>

                <div className="border border-emerald-100 rounded-2xl bg-white shadow-xl overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[1000px] table-fixed">
                            <TableHeader className="bg-emerald-900">
                                <TableRow className="hover:bg-emerald-900 border-none">
                                    <TableHead className="text-white font-bold w-[25%]">Nama Lengkap</TableHead>
                                    <TableHead className="text-white font-bold w-[15%]">NIP</TableHead>
                                    <TableHead className="text-white font-bold w-[180px]">Wali Kelas</TableHead>
                                    <TableHead className="text-white font-bold w-[15%]">No. WhatsApp</TableHead>
                                    <TableHead className="text-white font-bold w-[20%] text-center">Foto Profil</TableHead>
                                    <TableHead className="text-white font-bold w-[80px] text-center">Hapus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.rowId} className="border-emerald-50 hover:bg-emerald-50/30 transition-colors">
                                        <TableCell>
                                            <Input
                                                placeholder="Nama Lengkap Guru..."
                                                className="border-emerald-100 focus:ring-emerald-500"
                                                value={row.nama_guru}
                                                onChange={(e) => handleInputChange(row.rowId, "nama_guru", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                placeholder="NIP/NIK"
                                                className="border-emerald-100"
                                                value={row.nip}
                                                onChange={(e) => handleInputChange(row.rowId, "nip", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <NativeSelect
                                                className="border-emerald-100"
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
                                                className="border-emerald-100"
                                                value={row.no_hp}
                                                onChange={(e) => handleInputChange(row.rowId, "no_hp", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="text-[10px] border-emerald-100 cursor-pointer"
                                                onChange={(e) => handleInputChange(row.rowId, "photo", e.target.files?.[0] || null)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeRow(row.rowId)}
                                                className="text-red-400 hover:text-red-600 hover:bg-red-50"
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