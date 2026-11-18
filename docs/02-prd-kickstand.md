# Dokumen Kebutuhan Produk (PRD) — Kickstand

**Nama Produk:** Kickstand  
**Tagline:** *Keep your reference in sight.*
**Deskripsi positioning:** Floating Visual Reference — alat web untuk menampilkan satu gambar referensi dalam jendela Document Picture-in-Picture saat pengguna bekerja di aplikasi lain.  
**Versi dokumen:** 1.2  
**Status proyek:** GO untuk membangun functional prototype setelah Technical PoC lulus; tidak ada target peluncuran komersial  
**Jenis Produk:** Browser-based floating visual reference utility for developers  
**Status pemeriksaan nama:** Kickstand adalah nama kerja proyek; pemeriksaan legal merek dagang, domain, dan handle sosial belum dilakukan dan bukan blocker untuk prototipe lokal.  
**Arsitektur:** Web app statis, pemrosesan gambar lokal di browser  
**Tanggal revisi:** 18 November 2026  

---

## 1. Ringkasan Produk

Kickstand adalah proyek web utility berbentuk **functional prototype** yang mendemonstrasikan cara mempertahankan **satu gambar referensi** agar tetap terlihat ketika seseorang bekerja di aplikasi lain. Pengguna memasukkan gambar melalui paste atau file picker, melihat preview, lalu membuka gambar tersebut di jendela Document Picture-in-Picture (Document PiP).

Konsep inti:

**Paste → Preview → Pop Out → Work with the reference visible → Close/Return.**

Kickstand bukan pengelola aset dan bukan reference board profesional. Produk ini berfokus pada kebutuhan sesaat (*ephemeral workflow*): pengguna membutuhkan satu screenshot, mockup, diagram, atau potongan desain selama mengerjakan tugas tertentu, lalu menutupnya ketika selesai.

Gambar diproses secara lokal di browser. Aplikasi tidak membutuhkan akun, backend, database, cloud storage, atau upload gambar.

### 1.1 Project verdict dan tujuan akhir

- **GO:** implementasikan Technical PoC untuk membuktikan input gambar, Document PiP, tampilan gambar, pembaruan gambar, dan lifecycle penutupan.
- **GO setelah PoC lulus:** lanjutkan ke functional prototype sesuai scope dokumen ini.
- **Hasil akhir:** aplikasi web yang dapat dijalankan secara lokal, mendemonstrasikan alur utama secara utuh, memiliki UI yang rapi, dan lulus verifikasi fungsi pada Milestone 5.
- **Bukan target:** membangun bisnis, mencari pelanggan, menguji product-market fit, memperoleh pengguna berulang, monetisasi, atau merilis layanan produksi.
- **Tidak diklaim:** product-market fit, diferensiasi komersial yang tervalidasi, jumlah pengguna potensial, atau retensi.

## 2. Konteks Masalah yang Didemonstrasikan

Developer atau designer yang bekerja dengan satu monitor sering perlu melihat referensi visual sambil menggunakan aplikasi utama seperti VS Code, Figma, browser, atau spreadsheet.

Alternatif saat ini memiliki friksi:

- Split-screen mengurangi area kerja aplikasi utama.
- Alt+Tab membuat pengguna berulang kali berpindah konteks.
- Membuka referensi di tab biasa mengharuskan pengguna kembali ke browser.
- Aplikasi always-on-top native atau extension dapat memerlukan instalasi, izin, atau persetujuan administrator.
- Reference board penuh fitur dapat terasa berlebihan ketika pengguna hanya perlu melihat satu screenshot untuk beberapa menit.

Proyek Kickstand mendemonstrasikan hipotesis pengalaman bahwa jalur **paste satu gambar lalu Pop Out** dapat menjadi solusi yang lebih ringan untuk kebutuhan sementara tersebut. Kebutuhan ini menjadi konteks desain prototipe, bukan komitmen untuk meluncurkan produk komersial.

## 3. Tujuan Proyek

### 3.1 Tujuan proyek

- Menghasilkan functional prototype Kickstand yang dapat dijalankan secara lokal.
- Mendemonstrasikan alur gambar dari paste atau file lokal hingga jendela Document PiP.
- Memastikan lifecycle gambar dan PiP bekerja dengan benar, termasuk replace, close, dan reopen.
- Mempertahankan rasio gambar dan memastikan gambar tidak terpotong.
- Menjaga pemrosesan gambar tetap lokal tanpa upload.
- Menghasilkan kode yang rapi, dokumentasi teknis, panduan menjalankan, dan laporan verifikasi.
- Menyediakan artefak proyek yang layak didemonstrasikan sebagai hasil pembelajaran/portofolio, tanpa kewajiban menjadi layanan komersial.

### 3.2 Bukan tujuan produk

Kickstand bukan:

- Pengganti PureRef atau reference board dengan kanvas tak terbatas.
- Pengelola file, asset library, atau gallery.
- Clipboard manager dengan riwayat global.
- Desktop window manager atau aplikasi native.
- Cara untuk melewati kebijakan administrator atau pembatasan browser.
- Aplikasi catatan, task manager, Pomodoro timer, atau project management.
- Screenshot editor atau image annotation tool.
- Aplikasi multi-user atau kolaborasi tim.

## 4. Skenario Pengguna

