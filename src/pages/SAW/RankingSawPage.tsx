import React, { useEffect, useState } from "react";
import Layout from "@/layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, BarChart3, AlertTriangle } from "lucide-react";
import { useSAW } from "@/hooks/useSaw";

export default function RankingSAWPage() {
    const { siswa, loading } = useSAW(); 

    const getBadgeColor = (nilai: number) => {
        const val = Number(nilai);
        if (val >= 0.75) return "bg-red-600 hover:bg-red-700 text-white";
        if (val >= 0.50) return "bg-yellow-500 hover:bg-yellow-600 text-white";
        return "bg-green-600 hover:bg-green-700 text-white";
    };

    const daftarTahap = [1, 2, 3, 4, 5];

    return (
        <Layout>
            <div className="p-6 space-y-8 w-full max-w-7xl mx-auto">
                {/* Header Page */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 flex items-center gap-3">
                        <Trophy className="size-8 text-yellow-500" />
                        Rank SAW Keputusan Hukuman Pelanggaran
                    </h1>
                    <p className="text-zinc-500">
                        Hasil perangkingan siswa berdasarkan kriteria poin, frekuensi, dan tingkat pelanggaran untuk setiap tahapan sanksi.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {daftarTahap.map((id) => {
                        const dataPerTahap = siswa.filter((item: any) => item.tahap_id === id);

                        const namaTahap = dataPerTahap.length > 0 ? dataPerTahap[0].tahap : `Tahap ${id}`;

                        return (
                            <Card key={id} className="shadow-md border-zinc-200 overflow-hidden transition-all hover:shadow-lg">
                                <CardHeader className="bg-zinc-50/50 border-b flex flex-row items-center justify-between py-4">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-bold text-blue-700 flex items-center gap-2">
                                            <BarChart3 className="size-5" />
                                            {namaTahap}
                                        </CardTitle>
                                        <CardDescription>
                                            Daftar siswa yang direkomendasikan masuk ke {namaTahap.toLowerCase()}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-white">
                                        {dataPerTahap.length} Siswa
                                    </Badge>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-zinc-50/30">
                                                    <TableHead className="w-[80px] text-center font-bold">Rank</TableHead>
                                                    <TableHead className="min-w-[250px]">Nama Siswa</TableHead>
                                                    <TableHead className="text-center">Status Tahapan</TableHead>
                                                    <TableHead className="text-right pr-8">Nilai Preferensi (V)</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {dataPerTahap.length > 0 ? (
                                                    dataPerTahap.map((item: any, index: number) => (
                                                        <TableRow key={index} className="hover:bg-zinc-50/50">
                                                            <TableCell className="text-center font-mono font-bold text-zinc-400">
                                                                #{index + 1}
                                                            </TableCell>
                                                            <TableCell className="font-semibold text-zinc-900">
                                                                <div className="flex items-center gap-2">
                                                                    <Users className="size-4 text-zinc-400" />
                                                                    {item.nama_siswa}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Badge variant="secondary" className="font-normal">
                                                                    {item.deskripsi}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-right pr-8">
                                                                <Badge className={`${getBadgeColor(item.nilai_preferensi)} font-mono px-3 py-1`}>
                                                                    {item.nilai_preferensi}
                                                                </Badge>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={4} className="h-24 text-center">
                                                            <div className="flex flex-col items-center gap-1 text-zinc-400">
                                                                <AlertTriangle className="size-5" />
                                                                <p>Tidak ada data untuk tahapan ini.</p>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}