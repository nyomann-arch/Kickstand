# Kickstand

> **Keep your reference in sight.**

Kickstand adalah web utility berbasis browser yang menjaga satu gambar referensi tetap terlihat dalam jendela **Document Picture-in-Picture** (PiP) yang mengambang saat Anda bekerja di aplikasi lain. Tempel screenshot atau mockup, pop out, dan terus bekerja — tanpa split screen, tanpa alt-tab, tanpa instalasi, tanpa akun.

[![Live Demo](https://img.shields.io/badge/demo-kickstand--mu.vercel.app-3F6893?style=flat-square)](https://kickstand-mu.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/github-nyomann--arch%2FKickstand-1B2733?style=flat-square&logo=github)](https://github.com/nyomann-arch/Kickstand)
[![License: MIT](https://img.shields.io/badge/License-MIT-6B8CAE?style=flat-square)](LICENSE)

🌐 **Bahasa:** [Bahasa Indonesia](README.id.md) · [English](README.md)

---

## Tautan Cepat

- **Live Application:** [https://kickstand-mu.vercel.app/](https://kickstand-mu.vercel.app/)
- **Source Code:** [https://github.com/nyomann-arch/Kickstand](https://github.com/nyomann-arch/Kickstand)
- **Lisensi:** [MIT License](LICENSE)

---

## Tentang Aplikasi

Kickstand adalah aplikasi satu halaman yang ringkas:

- **Area input** — tempel gambar (Ctrl+V), pilih file, atau seret dan lepas ke dropzone.
- **Preview** — gambar ditampilkan dengan rasio aspek aslinya, tidak pernah terpotong atau terdistorsi.
- **Pop Out** — membuka gambar dalam jendela Document PiP native yang selalu berada di atas.
- **Aksi** — ganti atau hapus gambar; menutup jendela PiP tidak menghilangkan preview utama dan gambar siap di-pop-out kembali.

---

## Masalah yang Diselesaikan

Developer dan designer yang bekerja dengan satu monitor sering perlu melihat satu referensi visual — screenshot, mockup, atau diagram — sambil bekerja di editor seperti VS Code atau Figma. Solusi yang umum digunakan semuanya punya friksi:

- **Split-screen** memperkecil area kerja aplikasi utama.
- **Alt-tab** bolak-balik berulang kali mengganggu konsentrasi.
- **Tab browser biasa** memaksa pindah konteks setiap kali memeriksa referensi.
- **Utilitas always-on-top desktop atau ekstensi** bisa memerlukan instalasi, izin, atau persetujuan administrator.
- **Reference board penuh fitur** seperti PureRef berlebihan ketika Anda hanya butuh satu gambar selama beberapa menit.

Kickstand mendemonstrasikan jalur yang lebih ringan untuk kebutuhan *sesaat* ini: tempel satu gambar, pop out ke jendela mengambang, bekerja, lalu tutup ketika selesai.

---

## Fitur Utama

### 1. Tiga Metode Input
Setiap gambar dapat masuk ke Kickstand melalui tiga jalur:

- **Paste:** tekan Ctrl+V saat tab Kickstand sedang fokus — ditangani via Clipboard Event API.
- **File Picker:** pilih file PNG, JPG, atau WebP dari perangkat.
- **Drag-and-Drop:** letakkan file gambar langsung ke area dropzone.

Ketiga jalur bermuara pada pipeline validasi dan preview yang sama.

### 2. Validasi Ketat & Lifecycle Gambar yang Aman
- **Allowlist format:** hanya PNG, JPEG/JPG, dan WebP yang diterima — SVG, GIF, video, dan PDF ditolak dengan pesan yang jelas.
- **Batas ukuran:** file hingga 20 MiB diterima; file terlalu besar, kosong, dan gagal decode ditolak sebelum sampai ke preview.
- **Decode check:** setiap gambar diuji dengan elemen `Image` tersembunyi untuk memastikan benar-benar dapat didecode dan untuk membaca dimensi aslinya.
- **Lifecycle Blob URL yang aman:** Object URL baru dibuat untuk setiap gambar dan dipasang ke seluruh consumer *sebelum* URL lama dicabut — tidak ada gambar rusak dan tidak ada kebocoran resource saat ganti gambar berulang kali.
- **Input race-safe:** input yang berurutan cepat ditangani dengan request ID, sehingga hasil async yang kedaluwarsa tidak pernah menimpa gambar yang lebih baru.

### 3. Engine Document Picture-in-Picture
- **Feature detection** via `'documentPictureInPicture' in window` — tanpa user-agent sniffing.
- `requestWindow()` dipanggil **secara sinkron di dalam click handler**, menjaga transient user activation.
- **Perlindungan klik ganda** dengan guard `isOpeningPiP` dan tombol yang dinonaktifkan secara sinkron.
- **Ukuran jendela awal proporsional** dihitung dari rasio aspek alami gambar, dengan batas min/max yang masuk akal (browser tetap dapat menyesuaikannya).
- **Satu gambar, satu jendela:** mengganti gambar saat PiP aktif memperbarui jendela mengambang yang *sama* — PiP kedua tidak pernah dibuka.
- **Lifecycle bersih:** event `pagehide` pada jendela PiP mereset state sehingga siklus close → reopen berjalan andal.

### 4. Status & Feedback yang Jujur
- Badge dukungan browser ditampilkan sejak awal.
- State empty, loaded, PiP aktif, unsupported, dan error semuanya berbeda dan pesannya jelas.
- Update status diumumkan lewat region `aria-live`; seluruh kontrol dapat diakses via keyboard.
- Browser yang tidak didukung (Safari, mobile) tetap mendapatkan preview penuh dengan penjelasan yang jujur, bukan tombol mati.

### Dukungan Browser untuk Pop Out

| Browser | Status | Perilaku |
|---|---|---|
| Chrome desktop 116+ | Full support | Browser target — Pop Out berfungsi |
| Edge desktop 116+ | Full support | Browser target — Pop Out berfungsi |
| Opera desktop 102+ | Full support | Pop Out berfungsi |
| Firefox 151+ | Preview | Eksperimental — mungkin berfungsi |
| Safari desktop / mobile | Tidak didukung | Preview saja, Pop Out nonaktif dengan penjelasan |

---

## Alur Kerja Inti

**Paste → Preview → Pop Out → Bekerja dengan referensi terlihat → Close/Reopen**

Jendela PiP adalah jendela browser sungguhan: tetap di atas aplikasi lain, dapat diubah ukurannya lewat kontrol native, dan hilang bersama tabnya — persis seperti yang diatur platform.

---

## Cara Menggunakan

1. Buka [https://kickstand-mu.vercel.app/](https://kickstand-mu.vercel.app/) di browser desktop yang didukung.
2. Salin satu gambar (screenshot, mockup, diagram) dari aplikasi lain.
3. Fokuskan tab Kickstand dan tekan **Ctrl+V** — atau klik **Choose image**, atau seret dan lepas file.
4. Periksa preview, lalu klik **Pop Out**.
5. Berpindah ke aplikasi utama — gambar tetap mengambang di atasnya.
6. Tutup jendela PiP lewat kontrol native; preview Anda tetap ada dan **Pop Out** bisa dipakai lagi. Tempel gambar baru kapan saja untuk memperbarui jendela mengambang yang sama.

Format yang didukung: **PNG, JPG/JPEG, WebP** (maks. 20 MiB).

---

## Batasan & Kompatibilitas

- **Satu gambar aktif dan satu jendela PiP per tab** — memang by design, bukan stack atau galeri.
- Jendela PiP **tidak dapat hidup lebih lama dari tab pembukanya**; menutup tab menutup jendela.
- Website **tidak dapat menentukan posisi** jendela di layar.
- Ukuran jendela awal adalah *permintaan* — browser dapat membatasi atau menyesuaikannya.
- Always-on-top adalah fitur browser, **bukan jaminan** berada di atas semua aplikasi fullscreen atau jendela level OS.
- Paste hanya berfungsi saat halaman Kickstand sedang fokus — **tidak ada** penangkapan clipboard global.
- Batas 20 MiB bersifat provisional dan dapat disesuaikan setelah pengujian perangkat.
- Document PiP memerlukan **secure context** (HTTPS atau localhost).

---

## Privasi dan Keamanan

Kickstand memegang prinsip privacy-first secara ketat:

- **Pemrosesan 100% client-side:** gambar dibaca via File API dan dirender melalui Blob Object URL sepenuhnya di memori browser.
- **Tanpa backend, tanpa API, tanpa database:** tidak ada endpoint pemrosesan gambar di sisi server dan tidak ada analitik atau telemetri pihak ketiga.
- **Tanpa penyimpanan permanen:** gambar tidak pernah ditulis ke `localStorage`, `sessionStorage`, `IndexedDB`, cookies, atau filesystem. Data hanya berada di memori halaman dan hilang saat tab ditutup atau di-refresh.
- **Tanpa request jaringan untuk gambar:** tidak ada `fetch`, `XMLHttpRequest`, `sendBeacon`, atau WebSocket yang mengirim data gambar — diverifikasi lewat inspeksi statis source dan hasil build.
- **Tanpa aset eksternal saat runtime:** aplikasi tidak memuat CDN, font, tracker, atau script pihak ketiga.
- **Pernyataan privasi:**
  > *"Images are processed locally in your browser. Kickstand does not upload your images."*
- *Catatan transparansi:* membuka situs mengunduh aset statis (HTML, CSS, JS) dari hosting Vercel — itu terpisah dari gambar Anda yang tidak pernah meninggalkan browser.

---

## Teknologi yang Digunakan

Kickstand dibangun dengan stack web modern yang ramping — tanpa framework, tanpa backend, tanpa dependensi runtime:

| Komponen | Teknologi | Kegunaan |
|---|---|---|
| **Markup** | HTML5 Semantik | Kerangka halaman yang aksesibel dan terstruktur |
| **Styling** | CSS3 Murni (Custom Properties) | Design tokens, komponen `.kickstand-*`, layout responsif |
| **Logika Aplikasi** | Vanilla JavaScript (ES Modules) | Penanganan input, state gambar, lifecycle PiP |
| **Build Tooling** | Vite 6 | Dev server dan build produksi statis yang teroptimasi |
| **Input Gambar** | Clipboard Event API, File API, Drag & Drop API | Input paste, picker, dan dropzone |
| **Rendering Gambar** | Blob API & Object URLs | Preview lokal dan tampilan PiP tanpa upload |
| **Jendela Mengambang** | Document Picture-in-Picture API | Jendela always-on-top native browser |
| **Hosting Publik** | Vercel | Static hosting untuk hasil build produksi |

---

## Menjalankan Proyek Secara Lokal

### Prasyarat
- Node.js 18+ dan npm
- Browser desktop dengan dukungan Document PiP untuk fitur Pop Out (Chrome/Edge 116+ direkomendasikan)

### 1. Clone Repository
```bash
git clone https://github.com/nyomann-arch/Kickstand.git
cd Kickstand
```

### 2. Install Dependencies
```bash
npm ci
```

### 3. Jalankan Development Server
```bash
npm run dev
```

Buka http://localhost:5173 di browser.

### 4. Production Build (opsional)
```bash
npm run build
npm run preview
```

`npm run preview` menyajikan hasil build produksi di http://localhost:4173.

> **Catatan pengembang:** ini adalah proyek Vite — dependency diinstal via npm dan output produksi berupa folder statis `dist/` yang dapat di-hosting di mana saja.

---

## Struktur Repository

```text
Kickstand/
├── docs/
│   ├── 01-agent-rules.md          # Aturan agent, keamanan, batasan teknis
│   ├── 02-prd-kickstand.md        # Dokumen Kebutuhan Produk (PRD)
│   ├── 03-design-systems.md       # Identitas visual, design tokens, komponen
│   └── 04-verification-checklist.md # Checklist verifikasi Milestone 5
├── public/
│   ├── favicon.svg                # Ikon situs
│   ├── robots.txt                 # Aturan crawler + referensi sitemap
│   ├── sitemap.xml                # Sitemap single-page
│   └── google*.html               # File verifikasi Search Console
├── src/
│   ├── main.js                    # Logika input, lifecycle gambar, Document PiP
│   └── styles.css                 # Design tokens + komponen .kickstand-*
├── index.html                     # Markup + meta SEO/OG/JSON-LD
├── dist/                          # Hasil build produksi (ter-track)
├── LICENSE                        # Lisensi open-source MIT
├── README.md                      # Dokumentasi bahasa Inggris
└── README.id.md                   # Dokumentasi bahasa Indonesia
```

CSS untuk dokumen PiP diinjeksikan sebagai string `PIP_CSS` di dalam `src/main.js`, karena jendela PiP adalah dokumen terpisah yang tidak mewarisi stylesheet halaman utama.

---

## Deployment

Kickstand dapat dideploy secara instan ke platform static hosting mana pun — hasil build produksi hanyalah folder `dist/` biasa:

- **Live Demo (Vercel):** [https://kickstand-mu.vercel.app/](https://kickstand-mu.vercel.app/) — auto-deploy dari `main`; Vercel menjalankan `npm run build` dan menyajikan `dist/`.
- **GitHub Pages:** publikasikan folder `dist/` (atau atur output build-nya); set `base` Vite bila memakai URL project site.
- **Netlify / static host lain:** hubungkan repo, set build command `npm run build`, publish directory `dist`.

File di `public/` (`robots.txt`, `sitemap.xml`, favicon, verifikasi Search Console) disalin apa adanya ke `dist/` pada setiap build.

---

## Kontribusi dan Feedback

Perbaikan bug, skenario pengujian, peningkatan aksesibilitas, dan penyempurnaan dokumentasi sangat diterima!

1. Laporkan masalah atau diskusikan ide fitur baru melalui [GitHub Issues](https://github.com/nyomann-arch/Kickstand/issues).
2. Kirimkan perbaikan kode atau dokumentasi melalui [Pull Request](https://github.com/nyomann-arch/Kickstand/pulls).

Mohon perhatikan scope proyek yang ditetapkan di [`docs/02-prd-kickstand.md`](docs/02-prd-kickstand.md) — Kickstand memang sengaja dibuat sebagai alat floating reference satu gambar, bukan reference board, clipboard manager, atau asset library.

---

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) © 2026 nyomann-arch.
