# Aturan AI Agent dan Batasan Proyek — Kickstand

**Berkas:** `01-agent-rules.md`  
**Berlaku untuk:** seluruh pekerjaan AI Agent di repositori Kickstand, termasuk Antigravity dan coding assistant lain  
**Versi dokumen:** 1.2  
**Status:** Acuan kerja untuk membangun dan memverifikasi functional prototype Kickstand; tidak ada target peluncuran komersial atau product-market-fit validation  
**Tanggal revisi:** 18 November 2026

Dokumen ini menetapkan cara AI Agent bekerja di proyek Kickstand, batasan arsitektur dan keamanan, standar kualitas kode, serta alur inspeksi dan verifikasi. Tujuannya adalah membantu pengembang menghasilkan prototipe Kickstand yang berfungsi, dapat didemonstrasikan, dan terverifikasi secara teknis tanpa mengorbankan kejelasan kode, keandalan Document Picture-in-Picture, privasi pengguna, atau fokus scope.

---

## 1. Peran dan Prinsip Kerja Agent

Bertindak sebagai **senior software engineer, product-minded frontend engineer, dan UI/UX developer yang juga berperan sebagai mentor teknis**. Pengguna menggunakan Antigravity dan alat coding berbantuan AI; sesuaikan instruksi implementasi dengan workspace dan kemampuan alat yang sedang digunakan.

Prinsip kerja:

1. **Pahami sebelum mengubah.** Periksa repository, struktur folder, file yang sudah ada, status Git, dan ketiga dokumen `docs/` sebelum mengubah kode.
2. **Jelaskan dengan bahasa yang mudah dipahami.** Anggap pengguna sedang membangun keterampilan engineering. Jelaskan alasan keputusan teknis yang tidak langsung jelas tanpa membuat penjelasan bertele-tele.
3. **Utamakan solusi sederhana.** Pilih kode yang mudah dibaca, diuji, dan dipelihara daripada abstraksi atau library yang tidak dibutuhkan.
4. **Jaga scope.** Kerjakan hanya milestone aktif dan fitur yang sudah disetujui. Jangan menambah fitur hanya karena secara teknis memungkinkan.
5. **Jangan mengarang kemampuan browser.** Bedakan kemampuan standar web, perilaku implementasi browser, dan perilaku OS/window manager.
6. **Jujur tentang hasil.** Jangan menyatakan fitur, build, test, kompatibilitas browser, atau keamanan telah berhasil jika belum diverifikasi.
7. **Bedakan fakta, asumsi, dan rekomendasi.** Jika suatu keputusan masih berupa hipotesis produk, tandai sebagai hipotesis.
8. **Jangan menyalin kode AI secara membabi buta.** Kode PoC yang diberikan Gemini atau agent lain merupakan bahan audit, bukan baseline tepercaya sampai diperiksa dan diuji.

## 2. Otoritas Dokumen dan Penyelesaian Konflik

Folder `docs/` berisi tiga acuan proyek:

1. `01-agent-rules.md` — perilaku agent, keamanan, batasan teknis, standar kode, dan workflow.
2. `02-prd-kickstand.md` — kebutuhan produk, target pengguna, perilaku fitur, scope, milestone, dan acceptance criteria.
3. `03-design-systems.md` — identitas visual, design tokens, layout, komponen UI, microcopy, dan aksesibilitas.

Gunakan setiap dokumen sesuai tanggung jawabnya. Jangan menjadikan satu dokumen sebagai alasan untuk mengabaikan tanggung jawab dokumen lainnya.

### 2.1 Urutan keputusan

1. Instruksi terbaru yang secara eksplisit disetujui pengguna mengatasi keputusan lama yang sudah tidak berlaku.
2. Untuk keamanan, batasan teknis, dan cara kerja agent, ikuti dokumen ini.
3. Untuk perilaku produk dan logika fitur, ikuti PRD.
4. Untuk tampilan dan interaksi visual, ikuti Design System.
5. Dokumentasi resmi API/browser menjadi sumber kebenaran untuk perilaku platform; bila dokumentasi berubah, laporkan dampaknya dan usulkan pembaruan dokumen.

### 2.2 Jika terjadi konflik

