import React, { useState } from "react";
import Layout from "@/layout";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Save, Info, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSiswa } from "@/hooks/useSiswa";
import { useGuru } from "@/hooks/useGuru";
import { useJenisPelanggaran } from "@/hooks/useJenisPelanggaran";
import { usePelanggaran } from "@/hooks/usePelanggaran";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function InputPelanggaranPage() {
    const { siswa } = useSiswa();
    const { guru } = useGuru();
    const { jenisPelanggaran } = useJenisPelanggaran();
    const { storePelanggaran } = usePelanggaran();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const [rows, setRows] = useState([{ rowId: Date.now(), siswa_id: "", guru_id: "", jenis_pelanggaran_id: "", keterangan: "" }]);

    const addRow = () => setRows([...rows, { rowId: Date.now(), siswa_id: "", guru_id: "", jenis_pelanggaran_id: "", keterangan: "" }]);
    const removeRow = (id: number) => rows.length > 1 && setRows(rows.filter(r => r.rowId !== id));
    const handleInputChange = (id: number, field: string, value: string) => setRows(rows.map(r => r.rowId === id ? { ...r, [field]: value } : r));

    const handleSubmit = async () => {
        if (rows.some(r => !r.siswa_id || !r.guru_id || !r.jenis_pelanggaran_id)) {
            return toast.error("Mohon lengkapi pilihan siswa, guru, dan jenis pelanggaran.");
        }
        
        try {
            setIsLoading(true);
            const payload = rows.map(({ rowId, ...rest }) => ({
                ...rest,
                siswa_id: Number(rest.siswa_id),
                guru_id: Number(rest.guru_id),
                jenis_pelanggaran_id: Number(rest.jenis_pelanggaran_id)
            }));

            await storePelanggaran(payload);
            toast.success("Pelanggaran berhasil dicatat!");
            navigate('/pelanggaran');
        } catch (error) {
            toast.error("Gagal menyimpan data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-6 p-6 bg-emerald-50/10 min-h-screen w-full max-w-full overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-emerald-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-emerald-950 tracking-tight">Input Pelanggaran</h1>
                        <p className="text-emerald-600 font-medium flex items-center gap-2 mt-1">
                            <Info className="size-4" /> Catat pelanggaran siswa secara massal.
                        </p>
                    </div>
                    <div className="flex w-full sm:w-auto gap-2">
                        <Button onClick={addRow} variant="outline" className="flex-1 sm:flex-none border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold gap-2">
                            <Plus className="size-4" /> Baris Baru
                        </Button>
                        <Button 
                            className="flex-1 sm:flex-none bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 gap-2 px-8"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="animate-spin size-4" /> : <Save className="size-4" />}
                            {isLoading ? "Menyimpan..." : "Simpan Log"}
                        </Button>
                    </div>
                </div>

                <div className="border border-emerald-100 rounded-2xl bg-white shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table className="w-full min-w-[1000px] table-fixed">
                            <TableHeader className="bg-emerald-900">
                                <TableRow className="hover:bg-emerald-900 border-none">
                                    <TableHead className="text-white font-bold w-[220px]">Siswa Pelanggar</TableHead>
                                    <TableHead className="text-white font-bold w-[220px]">Guru Pelapor</TableHead>
                                    <TableHead className="text-white font-bold w-[200px]">Jenis Pelanggaran</TableHead>
                                    <TableHead className="text-white font-bold w-[300px]">Detail Kejadian</TableHead>
                                    <TableHead className="text-white text-center font-bold w-[80px]">Hapus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.rowId} className="hover:bg-emerald-50/30 transition-colors border-emerald-50">
                                        <TableCell>
                                            <NativeSelect className="border-emerald-100" value={row.siswa_id} onChange={e => handleInputChange(row.rowId, "siswa_id", e.target.value)}>
                                                <option value="">Pilih Siswa...</option>
                                                {siswa.map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}
                                            </NativeSelect>
                                        </TableCell>
                                        <TableCell>
                                            <NativeSelect className="border-emerald-100" value={row.guru_id} onChange={e => handleInputChange(row.rowId, "guru_id", e.target.value)}>
                                                <option value="">Pilih Guru...</option>
                                                {guru.map(g => <option key={g.id} value={g.id}>{g.nama}</option>)}
                                            </NativeSelect>
                                        </TableCell>
                                        <TableCell>
                                            <NativeSelect className="border-emerald-100" value={row.jenis_pelanggaran_id} onChange={e => handleInputChange(row.rowId, "jenis_pelanggaran_id", e.target.value)}>
                                                <option value="">Pilih Jenis...</option>
                                                {jenisPelanggaran?.map(q => <option key={q.id} value={q.id}>{q.nama_pelanggaran} ({q.poin} Poin)</option>)}
                                            </NativeSelect>
                                        </TableCell>
                                        <TableCell>
                                            <Input placeholder="Catatan detail..." className="border-emerald-100 focus:ring-emerald-500" value={row.keterangan} onChange={e => handleInputChange(row.rowId, "keterangan", e.target.value)} />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button variant="ghost" onClick={() => removeRow(row.rowId)} className="text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="size-4" /></Button>
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