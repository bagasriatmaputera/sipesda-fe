import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Info, Plus, Loader2, PlusCircle, AlertTriangle } from "lucide-react"
import Layout from "@/layout"
import { useSAW } from "@/hooks/useSaw"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { NativeSelect } from "@/components/ui/native-select"
import { DialogTitle } from "@radix-ui/react-dialog"
export default function KriteriaTahapBobotRulePage() {
    const {
        deleteKriteria,
        deleteTahap,
        storeKriteria,
        storeTahap,
    } = useSAW();

    const handleDeleteKriteria = async (id: number, nama: string) => {
        if (confirm(`Hapus kriteria: ${nama}?`)) {
            try {
                await deleteKriteria(id);
            } catch (err) {
                tahap
                alert("Gagal menghapus kriteria");
            }
        }
    };

    const handleDeleteTahap = async (id: number, nama: string) => {
        if (confirm(`Hapus tahap: ${nama}?`)) {
            try {
                await deleteTahap(id);
            } catch (err) {
                alert("Gagal menghapus tahap");
            }
        }
    };

    // Bobot Kriteria 
    const [isLoading, setIsLoading] = useState(false)
    const { bobotRule, loading, deleteBobotRule, storeBobotRule, tahap, kriteria } = useSAW();
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

        // Validasi sederhana sebelum kirim
        if (!formData.tahap_id || !formData.kriteria_id || !formData.bobot) {
            toast.error("Semua field wajib diisi.");
            return;
        }

        try {
            setIsLoading(true);
            await storeBobotRule(formData);

            toast.success("Bobot rule berhasil disimpan.");

            // Reset form & tutup modal (jika perlu)
            setFormData({ tahap_id: "", kriteria_id: "", bobot: "" });
        } catch (error: any) {
            console.error(error.response?.data?.message || "Gagal menyimpan bobot.");
        } finally {
            setFormData({ tahap_id: "", kriteria_id: "", bobot: "" });
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number, kode_tahap: string) => {
        // Menggunakan toast untuk konfirmasi lebih baik, atau tetap confirm browser
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
            <div className="p-6 space-y-4 w-full max-w-full overflow-hidden">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">
                            Kelola Kriteria dan Tahap
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Daftar tahap sanksi dan kriteria dalam perhitungan SAW.
                        </p>
                    </div>
                    <Button
                        className="bg-black hover:bg-zinc-800 text-white flex gap-2 shrink-0 shadow-sm"
                    >
                        <PlusCircle className="size-4" /> Tambah Jenis
                    </Button>
                </div>

                {/* Tabel Kriteria */}
                <h3>Kriteria</h3>
                <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[900px] table-fixed">
                            <TableHeader className="bg-zinc-50">
                                <TableRow>
                                    <TableHead className="w-[60px] text-center">No</TableHead>
                                    <TableHead className="w-[150px]">Nama Kriteria</TableHead>
                                    <TableHead className="w-[180px]">Kode Kriteria</TableHead>
                                    <TableHead className="text-right w-[80px] sticky right-0 bg-zinc-50 shadow-l">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center py-20 text-muted-foreground"
                                        >
                                            Memuat data...
                                        </TableCell>
                                    </TableRow>
                                ) : kriteria.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center py-20 text-muted-foreground"
                                        >
                                            Belum ada data kriteria.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    kriteria.map((item: any, index: number) => (
                                        <TableRow
                                            key={item.id ?? index}
                                            className="hover:bg-zinc-50/50 transition-colors"
                                        >
                                            <TableCell className="text-center text-zinc-500 font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-medium text-zinc-900 leading-relaxed whitespace-normal break-words line-clamp-2">
                                                    {item.nama}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle className="size-3 text-zinc-400" />
                                                    <span className="font-bold">{item.kode}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right sticky right-0 bg-white/90 backdrop-blur-sm shadow-l">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200 hover:bg-zinc-50 transition-all"
                                                    >
                                                        <Edit className="size-4 text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200 hover:bg-red-50 hover:border-red-200 transition-all group"
                                                        onClick={() =>
                                                            handleDeleteKriteria(item.id, item.nama)
                                                        }
                                                    >
                                                        <Trash2 className="size-4 text-red-600 group-hover:scale-110" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Tabel Tahap */}
                <h3>Tahap</h3>
                <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[900px] table-fixed">
                            <TableHeader className="bg-zinc-50">
                                <TableRow>
                                    <TableHead className="w-auto text-center">No</TableHead>
                                    <TableHead className="w-auto">Tahap</TableHead>
                                    <TableHead className="w-auto">Kode Tahap</TableHead>
                                    <TableHead className="w-auto">Deskripsi Tahap</TableHead>
                                    <TableHead className="text-right w-[120px] sticky right-0 bg-zinc-50 shadow-l">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center py-20 text-muted-foreground"
                                        >
                                            Memuat data...
                                        </TableCell>
                                    </TableRow>
                                ) : tahap.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center py-20 text-muted-foreground"
                                        >
                                            Belum ada data tahap.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tahap.map((item: any, index: number) => (
                                        <TableRow
                                            key={item.id ?? index}
                                            className="hover:bg-zinc-50/50 transition-colors"
                                        >
                                            <TableCell className="text-center text-zinc-500 font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-medium text-zinc-900 leading-relaxed whitespace-normal break-words line-clamp-2">
                                                    {item.nama}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle className="size-3 text-zinc-400" />
                                                    <span className="font-bold">{item.kode}</span>
                                                </div>
                                            </TableCell><TableCell className="max-w-[00px]">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-sm text-zinc-700 truncate" title={item.deskripsi}>
                                                        {item.deskripsi}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right sticky right-0 bg-white/90 backdrop-blur-sm shadow-l">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200 hover:bg-zinc-50 transition-all"
                                                    >
                                                        <Edit className="size-4 text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-zinc-200 hover:bg-red-50 hover:border-red-200 transition-all group"
                                                        onClick={() =>
                                                            handleDeleteTahap(item.id, item.nama)
                                                        }
                                                    >
                                                        <Trash2 className="size-4 text-red-600 group-hover:scale-110" />
                                                    </Button>
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
            <div className="flex flex-col gap-4 w-full max-w-full overflow-hidden p-6">
                <div className="flex justify-between items-start sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">Data Bobot Rule</h1>
                        <p className="text-muted-foreground text-sm flex items-center gap-1">
                            <Info className="size-3" /> Atur bobot kriteria untuk perhitungan SAW.
                        </p>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-black hover:bg-zinc-800 text-white flex gap-2 shrink-0">
                                <Plus className="size-4" /> Tambah Bobot
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2 w-full">
                                        <Label htmlFor="tahap">Tahap</Label>
                                        <NativeSelect
                                            value={formData.tahap_id}
                                            onChange={(e) => handleChange("tahap_id", e.target.value)}
                                        >
                                            <option value="">Pilih Tahap...</option>
                                            {tahap.map((g) => (
                                                <option key={g.id} value={g.id}>{g.kode}</option>
                                            ))}
                                        </NativeSelect>
                                    </div>
                                    <div className="grid gap-2 w-full">
                                        <Label htmlFor="kriteria">Kriteria</Label>
                                        <NativeSelect
                                            value={formData.kriteria_id}
                                            onChange={(e) => handleChange("kriteria_id", e.target.value)}
                                        >
                                            <option value="">Pilih Kriteria...</option>
                                            {kriteria.map((g) => (
                                                <option key={g.id} value={g.id}>{g.kode}</option>
                                            ))}
                                        </NativeSelect>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="bobot">Nilai Bobot (0 - 1)</Label>
                                        <Input
                                            id="bobot"
                                            type="number"
                                            step="0.01"
                                            value={formData.bobot}
                                            onChange={(e) => handleChange("bobot", e.target.value)}
                                            placeholder="Contoh: 0.25"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline">Batal</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? "Menyimpan..." : "Simpan"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="px-1 text-xs text-muted-foreground italic bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start gap-2">
                    <Info className="size-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Catatan: Pastikan total bobot untuk kriteria pada tahap yang sama berjumlah 1.0 (100%) agar perhitungan SAW akurat.</span>
                </div>

                <div className="border rounded-xl bg-white overflow-hidden shadow-sm mt-2">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full min-w-[700px] border-collapse border">
                            <TableHeader className="bg-zinc-50">
                                <TableRow className="border-b">
                                    <TableHead className="w-[250px] border-r text-center font-bold">Tahap</TableHead>
                                    <TableHead className="w-[150px] border-r text-center font-bold">Kode Kriteria</TableHead>
                                    <TableHead className="border-r text-center font-bold">Nilai Bobot</TableHead>
                                    <TableHead className="text-right w-[100px] font-bold">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12">
                                            <Loader2 className="size-6 animate-spin mx-auto mb-2" />
                                            <span>Memuat data...</span>
                                        </TableCell>
                                    </TableRow>
                                ) : bobotRule.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12">Belum ada data.</TableCell>
                                    </TableRow>
                                ) : (
                                    // Logika Grouping berdasarkan kode_tahap
                                    Object.values(
                                        bobotRule.reduce((acc: any, item: any) => {
                                            if (!acc[item.kode_tahap]) {
                                                acc[item.kode_tahap] = {
                                                    kode: item.kode_tahap,
                                                    nama: item.nama_tahap || item.kode_tahap, // Gunakan nama asli dari DB
                                                    kriteria: []
                                                };
                                            }
                                            acc[item.kode_tahap].kriteria.push(item);
                                            return acc;
                                        }, {})
                                    ).map((group: any) => (
                                        group.kriteria.map((kriteria: any, idx: number) => (
                                            <TableRow key={kriteria.id} className="hover:bg-zinc-50/50 border-b">
                                                {/* Kolom Tahap hanya muncul di baris pertama setiap grup (Rowspan) */}
                                                {idx === 0 && (
                                                    <TableCell
                                                        rowSpan={group.kriteria.length}
                                                        className="border-r align-top font-medium bg-white"
                                                    >
                                                        <div className="space-y-1">
                                                            <span className="font-bold text-blue-700">{group.kode}</span>
                                                            <p className="text-xs text-zinc-600 leading-relaxed">
                                                                {group.nama}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                )}

                                                {/* Kolom Kriteria & Bobot */}
                                                <TableCell className="border-r text-center font-mono">{kriteria.kode_kriteria}</TableCell>
                                                <TableCell className="border-r text-center bg-zinc-50/30">
                                                    <span className="font-semibold">{kriteria.bobot}</span>
                                                </TableCell>

                                                {/* Kolom Aksi */}
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600">
                                                            <Edit className="size-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 text-red-600"
                                                            onClick={() => handleDelete(kriteria.id, kriteria.kode_tahap)}
                                                            disabled={isDeleting === kriteria.id}
                                                        >
                                                            {isDeleting === kriteria.id ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-4" />}
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
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