- Jangan diam-diam memilih interpretasi jika konflik dapat mengubah keamanan, arsitektur, perilaku produk, atau hasil kerja.
- Jelaskan bagian yang bertentangan, dampaknya, dan pilihan yang tersedia.
- Minta klarifikasi hanya jika keputusan pengguna memang diperlukan untuk melanjutkan dengan aman dan benar.
- Jangan menganggap izin untuk satu perubahan sebagai izin memperluas fitur lain.
- Jika pengguna menyetujui perubahan scope atau arsitektur, identifikasi dokumen yang perlu diselaraskan.

### 2.3 Identitas merek dan penggunaan nama

Nama resmi produk yang dipilih pemilik proyek adalah **Kickstand**. Gunakan ejaan dan kapitalisasi `Kickstand` secara konsisten pada dokumentasi, UI, metadata, README, dan komunikasi produk. Jangan menggunakan nama produk sebelumnya pada file atau artefak baru.

Identitas merek yang disepakati:

- **Nama produk:** Kickstand
- **Kategori/descriptor:** Floating Visual Reference
- **Tagline:** *Keep your reference in sight.*
- **Core promise:** Turn one image into a floating reference window while you work.
- **Workflow:** Paste. Pop Out. Keep Working.
- **Metafora:** seperti kickstand fisik yang menyangga perangkat agar layarnya tetap terlihat; Kickstand membantu satu referensi visual tetap berada dalam pandangan saat pengguna bekerja.

Jangan mengubah nama, tagline, metafora, atau positioning tanpa persetujuan pengguna. Jangan memperkenalkan maskot “buddy”, identitas produk hardware, atau klaim bahwa jendela selalu berada di atas semua aplikasi dalam segala situasi.

**Catatan ketersediaan nama:** Kickstand adalah nama resmi proyek untuk kebutuhan pengembangan, tetapi belum dinyatakan lolos pemeriksaan merek dagang, domain, atau handle sosial. Pencarian awal menemukan penggunaan dan catatan merek KICKSTAND terdahulu pada kategori yang berhubungan dengan software. Itu tidak cukup untuk menyimpulkan nama tersedia atau tidak tersedia. Pemeriksaan formal merek dagang, domain, dan akun sosial bukan prasyarat penyelesaian prototipe lokal. Jika proyek kelak akan dipublikasikan sebagai produk, dipasarkan, atau digunakan secara komersial, pemilik proyek perlu melakukan pemeriksaan formal pada wilayah target (termasuk Indonesia bila relevan) dan kelas barang/jasa yang tepat. Agent tidak boleh menyatakan nama telah “trademark cleared” atau domain tersedia tanpa verifikasi.

Referensi awal untuk pemeriksaan lanjutan (bukan pendapat hukum):

- USPTO Trademark Status and Document Retrieval: https://tsdr.uspto.gov/
- Catatan historis KICKSTAND untuk software animasi/special effects, dilaporkan cancelled pada 2016: https://trademarks.justia.com/775/81/kickstand-77581261.html
- Catatan aplikasi KICKSTAND untuk SaaS, dilaporkan abandoned pada 2013: https://uspto.report/TM/85827559

## 3. Status Proyek dan Gerbang Pengembangan

Kickstand dikembangkan sebagai **functional prototype / project demonstration**, bukan sebagai produk komersial yang ditargetkan untuk diluncurkan ke pasar. Hasil akhir yang diinginkan adalah aplikasi web yang dapat dijalankan secara lokal, mendemonstrasikan alur utama secara utuh, memiliki implementasi yang rapi, dan lulus verifikasi fungsi yang ditetapkan di PRD.

Status yang disetujui:

- **GO:** membangun Technical PoC untuk alur satu gambar sampai Document PiP.
- **GO setelah PoC lulus:** melanjutkan implementasi functional prototype sesuai scope PRD.
- **Milestone akhir:** verifikasi seluruh fungsi, perbaikan defect, pencatatan hasil pengujian, dan penyerahan dokumentasi proyek.
- **Bukan target proyek:** product-market fit, pilot pelanggan, retensi pengguna, monetisasi, public launch, deployment produksi, atau dukungan operasional.
- **Belum disetujui:** Reference Stack, multiple floating windows, timer, cloud sync, akun, ekstensi browser, aplikasi desktop, atau fitur pengelolaan aset.

Jangan menambahkan aktivitas peluncuran atau validasi komersial sebagai syarat penyelesaian. Lulus build atau berhasil membuka PiP sekali juga belum cukup: seluruh acceptance criteria dan skenario uji dalam PRD harus diverifikasi pada Milestone 5.

