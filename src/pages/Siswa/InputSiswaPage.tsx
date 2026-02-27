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

export default function InputSiswaPage() {
    const { storeSiswa } = useSiswa();
    const [isLoading, setIsLoading] = useState(false);
    const { kelas } = useKelas();

    const [rows, setRows] = useState([{ rowId: Date.now(), nis: "", nama: "", kelas_id: "", nama_wali: "", no_hp_wali: "", photo: null }]);

    const addRow = () => setRows([...rows, { rowId: Date.now(), nis: "", nama: "", kelas_id: "", nama_wali: "", no_hp_wali: "", photo: null }]);
    const removeRow = (id: number) => rows.length > 1 && setRows(rows.filter(r => r.rowId !== id));
    const handleInputChange = (id: number, field: string, value: any) => setRows(rows.map(r => r.rowId === id ? { ...r, [field]: value } : r));

    const handleSubmit = async () => {
        if (rows.some(r => !r.nama || !r.nis)) return toast.error("NIS dan Nama wajib diisi.");
        try {
            setIsLoading(true);
            const formData = new FormData();
            rows.forEach((row, i) => {
                formData.append(`${i}[nis]`, row.nis);
                formData.append(`${i}[nama]`, row.nama);
                formData.append(`${i}[kelas_id]`, row.kelas_id);
                formData.append(`${i}[nama_wali]`, row.nama_wali);
                formData.append(`${i}[no_hp_wali]`, row.no_hp_wali);
                if (row.photo) formData.append(`${i}[photo]`, row.photo);
            });
            await storeSiswa(formData);
            toast.success("Database siswa berhasil diperbarui.");
            setRows([{ rowId: Date.now(), nis: "", nama: "", kelas_id: "", nama_wali: "", no_hp_wali: "", photo: null }]);
        } catch (error) { toast.error("Gagal menyimpan data."); } finally { setIsLoading(false); }
    };

    return (
        <Layout>
            <div className="p-6 space-y-6 bg-emerald-50/10 min-h-screen">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-emerald-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-emerald-950">Input Massal</h1>
                        <p className="text-emerald-600 font-medium flex items-center gap-2"><Info className="size-4" /> Masukkan data beberapa siswa sekaligus.</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button onClick={addRow} variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-6 font-bold"><Plus className="size-4 mr-2" /> Baris</Button>
                        <Button onClick={handleSubmit} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 shadow-lg shadow-emerald-200">
                            {isLoading ? <Loader2 className="animate-spin size-4 mr-2" /> : <Save className="size-4 mr-2" />} Simpan Database
                        </Button>
                    </div>
                </div>

                <div className="border border-emerald-100 rounded-2xl bg-white shadow-xl overflow-hidden">
                    <Table>
                        <TableHeader className="bg-emerald-900">
                            <TableRow className="hover:bg-emerald-900 border-none">
                                <TableHead className="text-white font-bold">Nama Siswa</TableHead>
                                <TableHead className="text-white font-bold w-[150px]">NIS</TableHead>
                                <TableHead className="text-white font-bold w-[180px]">Kelas</TableHead>
                                <TableHead className="text-white font-bold">Wali Murid</TableHead>
                                <TableHead className="text-white font-bold">No. WA</TableHead>
                                <TableHead className="text-white font-bold">Foto</TableHead>
                                <TableHead className="text-white text-center font-bold">Hapus</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.rowId} className="border-emerald-50 hover:bg-emerald-50/30 transition-colors">
                                    <TableCell><Input placeholder="Contoh: Ahmad" className="border-emerald-100 focus:ring-emerald-500" value={row.nama} onChange={e => handleInputChange(row.rowId, "nama", e.target.value)} /></TableCell>
                                    <TableCell><Input placeholder="NIS" className="border-emerald-100" value={row.nis} onChange={e => handleInputChange(row.rowId, "nis", e.target.value)} /></TableCell>
                                    <TableCell>
                                        <NativeSelect className="border-emerald-100" value={row.kelas_id} onChange={e => handleInputChange(row.rowId, "kelas_id", e.target.value)}>
                                            <option value="">Pilih...</option>
                                            {kelas.map(k => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
                                        </NativeSelect>
                                    </TableCell>
                                    <TableCell><Input placeholder="Nama Wali" className="border-emerald-100" value={row.nama_wali} onChange={e => handleInputChange(row.rowId, "nama_wali", e.target.value)} /></TableCell>
                                    <TableCell><Input placeholder="08xx" className="border-emerald-100" value={row.no_hp_wali} onChange={e => handleInputChange(row.rowId, "no_hp_wali", e.target.value)} /></TableCell>
                                    <TableCell><Input type="file" className="text-[10px] border-emerald-100" onChange={e => handleInputChange(row.rowId, "photo", e.target.files?.[0])} /></TableCell>
                                    <TableCell className="text-center"><Button variant="ghost" onClick={() => removeRow(row.rowId)} className="text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="size-4" /></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Layout>
    );
}