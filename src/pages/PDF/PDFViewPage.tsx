import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/layout';
import { useSiswa } from '@/hooks/useSiswa';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Printer } from 'lucide-react';

export default function PDFViewPage() {
    const { id } = useParams();
    const { showSiswa, loading } = useSiswa();
    const [siswa, setSiswa] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            if (id) {
                const data = await showSiswa(id);
                setSiswa(data);
            }
        };
        fetchDetail();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const printContent = document.getElementById('print-content');
        if (printContent) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Daftar Poin Siswa - SIPESDA</title>
                        <style>
                            body { font-family: 'Arial', sans-serif; font-size: 11px; margin: 0; padding: 20px; }
                            .header { text-align: center; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; }
                            .header h2 { margin: 0; font-size: 14px; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 5px; }
                            
                            .info-table { width: 100%; margin-bottom: 10px; border-collapse: collapse; }
                            .info-table td { padding: 2px 0; vertical-align: top; }
                            .info-label { width: 120px; }
                            .info-separator { width: 10px; }

                            .main-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
                            .main-table th, .main-table td { border: 1px solid #000; padding: 4px; text-align: left; }
                            .main-table th { background-color: #f0f0f0; text-align: center; text-transform: uppercase; }
                            .text-center { text-align: center; }
                            
                            .summary-box { width: 100%; border: 1px solid #000; margin-top: -1px; padding: 5px; box-sizing: border-box; }
                            .summary-row { display: flex; margin-bottom: 2px; }
                            .summary-label { width: 120px; font-weight: bold; }

                            @media print {
                                body { padding: 0; }
                            }
                        </style>
                    </head>
                    <body>
                        ${printContent.innerHTML}
                    </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.print();
            }
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex h-screen w-full items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-500"></div>
                </div>
            </Layout>
        );
    }

    if (!siswa) {
        return (
            <Layout>
                <div className="p-6 text-center">Data tidak ditemukan.</div>
            </Layout>
        );
    }

    const totalPoin = siswa.pelanggaran?.reduce((sum: number, p: any) => sum + p.poin, 0) || 0;

    return (
        <Layout>
            <div className="p-6">
                {/* Action Buttons - Hidden when printing */}
                <div className="no-print mb-6 flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/siswa/detail/${id}`)}
                        className="flex gap-2"
                    >
                        <ArrowLeft className="size-4" /> Kembali
                    </Button>
                    <Button
                        onClick={handlePrint}
                        className="flex gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                        <Printer className="size-4" /> Cetak
                    </Button>
                    <Button
                        onClick={handleDownload}
                        className="flex gap-2 bg-green-600 hover:bg-green-700"
                    >
                        <Download className="size-4" /> Download PDF
                    </Button>
                </div>

                {/* Printable Content */}
                <div id="print-content">
                    <title>Daftar Poin Siswa - SIPESDA</title>
                    <style>
                        {`
                            body { font-family: 'Arial', sans-serif; font-size: 11px; margin: 0; padding: 20px; }
                            .header { text-align: center; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; }
                            .header h2 { margin: 0; font-size: 14px; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 5px; }
                            
                            .info-table { width: 100%; margin-bottom: 10px; border-collapse: collapse; }
                            .info-table td { padding: 2px 0; vertical-align: top; }
                            .info-label { width: 120px; }
                            .info-separator { width: 10px; }

                            .main-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
                            .main-table th, .main-table td { border: 1px solid #000; padding: 4px; text-align: left; }
                            .main-table th { background-color: #f0f0f0; text-align: center; text-transform: uppercase; }
                            .text-center { text-align: center; }
                            
                            .summary-box { width: 100%; border: 1px solid #000; margin-top: -1px; padding: 5px; box-sizing: border-box; }
                            .summary-row { display: flex; margin-bottom: 2px; }
                            .summary-label { width: 120px; font-weight: bold; }

                            @media print {
                                .no-print { display: none; }
                                body { padding: 0; }
                            }
                        `}
                    </style>

                    <div className="header">
                        <h2>Daftar Poin Siswa - SIPESDA</h2>
                    </div>

                    {/* Informasi Siswa */}
                    <table className="info-table">
                        <tr>
                            <td className="info-label">Nama Siswa</td>
                            <td className="info-separator">:</td>
                            <td>{siswa.nama}</td>
                        </tr>
                        <tr>
                            <td className="info-label">NIS</td>
                            <td className="info-separator">:</td>
                            <td>{siswa.nis}</td>
                        </tr>
                        <tr>
                            <td className="info-label">Kelas</td>
                            <td className="info-separator">:</td>
                            <td>{siswa.kelas}</td>
                        </tr>
                        <tr>
                            <td className="info-label">Nama Wali</td>
                            <td className="info-separator">:</td>
                            <td>{siswa.nama_wali}</td>
                        </tr>
                        <tr>
                            <td className="info-label">No. HP Wali</td>
                            <td className="info-separator">:</td>
                            <td>{siswa.no_hp_wali}</td>
                        </tr>
                    </table>

                    {/* Tabel Pelanggaran */}
                    <table className="main-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Jenis Pelanggaran</th>
                                <th>Tingkat</th>
                                <th className="text-center">Poin</th>
                                <th>Guru Pelapor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {siswa.pelanggaran && siswa.pelanggaran.length > 0 ? (
                                siswa.pelanggaran.map((p: any, index: number) => (
                                    <tr key={p.id}>
                                        <td className="text-center">{index + 1}</td>
                                        <td>{p.tanggal}</td>
                                        <td>{p.jenis_pelanggaran?.nama}</td>
                                        <td>{p.jenis_pelanggaran?.tingkat}</td>
                                        <td className="text-center">{p.poin}</td>
                                        <td>{p.guru?.nama}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        Tidak ada riwayat pelanggaran
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Ringkasan */}
                    <div className="summary-box">
                        <div className="summary-row">
                            <div className="summary-label">Total Poin:</div>
                            <div>{totalPoin}</div>
                        </div>
                        <div className="summary-row">
                            <div className="summary-label">Jumlah Pelanggaran:</div>
                            <div>{siswa.pelanggaran?.length || 0}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
