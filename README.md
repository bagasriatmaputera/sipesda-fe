# SIPESDA Frontend (React + TypeScript)

Sistem Informasi Pengelolaan Sumber Daya (SIPESDA) bagian Frontend. Aplikasi ini dibangun menggunakan **React** dengan **TypeScript** dan berkomunikasi dengan **SIPESDA Laravel API**.

## 🚀 Teknologi yang Digunakan

* **Framework:** React 18
* **Language:** TypeScript
* **State Management:** (Contoh: Redux Toolkit / Context API)
* **Styling:** (Contoh: Tailwind CSS / Bootstrap)
* **HTTP Client:** Axios
* **Build Tool:** Vite / Create React App

---

## 🛠️ Persyaratan Sistem

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:

* **Node.js** (Versi 16 ke atas direkomendasikan)
* **npm** atau **yarn**
* **SIPESDA Laravel API** (Sudah berjalan di lokal atau server)

---

## ⚙️ Cara Instalasi

1. **Clone Repository:**
```bash
git clone https://github.com/username/sipesda-fe.git
cd sipesda-fe

```


2. **Instal Dependensi:**
Karena ini adalah proyek React, gunakan `npm` (bukan composer):
```bash
npm install

```


3. **Konfigurasi Environment:**
Buat file `.env` di direktori utama dan sesuaikan URL API Laravel Anda:
```env
VITE_API_BASE_URL=http://localhost:8000/api

```



---

## 🏃 Menjalankan Aplikasi

Untuk menjalankan aplikasi dalam mode pengembangan:

```bash
npm run dev

```

Aplikasi akan berjalan di [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) (jika menggunakan Vite).

---

## 📁 Struktur Folder

* `src/components`: Komponen UI yang dapat digunakan kembali.
* `src/pages`: Halaman utama aplikasi.
* `src/services`: Konfigurasi Axios dan pemanggilan API ke Laravel.
* `src/types`: Definisi Interface/Type TypeScript untuk data API.
* `src/hooks`: Custom hooks untuk logika bisnis.

---

## 🔗 Integrasi API (Laravel)

Frontend ini terintegrasi dengan endpoint utama SIPESDA API:

* `POST /api/login` - Autentikasi Pengguna.
* `GET /api/data-sumber-daya` - Mengambil list data.
* `POST /api/simpan-data` - Input data baru.

---

## 📝 Catatan Tambahan

Pastikan fitur **CORS** pada Laravel API sudah diaktifkan agar Frontend dapat mengakses data tanpa hambatan.

---
