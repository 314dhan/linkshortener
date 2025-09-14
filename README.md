# URL Shortener

Sebuah aplikasi web sederhana untuk memperpendek URL, dibangun dengan Node.js dan Express. Aplikasi ini menggunakan file JSON sebagai database, sehingga tidak memerlukan setup database eksternal.

## Fitur

- Memperpendek URL yang panjang menjadi URL yang lebih singkat.
- Mengarahkan pengguna dari URL pendek ke URL asli.
- Menghitung jumlah klik pada setiap URL pendek.
- Validasi untuk memastikan URL yang dimasukkan adalah format yang valid.

## Teknologi yang Digunakan

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript templates), CSS
- **Database**: File JSON sebagai penyimpanan data sederhana.
- **Paket Utama**:
  - `nanoid`: Untuk menghasilkan ID URL pendek yang unik dan aman.
  - `valid-url`: Untuk memvalidasi URL yang dikirim oleh pengguna.
  - `dotenv`: Untuk mengelola variabel lingkungan.
  - `nodemon`: Untuk me-restart server secara otomatis selama pengembangan.

---

## Instalasi dan Pengaturan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda.

### 1. Prasyarat

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (disarankan versi LTS).

### 2. Instalasi

1.  **Clone repositori ini (atau unduh file proyek):**
    ```bash
    # Ganti <URL_REPOSITORI> dengan URL Git punya kalian jika ada
    git clone <URL_REPOSITORI>
    cd nama-direktori-proyek
    ```

2.  **Pasang (install) semua dependensi yang dibutuhkan:**
    ```bash
    npm install
    ```

### 3. Konfigurasi

1.  Buat file bernama `.env` di direktori utama proyek.

2.  Salin konten di bawah ini ke dalam file `.env` Anda. File ini digunakan untuk menyimpan konfigurasi penting.

    ```env
    # Port di mana server akan berjalan
    PORT=3000

    # (Opsional) URL dasar untuk URL pendek yang akan dibuat.
    # Jika tidak diatur, aplikasi akan secara otomatis menggunakan alamat server (misal: http://localhost:3000).
    # Jika Anda ingin menggunakan domain kustom, atur di sini.
    # Contoh: BASE_URL=http://domain-anda.com
    BASE_URL=http://localhost:3000
    ```

---

## Menjalankan Aplikasi

Setelah instalasi dan konfigurasi selesai, Anda dapat menjalankan server dengan salah satu dari perintah berikut:

-   **Untuk Lingkungan Pengembangan (Development):**
    Perintah ini menggunakan `nodemon`, yang akan secara otomatis me-restart server setiap kali ada perubahan pada file. Ini sangat direkomendasikan untuk pengembangan.
    ```bash
    npm run dev
    ```

-   **Untuk Lingkungan Produksi (Production):**
    Perintah ini menjalankan server menggunakan `node` secara langsung.
    ```bash
    npm start
    ```

Setelah server berjalan, buka browser Anda dan akses:
**`http://localhost:3000`**

