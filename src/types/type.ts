export interface Guru {
    id: number;
    nip: string;
    nama_guru: string;
    photo: string;
    no_hp: string;
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