### 4.1 Primary scenario — konteks desain prototipe

**Frontend developer yang mengimplementasikan UI berdasarkan satu referensi visual dan sering bekerja pada satu monitor.** Persona ini digunakan untuk merancang skenario dan menguji alur prototipe; tidak dimaksudkan sebagai target akuisisi pelanggan.

Situasi spesifik:

- Developer membuka VS Code atau editor kode.
- Ia memiliki screenshot/mockup dari Figma, browser, issue tracker, atau pesan tim.
- Ia perlu melihat referensi saat coding.
- Split-screen membuat area kode terlalu sempit.
- Pindah tab atau Alt+Tab berulang kali mengganggu alur kerja.

### 4.2 Skenario sekunder — di luar fokus implementasi awal

- UI/UX designer yang hanya membutuhkan satu referensi sementara.
- QA engineer yang membandingkan satu screenshot dengan aplikasi.
- Penulis atau analyst yang membutuhkan satu diagram/tabel sementara.
- Mahasiswa yang melihat satu gambar atau rumus sambil mengerjakan tugas.

Jangan memasarkan semua segmen sekaligus. Validasi primary target terlebih dahulu.

## 5. Jobs-to-be-Done

> Ketika saya sedang bekerja di aplikasi utama dan perlu melihat satu gambar referensi secara bersamaan, saya ingin memunculkan gambar tersebut sebagai jendela kecil yang selalu terlihat, sehingga saya tidak harus terus berpindah tab atau membagi layar.

Job ini merupakan asumsi desain untuk membentuk alur demonstrasi. Wawancara, pilot pengguna, dan observasi pasar bukan prasyarat penyelesaian proyek.

## 6. Prinsip Prototipe

### 6.1 Ephemeral workflow

Kickstand mengutamakan kebutuhan sesaat: masukkan satu gambar, tampilkan di atas aplikasi lain, gunakan, lalu tutup. Tidak perlu menyimpan library atau history.

### 6.2 Single-image focus

Functional prototype menangani satu gambar aktif pada satu waktu. Pengguna dapat mengganti gambar aktif, tetapi tidak mengelola stack, gallery, carousel, atau banyak jendela.

### 6.3 Image-first

Pengalaman utama adalah referensi gambar, bukan catatan teks, video, timer, atau konten web arbitrer.

### 6.4 Local-first

File diproses di browser dan tidak diunggah oleh aplikasi. Jangan menyebut produk “100% secure”; gunakan klaim spesifik dan sesuai implementasi.

### 6.5 Keandalan sebelum dekorasi

Bukti bahwa Document PiP bekerja dan menangani lifecycle dengan benar lebih penting daripada landing page, animasi, atau branding yang selesai lebih dahulu.

## 7. Ruang Lingkup dan Tahapan Proyek

### 7.1 Phase 1 — Technical Proof of Concept (GO)

Tujuan: membuktikan teknologi inti sebelum membangun aplikasi yang lebih lengkap.

Termasuk:

- Input satu gambar melalui paste event.
- File picker sebagai fallback.
- Preview gambar pada halaman utama.
- Feature detection untuk Document PiP.
- Tombol Pop Out yang membuka jendela native Document PiP.
- Gambar ditampilkan pada PiP dengan `object-fit: contain`.
- Penutupan PiP melalui kontrol native browser.
- Gambar tetap tersedia pada halaman utama setelah PiP ditutup.
- Reopen PiP untuk gambar yang sama.
- Mengganti gambar ketika PiP aktif dan memperbarui gambar dalam jendela yang sama.
- Error handling dasar.

Tidak termasuk Phase 1:

- UI final atau branding lengkap.
- Drag-and-drop polish.
- Zoom, Pan, Actual Size, atau tool gambar.
- Multiple images, Reference Stack, carousel, atau multiple PiP windows.
- Timer/stopwatch.
- Akun, backend, analytics, cloud storage.

### 7.2 Phase 2 — Functional Prototype (GO setelah PoC lulus)

Phase ini dimulai setelah Phase 1 lulus. Tidak diperlukan validasi pasar atau persetujuan calon pengguna karena tujuan proyek adalah menghasilkan prototipe fungsional, bukan layanan komersial.

Fitur inti:

- Paste gambar ketika halaman Kickstand aktif.
- File picker sebagai fallback yang jelas.
- Drag-and-drop gambar ke area input.
- Preview utama.
- Pop Out melalui Document PiP.
- Auto-fit dengan `object-fit: contain` dan aspect ratio dipertahankan.
- Gambar utama tetap tersedia ketika PiP ditutup.
- Reopen PiP.
- Replace image; jika PiP sedang aktif, gambar di PiP diperbarui.
- Status browser support dan pesan error yang jelas.
- Batas ukuran file dan validasi format.
- Pemrosesan lokal tanpa upload.

### 7.3 Di luar scope functional prototype

- Reference Stack / multiple image carousel.
- Multiple floating windows.
- Zoom, Pan, annotation, crop, image editing.
- Timer, stopwatch, Pomodoro.
- Text snippets atau sticky notes.
- Cloud sync, history, gallery, IndexedDB persistence.
- User account, team, collaboration.
- Browser extension dan desktop application.
- AI feature.
- PDF, video, SVG, animated GIF, atau format lain di luar PNG/JPEG/WebP.
- Global hotkey yang bekerja ketika halaman browser tidak fokus.
- Automatic PiP window positioning.