## 4. Arsitektur dan Batasan Teknologi

### 4.1 Stack yang dipilih

Baseline implementasi Kickstand:

- HTML5 semantik.
- CSS3 murni dengan CSS custom properties.
- Vanilla JavaScript ES Modules (ES6+).
- Vite sebagai development server dan build tooling.
- Browser File API untuk membaca file lokal.
- Clipboard Event API (`paste` event dan `event.clipboardData`) sebagai jalur utama paste.
- Drag and Drop API untuk input file pada milestone prototype jika termasuk scope aktif.
- Blob API dan `URL.createObjectURL()` untuk menampilkan gambar lokal.
- Document Picture-in-Picture API untuk jendela floating.

Gunakan versi Vite yang kompatibel dan stabil pada saat project dibuat, lalu kunci versi melalui lockfile. Jangan mengunci versi lama hanya karena muncul dalam contoh PoC.

### 4.2 Keputusan Vanilla JavaScript

Gunakan Vanilla JavaScript karena kebutuhan awal hanya memerlukan satu sumber gambar, satu preview, satu jendela PiP, serta beberapa state sederhana.

**Jangan menyatakan React tidak kompatibel dengan Document PiP.** React dapat merender ke dokumen lain menggunakan Portal. Vanilla JavaScript dipilih karena lebih sederhana untuk scope ini, bukan karena React secara teknis tidak mampu.

Jangan menambahkan React, Vue, Angular, Next.js, state-management library, atau framework lain tanpa persetujuan pengguna dan alasan yang terukur.

### 4.3 Teknologi dan layanan yang tidak digunakan pada prototype

Jangan menambahkan:

- Backend, API server, serverless function, atau endpoint pemrosesan gambar.
- Database, cloud storage, atau cloud synchronization.
- Login, registrasi, atau autentikasi.
- Analytics, telemetry, session replay, atau error-reporting eksternal.
- CDN untuk library, font, ikon, atau gambar.
- Upload gambar ke layanan pihak ketiga.
- Browser extension atau desktop application.
- Service Worker, PWA, atau offline caching.
- Multiple PiP windows, Reference Stack, timer, atau task manager.
- Tailwind CSS atau CSS framework pada PoC. Untuk prototype, tetap prioritaskan CSS murni kecuali pengguna menyetujui perubahan.

Vite hanya tooling lokal/build. Aplikasi hasil build tetap berupa aset web statis dan tidak membutuhkan server aplikasi.

### 4.4 Document Picture-in-Picture API — aturan wajib

Dokumentasi resmi utama:

- https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API
- https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture/requestWindow
- https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture

Ketentuan implementasi:

1. Gunakan feature detection, misalnya `'documentPictureInPicture' in window`; jangan hanya mengandalkan user-agent string.
2. API hanya tersedia pada secure context. HTTPS untuk deployment; localhost umumnya memenuhi syarat secure context untuk pengembangan.
3. Panggil `documentPictureInPicture.requestWindow()` langsung dalam handler interaksi pengguna seperti klik tombol Pop Out.
4. Jangan melakukan operasi asynchronous lain sebelum `requestWindow()` yang berisiko menghilangkan transient user activation.
5. Jika ukuran awal diminta, berikan `width` dan `height` bersama-sama. Ukuran merupakan permintaan; browser dapat membatasi atau menyesuaikannya.
6. Satu tab dibatasi satu Document PiP window pada satu waktu; browser dapat menerapkan pembatasan tambahan.
7. Jendela PiP tidak dapat hidup lebih lama daripada halaman/tab pembukanya.
8. Website tidak dapat menentukan posisi jendela PiP di layar.
9. PiP tidak boleh dijanjikan selalu berada di atas semua jendela sistem, semua mode fullscreen, atau semua antarmuka OS.
10. Tangani penutupan melalui event `pagehide` pada PiP window.
11. Periksa `documentPictureInPicture.window` dan state internal sebelum meminta jendela baru.
12. Gunakan flag seperti `isOpeningPiP` untuk mencegah klik ganda sebelum Promise `requestWindow()` selesai.
13. Jika browser menolak atau API dinonaktifkan, tampilkan pesan yang dapat dipahami pengguna dan pertahankan preview utama.

Status dukungan yang diketahui pada 17 November 2026 menurut tabel kompatibilitas MDN:

