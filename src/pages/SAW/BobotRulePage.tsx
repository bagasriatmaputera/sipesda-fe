import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Info, Plus, Loader2 } from "lucide-react"
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

export default function BobotRulePage() {
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
                        <Table className="w-full min-w-[700px] table-fixed">
                            <TableHeader className="bg-zinc-50/50">
                                <TableRow>
                                    <TableHead className="w-[100px]">Tahap</TableHead>
                                    <TableHead className="">Kode Kriteria</TableHead>
                                    <TableHead className="w-[150px]">Nilai Bobot</TableHead>
                                    <TableHead className="text-right w-[100px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12">
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <Loader2 className="size-6 animate-spin" />
                                                <span>Memuat data...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : bobotRule.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                                            Belum ada data bobot kriteria.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    bobotRule.map((item: any, index: number) => (
                                        <TableRow key={item.id ?? index} className="hover:bg-zinc-50/30 transition-colors">
                                            <TableCell className="font-mono text-sm font-semibold text-blue-600">
                                                {item.kode_tahap || "-"}
                                            </TableCell>
                                            <TableCell className="font-medium text-zinc-900">
                                                {item.kode_kriteria}
                                            </TableCell>
                                            <TableCell>
                                                <span className="bg-zinc-100 px-2 py-1 rounded text-sm font-medium">
                                                    {item.bobot || "0"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                                                        <Edit className="size-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-600 hover:bg-red-50"
                                                        onClick={() => handleDelete(item.id, item.kode_tahap)}
                                                        disabled={isDeleting === item.id}
                                                    >
                                                        {isDeleting === item.id ? (
                                                            <Loader2 className="size-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="size-4" />
                                                        )}
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
        </Layout>
    )
}