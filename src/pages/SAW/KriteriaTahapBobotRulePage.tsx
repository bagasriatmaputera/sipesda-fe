import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Info, Plus, Loader2, PlusCircle, AlertTriangle, Settings2 } from "lucide-react"
import Layout from "@/layout"
import { useSAW } from "@/hooks/useSaw"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
    DialogClose,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { NativeSelect } from "@/components/ui/native-select"

export default function KriteriaTahapBobotRulePage() {
    const {
        deleteKriteria,
        deleteTahap,
        storeBobotRule,
        bobotRule,
        loading,
        deleteBobotRule,
        tahap,
        kriteria
    } = useSAW();

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        tahap_id: "",
        kriteria_id: "",
        bobot: ""
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.tahap_id || !formData.kriteria_id || !formData.bobot) {
            toast.error("Semua field wajib diisi.");
            return;
        }

        try {
            setIsLoading(true);
            await storeBobotRule(formData);
            toast.success("Bobot rule berhasil disimpan.");
            setFormData({ tahap_id: "", kriteria_id: "", bobot: "" });
        } catch (error: any) {
            toast.error("Gagal menyimpan bobot.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteBobot = async (id: number, kode_tahap: string) => {
        if (window.confirm(`Hapus data bobot ${kode_tahap}?`)) {
            try {
                setIsDeleting(id);
                await deleteBobotRule(id);
                toast.success("Data bobot berhasil dihapus");
            } catch (error) {
                toast.error("Gagal menghapus data");
            } finally {
                setIsDeleting(null);
            }
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-10 bg-emerald-50/10 min-h-screen">
                {/* Header Utama */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-emerald-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-emerald-950 tracking-tight">Konfigurasi SAW</h1>
                        <p className="text-emerald-600 font-medium">Pengaturan parameter perhitungan Simple Additive Weighting.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Bagian Kriteria */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Settings2 className="text-emerald-600 size-5" />
                            <h3 className="text-lg font-bold text-emerald-900">Kriteria Penilaian</h3>
                        </div>
                        <div className="border border-emerald-100 rounded-2xl bg-white shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader className="bg-emerald-600">
                                    <TableRow className="hover:bg-emerald-600 border-none">
                                        <TableHead className="w-[60px] text-white font-bold text-center">No</TableHead>
                                        <TableHead className="text-white font-bold">Nama Kriteria</TableHead>
                                        <TableHead className="text-white font-bold text-center">Kode</TableHead>
                                        <TableHead className="text-right text-white font-bold w-[100px]">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? <TableRow><TableCell colSpan={4} className="text-center py-10"><Loader2 className="animate-spin mx-auto text-emerald-600" /></TableCell></TableRow> :
                                    kriteria.map((item: any, index: number) => (
                                        <TableRow key={item.id} className="hover:bg-emerald-50/50 border-emerald-50">
                                            <TableCell className="text-center font-bold text-emerald-300">{index + 1}</TableCell>
                                            <TableCell className="font-bold text-emerald-900">{item.nama}</TableCell>
                                            <TableCell className="text-center"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-mono text-xs font-bold">{item.kode}</span></TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600"><Edit className="size-4" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Bagian Tahap */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="text-emerald-600 size-5" />
                            <h3 className="text-lg font-bold text-emerald-900">Tahapan Sanksi</h3>
                        </div>
                        <div className="border border-emerald-100 rounded-2xl bg-white shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader className="bg-emerald-600">
                                    <TableRow className="hover:bg-emerald-600 border-none">
                                        <TableHead className="w-[60px] text-white font-bold text-center">No</TableHead>
                                        <TableHead className="text-white font-bold">Nama Tahap</TableHead>
                                        <TableHead className="text-white font-bold text-center">Kode</TableHead>
                                        <TableHead className="text-right text-white font-bold w-[100px]">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? <TableRow><TableCell colSpan={4} className="text-center py-10"><Loader2 className="animate-spin mx-auto text-emerald-600" /></TableCell></TableRow> :
                                    tahap.map((item: any, index: number) => (
                                        <TableRow key={item.id} className="hover:bg-emerald-50/50 border-emerald-50">
                                            <TableCell className="text-center font-bold text-emerald-300">{index + 1}</TableCell>
                                            <TableCell className="font-bold text-emerald-900 leading-tight">{item.nama}<p className="text-[10px] text-emerald-500 font-normal italic truncate max-w-[150px]">{item.deskripsi}</p></TableCell>
                                            <TableCell className="text-center"><span className="bg-emerald-900 text-white px-2 py-1 rounded font-mono text-xs font-bold">{item.kode}</span></TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600"><Edit className="size-4" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

                {/* Bagian Bobot Rule */}
                <div className="space-y-6 pt-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <PlusCircle className="text-emerald-600 size-5" />
                            <h3 className="text-xl font-black text-emerald-950">Aturan Bobot (Matrix)</h3>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200">
                                    <Plus className="size-4 mr-2" /> Atur Bobot Baru
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] border-emerald-100">
                                <DialogHeader>
                                    <DialogTitle className="text-emerald-900 font-black">Tambah Aturan Bobot</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                                    <div className="grid gap-2">
                                        <Label className="text-emerald-800">Tahap Sanksi</Label>
                                        <NativeSelect className="border-emerald-100" value={formData.tahap_id} onChange={e => handleChange("tahap_id", e.target.value)}>
                                            <option value="">Pilih Tahap...</option>
                                            {tahap.map(t => <option key={t.id} value={t.id}>{t.kode} - {t.nama}</option>)}
                                        </NativeSelect>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-emerald-800">Kriteria</Label>
                                        <NativeSelect className="border-emerald-100" value={formData.kriteria_id} onChange={e => handleChange("kriteria_id", e.target.value)}>
                                            <option value="">Pilih Kriteria...</option>
                                            {kriteria.map(k => <option key={k.id} value={k.id}>{k.kode} - {k.nama}</option>)}
                                        </NativeSelect>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-emerald-800">Nilai Bobot (0.01 - 1.00)</Label>
                                        <Input type="number" step="0.01" className="border-emerald-100" value={formData.bobot} onChange={e => handleChange("bobot", e.target.value)} placeholder="Misal: 0.40" />
                                    </div>
                                    <DialogFooter className="pt-4">
                                        <DialogClose asChild><Button variant="ghost" className="text-emerald-600">Batal</Button></DialogClose>
                                        <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">{isLoading ? "Menyimpan..." : "Simpan Aturan"}</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="bg-emerald-900 text-emerald-50 p-4 rounded-2xl flex items-start gap-3 shadow-md">
                        <Info className="size-5 shrink-0 mt-0.5 text-emerald-400" />
                        <p className="text-sm font-medium">
                            <span className="font-black text-white mr-1">Penting:</span> 
                            Jumlah total bobot untuk semua kriteria pada satu tahap yang sama <b>harus berjumlah 1.0</b> agar hasil normalisasi matrix SAW valid.
                        </p>
                    </div>

                    <div className="border border-emerald-100 rounded-2xl bg-white shadow-xl overflow-hidden">
                        <Table className="w-full min-w-[700px]">
                            <TableHeader className="bg-emerald-50">
                                <TableRow className="border-emerald-100">
                                    <TableHead className="w-[300px] font-black text-emerald-900">Grup Tahap</TableHead>
                                    <TableHead className="text-center font-black text-emerald-900">Kriteria</TableHead>
                                    <TableHead className="text-center font-black text-emerald-900">Nilai Bobot</TableHead>
                                    <TableHead className="text-right font-black text-emerald-900">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? <TableRow><TableCell colSpan={4} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-emerald-600" /></TableCell></TableRow> :
                                Object.values(bobotRule.reduce((acc: any, item: any) => {
                                    if (!acc[item.kode_tahap]) acc[item.kode_tahap] = { kode: item.kode_tahap, nama: item.nama_tahap, kriteria: [] };
                                    acc[item.kode_tahap].kriteria.push(item);
                                    return acc;
                                }, {})).map((group: any) => (
                                    group.kriteria.map((b: any, idx: number) => (
                                        <TableRow key={b.id} className="hover:bg-emerald-50/30 border-emerald-50">
                                            {idx === 0 && (
                                                <TableCell rowSpan={group.kriteria.length} className="bg-emerald-50/50 border-r border-emerald-100 align-top pt-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-emerald-900 font-black text-lg leading-none">{group.kode}</span>
                                                        <span className="text-emerald-600 text-xs font-bold mt-1">{group.nama}</span>
                                                    </div>
                                                </TableCell>
                                            )}
                                            <TableCell className="text-center font-mono font-bold text-emerald-700">{b.kode_kriteria}</TableCell>
                                            <TableCell className="text-center">
                                                <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full font-black text-sm border border-emerald-200 shadow-sm">{b.bobot}</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleDeleteBobot(b.id, b.kode_tahap)} disabled={isDeleting === b.id}>
                                                        {isDeleting === b.id ? <Loader2 className="animate-spin size-4" /> : <Trash2 className="size-4" />}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}