Fitur di luar scope hanya dapat masuk setelah pemilik proyek menyetujui perubahan PRD secara eksplisit.

## 8. Input dan Alur Pengguna

### 8.1 Metode input

1. **Paste:** tekan Ctrl+V ketika tab Kickstand sedang aktif dan fokus halaman memungkinkan paste. Implementasi utama memakai `paste` event dan `event.clipboardData`.
2. **File picker:** pengguna memilih satu gambar dari perangkat.
3. **Drag-and-drop:** pada functional prototype, pengguna dapat menjatuhkan satu gambar ke area dropzone.

Jangan menjanjikan aplikasi bisa menangkap clipboard global dari aplikasi lain ketika tab tidak fokus. Pengguna harus menyalin gambar dari sumbernya, lalu melakukan paste pada halaman Kickstand.

### 8.2 Format file yang didukung

Allowlist awal:

- PNG (`image/png`).
- JPEG/JPG (`image/jpeg`).
- WebP (`image/webp`).

SVG, GIF animasi, video, PDF, dan format lain tidak didukung pada functional prototype.

Batas ukuran awal 20 MiB dapat digunakan sebagai nilai provisional untuk pengujian. Angka final harus ditetapkan berdasarkan pengujian perangkat dan tidak boleh dianggap jaminan universal.

### 8.3 Alur utama

1. Pengguna membuka Kickstand pada browser desktop yang mendukung Document PiP.
2. Pengguna menyalin satu gambar dari aplikasi sumber.
3. Pengguna kembali ke tab Kickstand dan menekan Ctrl+V, atau memakai file picker/drag-and-drop.
4. Kickstand memvalidasi tipe dan ukuran, lalu menampilkan preview.
5. Pengguna menekan tombol Pop Out.
6. Browser membuka jendela native Document PiP.
7. Gambar tampil dengan rasio asli, tanpa crop atau distorsi.
8. Pengguna berpindah ke aplikasi utama seperti VS Code atau Figma.
9. Gambar tetap berada di jendela PiP sesuai perilaku browser/OS.
10. Pengguna menutup PiP menggunakan kontrol native.
11. Halaman utama tetap menampilkan gambar dan menyediakan aksi Pop Out kembali.

### 8.4 Replace image saat PiP aktif

Jika pengguna kembali ke halaman Kickstand dan melakukan paste/upload gambar baru saat PiP terbuka:

- Preview utama diperbarui.
- Gambar dalam jendela PiP yang sama diperbarui.
- Jangan membuka PiP kedua.
- Jangan revoke Blob URL lama sebelum kedua elemen gambar berhenti menggunakannya.
- Status tombol tetap menunjukkan bahwa PiP sedang aktif; jangan membuat tombol seolah bisa membuka jendela kedua.

## 9. Perilaku Document Picture-in-Picture

### 9.1 API dan browser support

Document PiP memungkinkan halaman membuka jendela always-on-top berisi HTML. API memerlukan secure context dan transient user activation.

Status acuan MDN pada 17 November 2026:

| Browser | Status yang dicatat MDN | Kebijakan prototype |
|---|---|---|
| Chrome desktop 116+ | Full support | Target utama |
| Edge desktop 116+ | Full support | Target utama |
| Opera desktop 102+ | Full support | Pengujian tambahan |
| Firefox 151+ | Preview support | Eksperimental, bukan target utama |
| Safari desktop | Tidak didukung | Preview main-page saja |
| Mobile browsers | Tidak menjadi target | Tampilkan keterbatasan |

Periksa ulang tabel kompatibilitas sebelum verifikasi akhir.

### 9.2 Batasan yang wajib dijelaskan

- Jendela PiP tidak dapat hidup lebih lama daripada halaman/tab pembukanya.
- Website tidak dapat menentukan posisi jendela di layar.
- Browser dapat membatasi ukuran awal yang diminta.
- Satu tab dibatasi satu Document PiP window; browser dapat menerapkan batas tambahan.
- Jendela dapat tertutup karena pengguna, browser, atau lifecycle tab.
- Always-on-top bukan jaminan bahwa PiP berada di atas setiap fullscreen, secure desktop, atau jendela OS.
- Kebijakan browser/administrator dapat menonaktifkan API.

### 9.3 Ukuran dan tampilan

- Minta ukuran awal yang wajar, misalnya sekitar 480 × 360 CSS px, atau hitung ukuran berdasarkan rasio gambar dengan batas maksimum.
- Selalu berikan `width` dan `height` bersama-sama bila keduanya digunakan.
- Ukuran merupakan request, bukan janji ukuran final.
- Gambar harus memakai `object-fit: contain`.
- Jangan melakukan crop atau memaksa rasio gambar.
- Pengguna dapat mengubah ukuran jendela melalui kontrol native browser bila browser mengizinkan.

## 10. UX States dan Perilaku Kontrol

### 10.1 Empty state

- Belum ada gambar.
- Tampilkan cara paste, tombol pilih file, dan area dropzone.
- Tombol Pop Out nonaktif.

### 10.2 Image loaded state

- Preview terlihat.
- Nama file boleh ditampilkan secara lokal bila tersedia, tetapi tidak perlu dipertahankan setelah sesi.
- Pop Out aktif hanya jika Document PiP didukung dan tidak sedang membuka/aktif.
- Sediakan ganti/hapus gambar.