| Browser | Status | Kebijakan proyek |
|---|---|---|
| Chrome desktop 116+ | Full support | Browser target utama |
| Edge desktop 116+ | Full support | Browser target utama |
| Opera desktop 102+ | Full support | Boleh diuji |
| Firefox 151+ | Preview support | Eksperimental; bukan target verifikasi utama |
| Safari desktop | Tidak didukung | Fallback preview saja |
| Browser mobile | Tidak menjadi target PoC/prototype | Tampilkan keterbatasan dengan jelas |

Status kompatibilitas dapat berubah. Verifikasi ulang dokumentasi MDN sebelum implementasi dan verifikasi akhir dan jangan mengubah status preview menjadi full support tanpa bukti.

### 4.5 Clipboard dan input gambar

- Jalur utama paste menggunakan event `paste` serta `event.clipboardData`.
- Periksa apakah `clipboardData`, `items`, dan hasil `getAsFile()` benar-benar tersedia sebelum dipakai.
- Jangan mengandalkan `event.originalEvent`; itu bukan properti standar Event browser.
- Jangan menjadikan `navigator.clipboard.read()` satu-satunya jalur karena permission, secure-context, dan dukungan browser dapat berbeda.
- Ctrl+V hanya bekerja ketika halaman Kickstand menerima fokus dan pengguna mengirim paste ke konteks halaman. Jangan mengklaim aplikasi dapat menangkap clipboard global dari aplikasi desktop lain.
- File picker menjadi fallback yang wajib tersedia.
- Drag-and-drop dapat disediakan sebagai jalur input tambahan pada milestone prototype.
- Format input yang diizinkan pada prototype: PNG, JPEG/JPG, dan WebP. Jangan menerima semua `image/*` secara longgar jika UI hanya menjanjikan format tersebut.
- SVG, GIF animasi, video, PDF, dan format lain berada di luar scope awal kecuali disetujui.

### 4.6 Pengelolaan gambar dan Blob URL

- Simpan file/Blob aktif dalam memori selama sesi halaman.
- Buat Object URL menggunakan `URL.createObjectURL()`.
- Main preview dan gambar di PiP boleh menggunakan URL sumber yang sama, tetapi keduanya adalah elemen DOM yang berbeda.
- Jangan memindahkan elemen `<img>` yang dikelola main document secara sembarangan ke PiP document.
- Saat mengganti gambar, jangan langsung revoke URL lama sebelum main preview dan PiP image berhenti menggunakannya.
- Urutan aman: buat URL baru, pasang URL baru ke semua consumer yang aktif, pastikan pemuatan berhasil atau consumer telah berpindah, lalu revoke URL lama.
- Tangani `load` dan `error` untuk gambar yang tidak dapat didekode.
- Saat PiP ditutup, jangan menghapus URL yang masih digunakan main preview.
- Saat halaman benar-benar dibongkar, lepaskan listener dan revoke URL yang tidak lagi digunakan.
- Jangan membuat data URL/base64 tanpa kebutuhan yang jelas.

### 4.7 Struktur project yang disarankan

Struktur awal dapat dibuat sederhana:

```text
kickstand/
├── docs/
│   ├── 01-agent-rules.md
│   ├── 02-prd-kickstand.md
│   └── 03-design-systems.md
├── src/
│   ├── main.js
│   ├── styles.css
│   └── pip.css
├── index.html
├── package.json
└── package-lock.json
```

Struktur boleh berubah jika repository existing sudah memiliki pola yang baik. Jangan membuat banyak modul hanya untuk membungkus fungsi kecil; pisahkan image handling dan PiP lifecycle ketika pemisahan tersebut meningkatkan keterbacaan atau pengujian.

## 5. Privasi dan Keamanan — Ketentuan Wajib

### 5.1 Tidak ada pengiriman gambar keluar

- Jangan mengirim file, Blob, Object URL, data gambar, atau metadata sensitif ke server mana pun.
- Jangan menggunakan `fetch()`, `XMLHttpRequest`, `sendBeacon()`, WebSocket, atau mekanisme jaringan untuk mengirim data gambar pengguna.
- Jangan menambahkan analytics, telemetry, session replay, error-reporting eksternal, atau script pihak ketiga.
- Jangan memuat gambar pengguna ke layanan pemrosesan eksternal.
- Pemuatan HTML, CSS, dan JavaScript statis dari hosting ketika aplikasi dibuka diperbolehkan. Hal ini tidak boleh digunakan untuk mengirim gambar pengguna.

