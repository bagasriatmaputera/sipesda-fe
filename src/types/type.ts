export interface Guru {
    id: number;
    nip: string;
    nama: string;
    photo: string;
    no_hp: string;
}

export interface BobotRule {
    id: number;
    kode_tahap: string;
    kode_kriteria: string;
    bobot: number;
}

export interface jenisPelanggaran {
    id: number;
    nama_pelanggaran: string;
    tingkat: string;
    poin: number;
}

export interface Siswa {
    id: number;
    nis: string;
    nama: string;
    photo: string;
    kelas: string;
    nama_wali: string;
    no_hp_wali: string;
}

export interface Pelanggaran {
    id: number;
    siswa_id: number;
    guru_id: number;
    jenis_pelanggaran_id: number;
    tanggal: string;
    poin: number;
    keterangan: string; // Sesuai gambar database Anda
    siswa?: Siswa;      // Relasi ke data siswa
    guru?: Guru;        // Relasi ke data guru
}

export interface Kelas {
    id: number;
    nama_kelas: string;
    wali_kelas_id: Guru;
}