### 10.3 PiP opening state

- Cegah klik ganda.
- Beri feedback status seperlunya.
- Jika request gagal, kembalikan state kontrol dan tampilkan pesan yang bisa ditindaklanjuti.

### 10.4 PiP active state

- Main page menandai bahwa referensi sedang floating.
- Tombol Pop Out tidak membuka window kedua.
- Replace image memperbarui PiP yang sudah ada.

### 10.5 PiP closed state

- Tangani `pagehide`.
- Hapus referensi window dan elemen PiP yang telah ditutup.
- Preview utama tetap tersedia.
- Pop Out kembali aktif jika kondisi lain mengizinkan.

### 10.6 Unsupported/error state

- Jelaskan bila browser tidak mendukung atau API dinonaktifkan.
- Upload dan preview tetap dapat digunakan.
- Jangan menyamarkan preview biasa sebagai floating always-on-top.
- Jangan menampilkan stack trace mentah.

## 11. Arsitektur Teknis

### 11.1 Stack

- HTML5.
- CSS3 murni.
- Vanilla JavaScript ES Modules.
- Vite untuk development dan build.
- Document Picture-in-Picture API.
- Clipboard Event API.
- File API.
- Blob API dan Object URL.

React tidak dilarang karena ketidakcocokan; React Portal secara teknis dapat digunakan. Namun, Vanilla JavaScript dipilih karena kebutuhan awal tidak memerlukan framework dan merupakan jalur implementasi paling sederhana.

### 11.2 Struktur project yang disarankan

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

Struktur ini bersifat rekomendasi. Pertahankan struktur repository yang sudah ada bila lebih tepat.

### 11.3 State minimum

State konseptual yang perlu dikelola:

- `currentFile` atau `currentBlob`.
- `currentBlobUrl`.
- `pipWindow`.
- `pipImageElement`.
- `isOpeningPiP`.
- `isPiPOpen`.
- `isPiPSupported`.
- Status error/feedback.

Jangan menambah state management library.

### 11.4 Image lifecycle

- Buat Blob URL baru untuk file baru.
- Update main preview dan PiP image (jika aktif) ke URL baru.
- Tunggu consumer berpindah atau gambar baru berhasil dimuat sebelum revoke URL lama.
- Jangan revoke URL yang masih digunakan image element.
- Saat PiP ditutup, gambar utama tetap memakai URL aktif.
- Bersihkan URL aktif setelah input dihapus atau halaman ditutup, sesuai lifecycle.

### 11.5 PiP lifecycle

- Periksa feature detection sebelum mengaktifkan Pop Out.
- Panggil `requestWindow()` langsung dari click handler.
- Gunakan guard untuk mencegah request bersamaan.
- Tangani `pagehide`.
- Jangan memindahkan main preview element ke PiP document; buat image element terpisah dengan Blob URL yang sama.
- Masukkan style yang dibutuhkan ke PiP document secara eksplisit.

## 12. Privasi dan Keamanan Produk

- Tidak ada upload gambar.
- Tidak ada backend, database, cloud storage, atau akun.
- Tidak ada analytics/telemetry pihak ketiga.
- Tidak menyimpan gambar secara permanen di localStorage, IndexedDB, atau filesystem.
- Gambar hanya berada di memori selama halaman berjalan.
- Validasi MIME type dengan allowlist dan validasi ukuran.
- Tangani gambar yang gagal didekode.
- Jangan menerima SVG untuk functional prototype.
- Jangan mengirim data gambar dalam URL, query string, log, atau report.
- Static hosting tetap perlu mengirim aset aplikasi ke browser ketika pengguna membuka website; itu berbeda dari upload gambar pengguna.

Klaim yang diperbolehkan:

> Images are processed locally in your browser. Kickstand does not upload your images.

Jangan mengklaim “100% secure”, “military-grade privacy”, atau “completely offline” tanpa dukungan implementasi.

## 13. Persyaratan Non-Fungsional

### 13.1 Kinerja

- Halaman utama harus ringan dan tidak memuat library besar yang tidak dibutuhkan.
- Preview harus muncul tanpa upload jaringan.
- Hindari konversi gambar yang tidak perlu.
- Batasi ukuran file berdasarkan pengujian perangkat.
- Tidak ada memory leak ketika gambar diganti berkali-kali.

### 13.2 Kemudahan penggunaan

- Pengguna dapat memahami cara memasukkan gambar tanpa tutorial panjang.
- Aksi Pop Out harus jelas setelah gambar tersedia.
- Status PiP aktif/tertutup harus dapat dipahami.
- Error menjelaskan tindakan yang dapat dilakukan.

### 13.3 Keandalan

- Gambar tidak terdistorsi.
- Penutupan PiP tidak menghilangkan preview.
- Reopen PiP tidak membuat state ganda.
- Replace image memperbarui main preview dan PiP secara konsisten.
- Unsupported browser tidak menghasilkan tombol yang seolah-olah berfungsi.

### 13.4 Aksesibilitas

- Seluruh kontrol dapat diakses melalui keyboard.
- File picker memiliki label.
- Status dan error dapat dibaca teknologi bantu.
- Focus state terlihat.
- Kontras warna teks memenuhi WCAG AA sejauh berlaku.