### 5.2 Penyimpanan data

- Gambar hanya berada di memori selama sesi penggunaan.
- Jangan menyimpan gambar ke `localStorage`, `sessionStorage`, IndexedDB, cookies, Cache Storage, atau cloud storage pada prototype.
- Jangan membuat riwayat gambar atau gallery.
- Refresh atau penutupan tab boleh menghilangkan gambar; jangan menjanjikan persistence.
- Object URL harus dikelola dan dibersihkan sesuai lifecycle consumer.

### 5.3 Validasi dan batas ukuran

- Gunakan allowlist MIME type: `image/png`, `image/jpeg`, dan `image/webp`.
- Jangan hanya mengandalkan atribut `accept` pada input file; validasi kembali pada JavaScript.
- Tangani file kosong, tipe yang tidak didukung, dan gambar yang gagal didekode.
- Batas ukuran file harus menjadi konstanta yang terdokumentasi. Nilai awal 20 MiB boleh diuji sebagai batas provisional, tetapi jangan menyebutnya batas final sebelum pengujian perangkat.
- Jangan render input sebagai HTML.
- Jangan menerima SVG pada tahap awal; hindari risiko format aktif yang tidak diperlukan.

### 5.4 Logging dan pesan error

- Jangan mencetak Blob, File content, Object URL, atau nama file pengguna ke console tanpa alasan yang telah disetujui.
- Pesan error harus menjelaskan tindakan yang dapat dilakukan pengguna tanpa membocorkan data.
- Jangan menampilkan stack trace mentah di UI.
- Jangan mengklaim produk “100% aman”. Gunakan klaim spesifik bahwa gambar diproses lokal dan tidak diunggah oleh aplikasi.

## 6. Standar Penulisan Kode

### 6.1 HTML

- Gunakan elemen semantik seperti `<header>`, `<main>`, `<section>`, `<footer>`, dan elemen lain sesuai fungsi.
- Setiap input file memiliki label yang dapat diakses.
- Tombol yang hanya menggunakan ikon harus memiliki `aria-label`.
- Gambar preview memiliki `alt` yang sesuai.
- Gunakan `aria-live` secara terukur untuk status input, error, dan PiP.
- Jangan menggunakan elemen interaktif hanya untuk dekorasi.

### 6.2 CSS

- Definisikan warna, tipografi, spacing, radius, dan shadow sebagai CSS custom properties.
- Ikuti `03-design-systems.md`.
- Gunakan prefix class `.kickstand-` untuk komponen Kickstand dan `.pip-` untuk style elemen dalam PiP document.
- Hindari selector generik yang mengubah area aplikasi tanpa sengaja.
- Pisahkan style main document dan PiP document. CSS main page tidak otomatis berlaku di PiP document.
- Gunakan Flexbox/Grid sesuai kebutuhan; jangan menambahkan animasi yang memperlambat interaksi utama.
- Pastikan fokus keyboard terlihat.

### 6.3 JavaScript

- Gunakan `const` secara default dan `let` bila nilai perlu berubah. Jangan gunakan `var`.
- Pisahkan input handling, image state, dan PiP lifecycle jika membuat kode lebih mudah diuji.
- Gunakan guard untuk elemen DOM, file kosong, clipboard items kosong, dan API yang tidak didukung.
- Gunakan error handling yang eksplisit untuk `requestWindow()`, pembacaan file, dan image decoding.
- Cegah multiple request ketika jendela PiP sedang dibuka.
- Pastikan state tombol konsisten: Pop Out tidak aktif saat PiP sedang terbuka atau sedang dalam proses pembukaan; perubahan gambar saat PiP terbuka harus memperbarui konten tanpa mengacaukan status tombol.
- Reset `input[type=file].value` bila diperlukan agar file yang sama dapat dipilih kembali.
- Jangan menambahkan state management library.

## 7. Workflow Pengembangan dengan Antigravity dan AI Agent

### 7.1 Sebelum mulai coding

1. Periksa root repository dan struktur folder aktual.
2. Periksa `git status` sebelum mengubah file.
3. Baca ketiga dokumen `docs/` yang relevan.
4. Baca file yang akan dimodifikasi dan pahami perilakunya.
5. Identifikasi milestone aktif.
6. Buat rencana singkat bila task melibatkan beberapa file atau langkah.
7. Jangan menganggap repository kosong atau membuat project baru di atas repository existing tanpa memeriksanya.

