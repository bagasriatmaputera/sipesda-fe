import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Info, Plus, Loader2, PlusCircle, AlertTriangle, Settings2, Save } from "lucide-react"
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
        deleteBobotRule,
        storeBobotRule,
        bobotRule,
        loading,
        tahap,
        kriteria,
        updateKriteria,
        updateBobotRule,
        updateTahap
    } = useSAW();

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [isEditingKriteria, setIsEditingKriteria] = useState<number | null>(null);
    const [isEditingBobot, setIsEditingBobot] = useState<number | null>(null);
    const [isEditingTahap, setIsEditingTahap] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        tahap_id: "",
        kriteria_id: "",
        bobot: ""
    });
    const [kriteriaFormData, setKriteriaFormData] = useState({
        nama: "",
        kode: ""
    });
    const [bobotFormData, setBobotFormData] = useState({
        tahap_id: "",
        kriteria_id: "",
        bobot: ""
    });
    const [tahapFormData, setTahapFormData] = useState({
        nama: "",
        kode: "",
        deskripsi: ""
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
            } catch (error) {
                toast.error("Gagal menghapus data");
            } finally {
                setIsDeleting(null);
            }
        }
    };

    const handleEditKriteria = (item: any) => {
        setIsEditingKriteria(item.id);
        setKriteriaFormData({
            nama: item.nama,
            kode: item.kode
        });
    };

    const handleSaveKriteria = async (id: number) => {
        if (!kriteriaFormData.nama || !kriteriaFormData.kode) {
            toast.error("Nama dan kode kriteria wajib diisi");
            return;
        }

        try {
            const data = new FormData();
            data.append("nama", kriteriaFormData.nama);
            data.append("kode", kriteriaFormData.kode);
            
            await updateKriteria(id, data);
            setIsEditingKriteria(null);
        } catch (error: any) {
            // toast.error(error.response?.data?.message || "Gagal memperbarui kriteria");
            console.error("Gagal memperbarui kriteria", error);
        }
    };

    const handleCancelEditKriteria = () => {
        setIsEditingKriteria(null);
        setKriteriaFormData({ nama: "", kode: "" });
    };

    const handleEditBobot = (item: any) => {
        setIsEditingBobot(item.id);
        setBobotFormData({
            tahap_id: item.tahap_id?.toString() || "",
            kriteria_id: item.kriteria_id?.toString() || "",
            bobot: item.bobot?.toString() || ""
        });
    };

    const handleSaveBobot = async (id: number) => {
        // if (!bobotFormData.tahap_id || !bobotFormData.kriteria_id || !bobotFormData.bobot) {
        //     toast.error("Semua field bobot wajib diisi");
        //     return;
        // }

        try {
            const data = new FormData();
            data.append("tahap_id", bobotFormData.tahap_id);
            data.append("kriteria_id", bobotFormData.kriteria_id);
            data.append("bobot", bobotFormData.bobot);
            
            await updateBobotRule(id, data);
            setIsEditingBobot(null);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Gagal memperbarui bobot");
        }
    };

    const handleCancelEditBobot = () => {
        setIsEditingBobot(null);
        setBobotFormData({ tahap_id: "", kriteria_id: "", bobot: "" });
    };

    const handleEditTahap = (item: any) => {
        setIsEditingTahap(item.id);
        setTahapFormData({
            nama: item.nama,
            kode: item.kode,
            deskripsi: item.deskripsi || ""
        });
    };

    const handleSaveTahap = async (id: number) => {
        if (!tahapFormData.nama || !tahapFormData.kode) {
            toast.error("Nama dan kode tahap wajib diisi");
            return;
        }

        try {
            const data = new FormData();
            data.append("nama", tahapFormData.nama);
            data.append("kode", tahapFormData.kode);
            if (tahapFormData.deskripsi) {
                data.append("deskripsi", tahapFormData.deskripsi);
            }
            
            await updateTahap(id, data);
            setIsEditingTahap(null);
        } catch (error: any) {
            // Toast error sudah ada di hooks
            console.error("Gagal memperbarui tahap", error);
        }
    };

    const handleCancelEditTahap = () => {
        setIsEditingTahap(null);
        setTahapFormData({ nama: "", kode: "", deskripsi: "" });
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
                                            <TableCell className="font-bold text-emerald-900">
                                                {isEditingKriteria === item.id ? (
                                                    <Input
                                                        value={kriteriaFormData.nama}
                                                        onChange={(e) => setKriteriaFormData(prev => ({ ...prev, nama: e.target.value }))}
                                                        className="h-8 text-sm"
                                                        placeholder="Nama kriteria"
                                                    />
                                                ) : (
                                                    item.nama
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {isEditingKriteria === item.id ? (
                                                    <Input
                                                        value={kriteriaFormData.kode}
                                                        onChange={(e) => setKriteriaFormData(prev => ({ ...prev, kode: e.target.value }))}
                                                        className="h-8 text-sm w-20 text-center"
                                                        placeholder="Kode"
                                                    />
                                                ) : (
                                                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-mono text-xs font-bold">{item.kode}</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    {isEditingKriteria === item.id ? (
                                                        <>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-green-600 hover:bg-green-50"
                                                                onClick={() => handleSaveKriteria(item.id)}
                                                            >
                                                                <Save className="size-4" />
                                                            </Button>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-red-600 hover:bg-red-50"
                                                                onClick={handleCancelEditKriteria}
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 text-emerald-600 hover:bg-emerald-50"
                                                            onClick={() => handleEditKriteria(item)}
                                                        >
                                                            <Edit className="size-4" />
                                                        </Button>
                                                    )}
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
                                            <TableCell className="font-bold text-emerald-900 leading-tight">
                                                {isEditingTahap === item.id ? (
                                                    <div className="space-y-2">
                                                        <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                            {item.nama}
                                                        </div>
                                                        <Input
                                                            value={tahapFormData.deskripsi}
                                                            onChange={(e) => setTahapFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                                                            className="h-8 text-sm text-[10px] text-emerald-500 font-normal italic"
                                                            placeholder="Deskripsi"
                                                        />
                                                    </div>
                                                ) : (
                                                    <>
                                                        {item.nama}
                                                        <p className="text-[10px] text-emerald-500 font-normal italic truncate max-w-[150px]">{item.deskripsi}</p>
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {isEditingTahap === item.id ? (
                                                    <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded font-mono">
                                                        {item.kode}
                                                    </div>
                                                ) : (
                                                    <span className="bg-emerald-900 text-white px-2 py-1 rounded font-mono text-xs font-bold">{item.kode}</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    {isEditingTahap === item.id ? (
                                                        <>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-green-600 hover:bg-green-50"
                                                                onClick={() => handleSaveTahap(item.id)}
                                                            >
                                                                <Save className="size-4" />
                                                            </Button>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-red-600 hover:bg-red-50"
                                                                onClick={handleCancelEditTahap}
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 text-emerald-600 hover:bg-emerald-50"
                                                            onClick={() => handleEditTahap(item)}
                                                        >
                                                            <Edit className="size-4" />
                                                        </Button>
                                                    )}
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
                            {/* <DialogTrigger asChild>
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200">
                                    <Plus className="size-4 mr-2" /> Atur Bobot Baru
                                </Button>
                            </DialogTrigger> */}
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
                                                {isEditingBobot === b.id ? (
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        value={bobotFormData.bobot}
                                                        onChange={(e) => setBobotFormData(prev => ({ ...prev, bobot: e.target.value }))}
                                                        className="h-8 w-20 text-center"
                                                        placeholder="Bobot"
                                                    />
                                                ) : (
                                                    <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full font-black text-sm border border-emerald-200 shadow-sm">{b.bobot}</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    {isEditingBobot === b.id ? (
                                                        <>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-green-600 hover:bg-green-50"
                                                                onClick={() => handleSaveBobot(b.id)}
                                                            >
                                                                <Save className="size-4" />
                                                            </Button>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-red-600 hover:bg-red-50"
                                                                onClick={handleCancelEditBobot}
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-emerald-600 hover:bg-emerald-50"
                                                                onClick={() => handleEditBobot(b)}
                                                            >
                                                                <Edit className="size-4" />
                                                            </Button>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="text-red-500 hover:bg-red-50" 
                                                                onClick={() => handleDeleteBobot(b.id, b.kode_tahap)} 
                                                                disabled={isDeleting === b.id}
                                                            >
                                                                {isDeleting === b.id ? <Loader2 className="animate-spin size-4" /> : <Trash2 className="size-4" />}
                                                            </Button>
                                                        </>
                                                    )}
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