## 14. Audit terhadap Kode PoC Gemini yang Dilampirkan

Kode dalam lampiran Gemini **belum dianggap baseline yang tervalidasi**. Kode harus diaudit dan diperbaiki sebelum disalin ke repository.

Temuan yang harus diperiksa:

1. **Urutan revoke Blob URL:** contoh memanggil `URL.revokeObjectURL(currentBlobUrl)` sebelum mengganti `src` gambar PiP. Ini berisiko memutus resource yang masih dipakai. Buat URL baru, update semua consumer, lalu revoke URL lama setelah aman.
2. **Status browser unsupported:** `init()` hanya menampilkan error, tetapi `handleImageFile()` kemudian mengaktifkan tombol Pop Out tanpa mempertimbangkan dukungan API. Simpan status support dan jaga tombol tetap nonaktif bila unsupported.
3. **Paste event fallback:** `e.originalEvent` bukan properti standar Event browser dan dapat menyebabkan error. Gunakan `e.clipboardData?.items` serta guard untuk `items` dan `getAsFile()`.
4. **Klik Pop Out ganda:** `pipWindow` baru diisi setelah `await requestWindow()`. Gunakan flag `isOpeningPiP` dan disable tombol secara sinkron sebelum menunggu Promise.
5. **Validasi tipe file:** `file.type.startsWith('image/')` lebih luas daripada format yang dijanjikan input. Gunakan allowlist PNG/JPEG/WebP.
6. **Replace image saat PiP aktif:** contoh mengaktifkan kembali tombol Pop Out setelah gambar diganti, padahal PiP masih terbuka. Pertahankan state tombol yang konsisten dan update jendela yang sama.
7. **Drag-and-drop:** fitur tersebut tercantum dalam rencana input, tetapi tidak diimplementasikan pada kode PoC yang dilampirkan. Jangan mengklaim sudah tersedia.
8. **Image decode error:** tambahkan penanganan ketika file bertipe gambar tetapi gagal didekode.
9. **File picker memilih file yang sama:** reset nilai input setelah file diproses bila diperlukan agar pemilihan ulang memicu change event.
10. **Ukuran awal PiP:** width dan height yang dipotong secara terpisah dapat menghasilkan rasio jendela yang kurang sesuai. Hitung ukuran awal secara proporsional dan ingat bahwa browser dapat membatasi request tersebut.
11. **Error handling:** jangan menampilkan error mentah tanpa konteks. Berikan pesan yang aman dan mudah dimengerti.
12. **Lifecycle cleanup:** pastikan object URL aktif tidak dicabut saat masih digunakan oleh main preview atau PiP image.

Jangan menandai temuan tersebut sebagai sudah diperbaiki sampai kode baru benar-benar diperiksa dan diuji.

## 15. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Document PiP tidak tersedia | Fitur inti tidak dapat digunakan | Feature detection dan fallback preview |
| API dinonaktifkan kebijakan browser | Request gagal | Error handling dan panduan pengguna |
| Tab utama ditutup | PiP ikut ditutup | Jelaskan lifecycle dan jangan menjanjikan persistence |
| Browser/OS menutupi PiP pada kondisi tertentu | Always-on-top tidak konsisten | Uji window manager; jangan menjamin semua fullscreen |
| Paste tidak memberikan image item | Input gagal | File picker dan drag-and-drop fallback |
| File besar | Memori/CPU tinggi | Batas ukuran provisional dan feedback |
| Object URL direvoke terlalu cepat | Gambar rusak/hilang | Lifecycle URL yang aman |
| Kompetitor menawarkan fungsi serupa | Diferensiasi komersial belum terbukti | Dokumentasikan alternatif dan batas prototipe; diferensiasi pasar bukan kriteria penyelesaian proyek |
| Kebutuhan penggunaan berulang tidak diketahui | Nilai komersial belum dapat disimpulkan | Catat sebagai keterbatasan konteks; tidak memblokir penyelesaian functional prototype |

## 16. Milestone Pengembangan

### Milestone 0 — Repository dan Dokumen

- Periksa struktur repository Antigravity.
- Pastikan tiga dokumen `docs/` tersedia.
- Periksa Git status dan stack existing.
- Jangan menimpa project existing tanpa inspeksi.

**Exit criteria:** struktur dan kondisi repository dipahami.

### Milestone 1 — Technical Proof of Concept

- Buat project minimal HTML/CSS/Vanilla JS dengan Vite.
- Paste satu gambar melalui `paste` event.
- Upload satu gambar sebagai fallback.
- Tampilkan main preview.
- Buka Document PiP melalui klik pengguna.
- Render image element terpisah dalam PiP document.
- Terapkan `object-fit: contain`.
- Tangani `pagehide`, close, dan reopen.

**Exit criteria:** PoC lulus pada Chrome desktop dan Edge desktop yang didukung; hasil pengujian dicatat. Jika gagal, jangan lanjut ke milestone berikutnya.

### Milestone 2 — Input dan Image Lifecycle yang Andal

- Perbaiki validasi MIME dan ukuran.
- Tambahkan drag-and-drop.
- Tangani image decode error.
- Update gambar saat PiP aktif.
- Perbaiki object URL cleanup.
- Cegah request PiP ganda.
- Uji unsupported browser dan error paths.

