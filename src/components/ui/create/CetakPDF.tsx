import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CetakPDF = ({ data }: { data: any }) => {
  const { nama, nis, kelas, nama_wali, total_poin, tindakan_disiplin, pelanggaran } = data;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white text-black print:p-0">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold uppercase">Madrasah Tsanawiyah Da'il Khairaat</h1>
        <p className="text-sm">Jl. Peta Barat No 110 B Pegadungan Kalideres Jakarta Barat</p>
        <Separator className="my-2 bg-black h-[2px]" />
        <h2 className="text-lg font-bold mt-4 underline decoration-2 underline-offset-4">
          DAFTAR POIN SISWA PERIODE 2025/2026
        </h2>
      </div>

      {/* Informasi Siswa */}
      <div className="grid grid-cols-1 gap-1 mb-6 text-sm">
        <div className="flex">
          <span className="w-32 font-medium">Nama</span>
          <span className="mr-2">:</span>
          <span className="font-bold uppercase">{nama}</span>
        </div>
        <div className="flex">
          <span className="w-32 font-medium">NIS</span>
          <span className="mr-2">:</span>
          <span>{nis}</span>
        </div>
        <div className="flex">
          <span className="w-32 font-medium">Kelas</span>
          <span className="mr-2">:</span>
          <span>{kelas}</span>
        </div>
        <div className="flex">
          <span className="w-32 font-medium">Nama Orang Tua</span>
          <span className="mr-2">:</span>
          <span>{nama_wali}</span>
        </div>
      </div>

      {/* Tabel Pelanggaran */}
      <div className="border border-black">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-b-black hover:bg-transparent">
              <TableHead className="text-center font-bold text-black border-r border-black w-32 uppercase">Tanggal</TableHead>
              <TableHead className="text-center font-bold text-black border-r border-black w-20 uppercase">Kode</TableHead>
              <TableHead className="font-bold text-black border-r border-black uppercase">Jenis Pelanggaran</TableHead>
              <TableHead className="text-center font-bold text-black w-24 uppercase">Skor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pelanggaran.map((item: any) => (
              <TableRow key={item.id} className="border-b-black hover:bg-transparent">
                <TableCell className="text-center border-r border-black">{item.tanggal}</TableCell>
                <TableCell className="text-center border-r border-black">{item.jenis_pelanggaran.id}</TableCell>
                <TableCell className="border-r border-black">{item.jenis_pelanggaran.nama}</TableCell>
                <TableCell className="text-center font-medium">{item.poin}</TableCell>
              </TableRow>
            ))}
            {/* Row Kosong untuk estetika jika data sedikit */}
            {[...Array(Math.max(0, 5 - pelanggaran.length))].map((_, i) => (
              <TableRow key={i} className="border-b-black h-10 hover:bg-transparent">
                <TableCell className="border-r border-black" />
                <TableCell className="border-r border-black" />
                <TableCell className="border-r border-black" />
                <TableCell />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary Section */}
      <div className="mt-4 border border-black p-4 text-sm space-y-2">
        <div className="flex">
          <span className="w-40 font-bold">JUMLAH POINT</span>
          <span>: {total_poin}</span>
        </div>
        <div className="flex">
          <span className="w-40 font-bold">TINGKAT</span>
          <span className="capitalize">: {pelanggaran[0]?.jenis_pelanggaran?.tingkat || '-'}</span>
        </div>
        <div className="flex">
          <span className="w-40 font-bold">TINDAKAN DISIPLIN</span>
          <span className="flex-1">: {tindakan_disiplin?.tahap?.deskripsi || 'Peringatan Lisan'}</span>
        </div>
      </div>

      {/* Tombol Cetak (Hanya tampil di layar) */}
      <div className="mt-8 flex justify-end print:hidden">
        <button 
          onClick={() => window.print()}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-zinc-800 transition-colors"
        >
          Cetak Laporan
        </button>
      </div>
    </div>
  );
};

export default CetakPDF;