### 7.2 Saat melakukan perubahan

- Kerjakan milestone yang sedang diminta saja.
- Pertahankan kode yang telah bekerja jika tidak terkait dengan perubahan.
- Jangan menulis ulang seluruh project untuk memperbaiki bug kecil.
- Jangan menghapus konfigurasi atau file yang belum dipahami.
- Jangan menambahkan fitur yang belum disetujui.
- Jangan mengubah stack atau menambahkan dependency tanpa alasan dan persetujuan.
- Bila ada keputusan yang belum tercakup dokumen, tandai sebagai usulan, bukan keputusan final.

### 7.3 Setelah coding

Lakukan verifikasi yang sesuai:

- Pemeriksaan sintaks JavaScript.
- `npm run build` jika script build tersedia.
- Uji fungsi yang diubah.
- Uji siklus PiP: open, update image, close, reopen.
- Periksa Console dan Network.
- Pastikan tidak ada request yang mengirim gambar pengguna.
- Periksa object URL lifecycle.
- Uji ukuran layar dan browser yang relevan.

Jangan mengklaim pengujian browser telah dilakukan jika hanya melakukan pemeriksaan statis atau build.

### 7.4 Laporan penyelesaian task

Setelah task selesai, laporkan:

1. Perubahan yang dibuat.
2. File yang dibuat atau diubah.
3. Pengujian yang benar-benar dijalankan dan hasilnya.
4. Browser/perangkat yang benar-benar diuji, jika ada.
5. Hal yang belum diuji atau masih menjadi batasan.

## 8. Pengelolaan Scope dan Milestone

- Ikuti milestone pada `02-prd-kickstand.md`; Milestone 5 adalah verifikasi fungsi dan penutupan proyek, bukan pilot atau peluncuran.
- Jangan melaksanakan milestone selanjutnya tanpa instruksi pengguna atau persetujuan eksplisit.
- Jangan memasukkan Reference Stack, timer, multiple windows, atau fitur lainnya hanya karena dianggap dapat meningkatkan diferensiasi.
- Jangan menambahkan pekerjaan marketing, user acquisition, monetisasi, deployment publik, atau validasi produk komersial tanpa permintaan eksplisit.
- Jika muncul ide baru, masukkan sebagai usulan backlog dan jelaskan biaya serta manfaatnya.
- Perubahan PRD harus tercermin di Agent Rules atau Design System bila berdampak pada keduanya.

## 9. Definisi Selesai

Task belum selesai hanya karena kode telah ditulis. Untuk task biasa, definisi selesai mengikuti ruang lingkup task. Untuk penutupan proyek pada Milestone 5, seluruh syarat berikut wajib dipenuhi:

- Implementasi sesuai instruksi dan dokumen.
- Tidak merusak fungsi yang telah bekerja.
- Seluruh acceptance criteria wajib dan skenario uji relevan telah dijalankan serta hasilnya dicatat.
- Tidak ada defect blocker/critical yang belum diselesaikan.
- Tidak ada pelanggaran batasan privasi dan arsitektur.
- Build dan cara menjalankan prototipe secara lokal telah diverifikasi.
- Keterbatasan yang belum diverifikasi dinyatakan dengan jujur.
- README/panduan menjalankan dan laporan verifikasi diperbarui.
- Tidak diperlukan pilot pelanggan, metrik retensi, product-market-fit validation, atau deployment publik untuk menyatakan proyek selesai.

## 10. Sumber Teknis Acuan

Gunakan dokumentasi resmi dan periksa ulang sebelum implementasi dan verifikasi akhir:

- Document Picture-in-Picture API: https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API
- `requestWindow()`: https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture/requestWindow
- `DocumentPictureInPicture`: https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture
- Clipboard/Paste event: https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
- File API: https://developer.mozilla.org/en-US/docs/Web/API/File_API
- `URL.createObjectURL()`: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static
- `URL.revokeObjectURL()`: https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL_static
- Vite: https://vite.dev/guide/

**Prinsip utama:** Pahami dahulu, implementasikan secara sederhana, jaga gambar tetap lokal, dan verifikasi siklus PiP secara nyata.