**Exit criteria:** seluruh acceptance criteria input/lifecycle terpenuhi.

### Milestone 3 — UI/UX Functional Prototype

- Implementasikan main page sesuai `03-design-systems.md`.
- Tambahkan empty, loaded, active PiP, unsupported, loading, dan error states.
- Selesaikan microcopy, feedback, keyboard access, dan visual hierarchy.
- Pastikan PiP memiliki stylesheet dan tampilan yang benar.
- Pertahankan scope satu gambar aktif dan satu PiP window.

**Exit criteria:** melalui walkthrough dan pengujian internal, alur utama dapat diselesaikan dengan mengikuti petunjuk UI tanpa instruksi lisan dari orang lain; tidak ada elemen UI yang tampak aktif tetapi belum berfungsi.

### Milestone 4 — Integrasi dan Stabilization

- Integrasikan seluruh fungsi input, preview, replace, Pop Out, close, dan reopen.
- Jalankan pemeriksaan sintaks, lint bila tersedia, dan production build lokal.
- Perbaiki bug yang ditemukan selama integrasi.
- Uji kondisi file invalid, file terlalu besar, image decode error, API unsupported/disabled, serta tab close.
- Periksa responsive layout, keyboard access, dan status/error feedback.
- Inspeksi Network dan lifecycle Blob URL untuk memastikan gambar tidak dikirim keluar dan resource dibersihkan dengan benar.
- Siapkan daftar skenario uji final untuk Milestone 5.

**Exit criteria:** aplikasi terintegrasi dan stabil untuk memasuki verifikasi akhir; seluruh defect yang diketahui dicatat dan tidak ada blocker yang sengaja disembunyikan.

### Milestone 5 — Final Functional Verification dan Project Handoff

Milestone ini adalah tahap akhir proyek. Tujuannya memverifikasi bahwa seluruh fungsi yang termasuk scope benar-benar bekerja dan menyiapkan hasil proyek agar dapat dijalankan serta didemonstrasikan kembali.

- Jalankan seluruh acceptance criteria pada Bagian 17 dan seluruh skenario uji pada Bagian 18.
- Verifikasi alur end-to-end: paste, upload, drag-and-drop, preview, Pop Out, replace saat PiP aktif, close, dan reopen.
- Ulangi siklus PiP dan pergantian gambar beberapa kali untuk menemukan state bug, duplikasi window, dan masalah Blob URL.
- Verifikasi browser target utama (Chrome desktop dan Edge desktop) serta jalur fallback pada browser unsupported yang tersedia untuk pengujian.
- Jalankan instalasi dependency dari lockfile, development server, dan production build/preview lokal.
- Periksa Console, error handling, aksesibilitas dasar, layout responsif, dan Network.
- Pastikan tidak ada request yang mengirim gambar atau Blob pengguna ke layanan eksternal.
- Perbaiki defect blocker/critical dan regression yang ditemukan; jalankan ulang pengujian terkait setelah perbaikan.
- Perbarui README atau panduan lokal: prasyarat, cara instalasi, cara menjalankan, cara membangun, batas browser, dan cara mencoba alur demo.
- Buat laporan verifikasi yang mencatat skenario, browser/versi, hasil pass/fail, bukti yang tersedia, serta known limitations.
- Siapkan urutan demo singkat agar proyek mudah diperlihatkan. Screenshot atau screen recording boleh dibuat sebagai artefak tambahan, tetapi tidak wajib kecuali diminta pengguna.

**Exit criteria:** seluruh acceptance criteria wajib berstatus lulus atau memiliki pengecualian yang secara eksplisit disetujui pengguna; tidak ada blocker/critical defect yang belum ditangani; build dan cara menjalankan lokal berhasil; pemeriksaan privasi lolos; dokumentasi serta laporan verifikasi lengkap. Hasil akhir diberi status **Verified Functional Prototype**, bukan commercial release atau production-ready service.

**Bukan bagian Milestone 5:** pilot pelanggan, wawancara pasar wajib, pengukuran retensi, product-market-fit validation, monetisasi, marketing campaign, domain/trademark clearance, deployment publik, atau keputusan go-to-market.

## 17. Acceptance Criteria

### 17.1 Technical PoC

- [ ] `npm install` berhasil pada environment pengembangan.
- [ ] `npm run dev` menjalankan aplikasi.
- [ ] Paste PNG berhasil pada browser target.
- [ ] Paste JPEG/WebP berhasil bila clipboard sumber menyediakan format tersebut.
- [ ] File picker menerima format yang diizinkan.
- [ ] File tidak didukung ditolak dengan pesan jelas.
- [ ] Preview muncul dengan rasio asli.
- [ ] Pop Out membuka native Document PiP pada browser yang mendukung.
- [ ] `requestWindow()` dipanggil langsung dari interaksi pengguna.
- [ ] Gambar muncul di PiP tanpa crop atau distorsi.
- [ ] Resize jendela tidak memotong gambar.
- [ ] Menutup PiP mempertahankan main preview.
- [ ] PiP dapat dibuka kembali.
- [ ] Mengganti gambar ketika PiP aktif memperbarui jendela yang sama.
- [ ] Klik ganda tidak membuka request PiP bersamaan.
- [ ] Object URL lama hanya direvoke setelah tidak digunakan.
- [ ] Tidak ada upload gambar ke server.
- [ ] Hasil test dicatat dengan browser dan versi yang digunakan.

### 17.2 Functional Prototype

Selain seluruh kriteria PoC:

- [ ] Drag-and-drop satu gambar berfungsi.
- [ ] Empty, loaded, active, unsupported, dan error states lengkap.
- [ ] File besar ditangani dengan baik sesuai batas yang ditetapkan.
- [ ] Gambar gagal decode ditangani.
- [ ] File yang sama dapat dipilih kembali.
- [ ] Semua kontrol dapat digunakan melalui keyboard.
- [ ] Tidak ada console error yang tidak tertangani pada skenario utama.
- [ ] Network inspection tidak menunjukkan transfer file gambar.

## 18. Skenario Uji Minimum

### Skenario A — Paste gambar valid

1. Buka tab Kickstand.
2. Salin screenshot PNG dari aplikasi lain.
3. Fokuskan halaman Kickstand dan tekan Ctrl+V.
4. Pastikan preview muncul.
5. Klik Pop Out.
6. Pastikan jendela native PiP tampil dengan gambar yang sama.

**Hasil yang diharapkan:** gambar dapat dipreview dan difloating tanpa upload.

### Skenario B — Upload fallback

1. Pilih file PNG/JPEG/WebP melalui file picker.
2. Pastikan preview muncul.
3. Pop Out.

**Hasil yang diharapkan:** alur sama dengan paste.

### Skenario C — Replace image saat PiP aktif

1. Buka gambar pertama di PiP.
2. Kembali ke tab Kickstand.
3. Paste atau upload gambar kedua.
4. Pastikan main preview dan jendela PiP menampilkan gambar kedua.
5. Pastikan tidak ada PiP kedua.

**Hasil yang diharapkan:** satu jendela aktif diperbarui dan URL lama dibersihkan setelah aman.

### Skenario D — Close dan reopen

1. Buka PiP.
2. Tutup melalui kontrol native.
3. Pastikan main preview tetap ada.
4. Buka PiP kembali.

**Hasil yang diharapkan:** lifecycle pulih tanpa kehilangan gambar.

### Skenario E — Browser tidak mendukung

1. Buka di Safari desktop atau browser tanpa API.
2. Masukkan gambar.

**Hasil yang diharapkan:** preview tetap bekerja; Pop Out dinonaktifkan dan alasan dijelaskan.

### Skenario F — File invalid/terlalu besar

1. Pilih file bukan gambar atau format tidak didukung.
2. Pilih gambar yang gagal didekode atau melebihi batas ukuran.

**Hasil yang diharapkan:** error aman dan dapat dipahami; state gambar sebelumnya tidak rusak tanpa penjelasan.

## 19. Kriteria Kualitas Proyek dan Verifikasi Akhir

Bagian ini menilai keberhasilan Kickstand sebagai functional prototype dan artefak proyek, bukan sebagai bisnis atau produk yang diluncurkan ke pasar. Tidak ada target akuisisi pengguna, retensi, konversi, atau product-market fit.

### 19.1 Kriteria penyelesaian teknis

| Indikator | Kriteria penyelesaian |
|---|---|
| Acceptance criteria wajib | Seluruhnya lulus atau pengecualian disetujui dan dicatat |
| Browser target utama | Alur inti lulus pada Chrome desktop dan Edge desktop yang benar-benar diuji |
| PiP lifecycle | Open, replace/update, close, dan reopen berhasil dalam pengujian berulang |
| Input gambar | Paste dan file picker lulus; drag-and-drop lulus jika masuk implementasi milestone |
| Error handling | Skenario unsupported, invalid file, file terlalu besar, dan decode error diperiksa |
| Build | Instalasi dari lockfile dan production build lokal berhasil |
| Privasi | Network inspection tidak menunjukkan upload gambar/Blob pengguna |
| Dokumentasi | Cara menjalankan, batasan, skenario demo, dan laporan verifikasi tersedia |

### 19.2 Pemeriksaan kualitas penggunaan

- Pengguna dapat memahami input dan Pop Out tanpa tutorial panjang.
- Main preview tetap tersedia setelah PiP ditutup.
- Status PiP aktif, tertutup, unsupported, dan error dapat dibedakan.
- Kontrol dapat diakses menggunakan keyboard.
- Layout tidak mengalami horizontal overflow pada ukuran layar yang diuji.
- Gambar tidak terpotong atau terdistorsi pada ukuran PiP yang diuji.

### 19.3 Pengujian berulang yang disarankan

- Jalankan minimal 5 siklus Pop Out → Close → Reopen pada satu sesi pengujian.
- Uji pergantian gambar beberapa kali saat PiP aktif.
- Uji file yang sama dipilih kembali setelah penghapusan atau penggantian.
- Catat error console dan perubahan perilaku yang tidak konsisten.
- Jangan menyatakan memory leak tidak ada hanya berdasarkan satu kali pengujian; dokumentasikan metode pemeriksaan yang benar-benar dilakukan.

### 19.4 Hal yang tidak diukur sebagai syarat proyek selesai

- Jumlah pengguna atau pengunjung.
- Penggunaan ulang minggu berikutnya dan retensi.
- Kesediaan membayar atau monetisasi.
- Product-market fit.
- Pertumbuhan, akuisisi, atau conversion rate.
- Kepuasan pasar berskala luas.

Uji informal dengan teman atau calon pengguna boleh dilakukan untuk menemukan usability issue, tetapi bersifat opsional dan bukan exit criteria Milestone 5.

## 20. Positioning, Alternatif, dan Diferensiasi

### 20.1 Identitas merek dan positioning

**Nama produk:** Kickstand  
**Kategori:** Floating Visual Reference  
**Tagline:** *Keep your reference in sight.*  
**Core promise:** Turn one image into a floating reference window while you work.  
**Workflow:** Paste. Pop Out. Keep Working.

Metafora merek berasal dari kickstand fisik: penyangga yang membuat perangkat tetap berdiri pada sudut pandang yang nyaman sehingga layarnya dapat dilihat tanpa harus terus dipegang. Secara digital, Kickstand membantu satu gambar referensi tetap terlihat di jendela PiP sementara pengguna bekerja di aplikasi utama.

Kickstand bukan clipboard manager global. Paste hanya berfungsi ketika halaman Kickstand menerima event paste; pengguna tetap harus kembali ke tab aplikasi untuk menempelkan gambar. Positioning harus menjelaskan manfaat tersebut tanpa mengklaim clipboard global atau always-on-top universal.

**Catatan nama:** Kickstand adalah nama kerja resmi untuk proyek/prototipe ini, tetapi dokumen ini tidak menyatakan nama telah mendapat legal clearance. Pemeriksaan formal merek dagang, domain, dan handle sosial bukan syarat penyelesaian proyek lokal. Jika prototipe kelak dipublikasikan sebagai produk, dipasarkan, atau digunakan secara komersial, lakukan pemeriksaan formal pada wilayah dan kelas barang/jasa target. Jangan menganggap catatan historis yang cancelled/abandoned sebagai bukti otomatis bahwa nama tersedia atau tidak tersedia.

### 20.2 Alternatif dan kompetitor yang perlu dipantau

Daftar berikut merupakan konteks alternatif yang sudah diperhatikan selama perancangan. Fitur kompetitor dapat berubah; verifikasi ulang hanya diperlukan bila hasil proyek kelak dipakai untuk membuat klaim komparatif publik.

| Produk/alternatif | Kategori | Relevansi untuk Kickstand |
|---|---|---|
| AlwaysOnTopNotes — https://alwaysontopnotes.com/ | Web-based floating notes | Alternatif Document PiP tanpa instalasi; fokus utama pada catatan teks |
| PiP Pro — https://chromewebstore.google.com/detail/pip-pro-picture-in-pictur/jgicglkgkeagfglifmofmnongfnpbkjc | Browser extension | Produktivitas PiP multi-konten; instalasi extension diperlukan |
| picture-always-on-top — https://github.com/NevadaCities/picture-always-on-top | Open-source image PiP | Implementasi sangat dekat dengan alur paste/upload image-to-PiP |
| PureRef — https://www.pureref.com/ | Desktop reference board | Kuat untuk banyak referensi dan canvas; memerlukan instalasi aplikasi |
| Microsoft PowerToys Always On Top — https://learn.microsoft.com/en-us/windows/powertoys/always-on-top | OS utility | Alternatif native Windows untuk mengambangkan jendela aplikasi |

Jangan menyebut Reference Stack sebagai fitur unik. Analisis terakhir menyepakati **single-image floating reference** untuk functional prototype.

### 20.3 Diferensiasi sebagai konteks demonstrasi

- Image-first, bukan text-first.
- Satu referensi visual untuk kebutuhan sesaat.
- Jalur paste/upload → preview → Pop Out yang ringkas.
- Tidak membutuhkan akun, extension, atau instalasi desktop.
- Pemrosesan gambar tetap lokal.

Diferensiasi ini masih dapat ditiru dan tidak diuji sebagai keunggulan kompetitif melalui riset pasar dalam scope proyek. Dalam konteks ini, positioning tersebut hanya menjadi alasan desain dan konteks demonstrasi, bukan klaim keunggulan pasar.

## 21. Status Proyek dan Definisi Versi Internal

Kickstand dibuat sebagai functional prototype dan artefak demonstrasi. Proyek ini tidak memiliki target commercial launch atau production release.

- **PoC 0.1:** membuktikan alur image input dan Document PiP.
- **Prototype 0.2:** input yang andal, replace image, UI/UX, error states, dan integrasi seluruh fungsi.
- **Verified Prototype 0.3:** seluruh acceptance criteria dan skenario uji diverifikasi, defect penting ditangani, build lokal berhasil, dan dokumentasi/handoff lengkap.

Nomor versi di atas adalah label internal untuk tahapan hasil proyek, bukan janji rilis publik atau versi layanan komersial. Deployment publik, domain, hosting, marketing, dan operasional tidak termasuk scope kecuali diminta secara eksplisit oleh pengguna.

Kode PoC dari Gemini yang dilampirkan pada 17 November 2026 merupakan kandidat awal untuk audit, bukan implementasi yang sudah lulus acceptance criteria. Jangan memberi label “tested”, “complete”, atau “verified” sebelum pengujian benar-benar dilakukan. Status akhir yang boleh digunakan setelah Milestone 5 lulus adalah **Verified Functional Prototype**; jangan menyebutnya “production-ready service”.
