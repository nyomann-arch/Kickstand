# Kickstand — Daftar Skenario Uji Final (Milestone 5)

Checklist verifikasi akhir berdasarkan PRD Bagian 17 (Acceptance Criteria),
Bagian 18 (Skenario Uji Minimum), dan Bagian 19 (Kriteria Kualitas).

Isi kolom **Hasil** dengan `Pass` / `Fail` / `N/A`, catat versi browser,
dan tambahkan bukti (screenshot/log) bila diperlukan.

## 0. Lingkungan

| Item | Nilai |
|---|---|
| Tanggal uji | 20 November 2026 |
| Browser + versi | Menunggu uji manual (target: Chrome/Edge desktop) |
| OS | Windows (MSYS_NT-10.0-26300) |
| Node.js / npm | v25.5.0 / 11.8.0 |
| Perintah | `npm ci`, lalu `npm run dev` atau `npm run build` + `npm run preview` |

## 1. Acceptance Criteria — Technical PoC (PRD 17.1)

| # | Kriteria | Skenario | Hasil | Catatan |
|---|---|---|---|---|
| 1 | `npm install` berhasil | Instalasi dari lockfile | Pass | `npm ci`: 14 packages, 0 vulnerabilities |
| 2 | `npm run dev` menjalankan aplikasi | Buka `http://localhost:5173` | Pass | Dev server aktif, HTTP 200 |
| 3 | Paste PNG berhasil | Skenario A | Menunggu uji manual | — |
| 4 | Paste JPEG/WebP berhasil | Clipboard sumber menyediakan format tsb | Menunggu uji manual | — |
| 5 | File picker menerima format yang diizinkan | Skenario B | Menunggu uji manual | — |
| 6 | File tidak didukung ditolak dengan pesan jelas | Skenario F | Pass (audit) | Allowlist PNG/JPEG/WebP + pesan error di `handleFile()` |
| 7 | Preview muncul dengan rasio asli | Semua skenario input | Pass (audit) | `object-fit: contain`, dimensi natural dari decode probe |
| 8 | Pop Out membuka native Document PiP | Browser target | Menunggu uji manual | — |
| 9 | `requestWindow()` dari interaksi pengguna | Audit kode / click handler | Pass | Dipanggil sinkron di `openPiP()` dari click handler; tidak ada await sebelum request |
| 10 | Gambar di PiP tanpa crop/distorsi | `object-fit: contain` | Pass | `PIP_CSS` memakai `object-fit: contain` |
| 11 | Resize jendela tidak memotong gambar | Ubah ukuran PiP native | Menunggu uji manual | — |
| 12 | Menutup PiP mempertahankan main preview | Skenario D | Menunggu uji manual | — |
| 13 | PiP dapat dibuka kembali | Skenario D | Menunggu uji manual | — |
| 14 | Ganti gambar saat PiP aktif memperbarui window yang sama | Skenario C | Pass (audit) | `handleFile()` mengupdate `pipImageElement.src`; tidak ada PiP kedua |
| 15 | Klik ganda tidak membuka request PiP bersamaan | Double-click cepat Pop Out | Pass | Guard `isOpeningPiP` + tombol di-disable sinkron |
| 16 | Object URL lama hanya direvoke setelah tidak digunakan | Uji berulang + inspeksi | Pass (audit) | URL baru dibuat → consumer diupdate → `revokeAfterSwitch()` via `queueMicrotask` |
| 17 | Tidak ada upload gambar ke server | Network inspection | Pass | Tidak ada `fetch`/XHR/`sendBeacon`/WebSocket; build tidak memuat referensi eksternal |
| 18 | Hasil test dicatat dengan browser dan versi | Laporan verifikasi | Pass | Dokumen ini |

## 2. Acceptance Criteria — Functional Prototype (PRD 17.2)

| # | Kriteria | Skenario | Hasil | Catatan |
|---|---|---|---|---|
| 1 | Drag-and-drop satu gambar berfungsi | Drop file ke dropzone | Menunggu uji manual | Handler dragenter/over/leave/drop terimplementasi |
| 2 | Empty, loaded, active, unsupported, error states lengkap | Semua state | Pass (audit) | `updateControls()` + `setStatus()` + badge support |
| 3 | File besar ditangani sesuai batas (20 MiB) | File > 20 MiB | Pass (audit) | `MAX_FILE_SIZE` = 20 MiB, dicek sebelum decode |
| 4 | Gambar gagal decode ditangani | File korup / ekstensi dipalsukan | Pass (audit) | `decodeImage()` probe menolak gambar yang gagal decode |
| 5 | File yang sama dapat dipilih kembali | Pilih file sama 2x | Pass | `fileInput.value = ''` setelah change |
| 6 | Semua kontrol via keyboard | Tab + Enter/Space | Pass (audit) | Dropzone `role="button"` + `tabindex` + handler Enter/Space; tombol native |
| 7 | Tidak ada console error pada skenario utama | Console browser | Menunggu uji manual | — |
| 8 | Network inspection tidak menunjukkan transfer gambar | DevTools Network | Pass | Diverifikasi statis pada source dan hasil build |

## 3. Skenario Uji Minimum (PRD Bagian 18)

### Skenario A — Paste gambar valid
1. Buka tab Kickstand.
2. Salin screenshot PNG dari aplikasi lain.
3. Fokuskan halaman Kickstand, tekan Ctrl+V.
4. Pastikan preview muncul.
5. Klik Pop Out.
6. Pastikan jendela native PiP tampil dengan gambar yang sama.

**Hasil yang diharapkan:** gambar dapat dipreview dan difloating tanpa upload.
**Hasil aktual:** Menunggu uji manual.

### Skenario B — Upload fallback
1. Pilih file PNG/JPEG/WebP melalui file picker.
2. Pastikan preview muncul.
3. Pop Out.

**Hasil yang diharapkan:** alur sama dengan paste.
**Hasil aktual:** Menunggu uji manual.

### Skenario C — Replace image saat PiP aktif
1. Buka gambar pertama di PiP.
2. Kembali ke tab Kickstand.
3. Paste atau upload gambar kedua.
4. Pastikan main preview dan jendela PiP menampilkan gambar kedua.
5. Pastikan tidak ada PiP kedua.

**Hasil yang diharapkan:** satu jendela aktif diperbarui dan URL lama
dibersihkan setelah aman.
**Hasil aktual:** Menunggu uji manual.

### Skenario D — Close dan reopen
1. Buka PiP.
2. Tutup melalui kontrol native.
3. Pastikan main preview tetap ada.
4. Buka PiP kembali.

**Hasil yang diharapkan:** lifecycle pulih tanpa kehilangan gambar.
**Hasil aktual:** Menunggu uji manual.

### Skenario E — Browser tidak mendukung
1. Buka di Safari desktop atau browser tanpa API.
2. Masukkan gambar.

**Hasil yang diharapkan:** preview tetap bekerja; Pop Out dinonaktifkan
dan alasan dijelaskan.
**Hasil aktual:** Menunggu uji manual.

### Skenario F — File invalid/terlalu besar
1. Pilih file bukan gambar atau format tidak didukung (SVG, GIF, PDF).
2. Pilih gambar gagal decode (file korup / ekstensi dipalsukan).
3. Pilih gambar melebihi 20 MiB.

**Hasil yang diharapkan:** error aman dan dapat dipahami; state gambar
sebelumnya tidak rusak tanpa penjelasan.
**Hasil aktual:** Menunggu uji manual (validasi kode sudah terpasang).

## 4. Pemeriksaan non-fungsional (PRD Bagian 13 & 19)

| # | Pemeriksaan | Hasil | Catatan |
|---|---|---|---|
| 1 | Layout responsif tanpa horizontal overflow | Menunggu uji manual | Media query 520px tersedia di CSS |
| 2 | Focus state terlihat pada semua kontrol | Pass (audit) | `:focus-visible` outline global |
| 3 | Kontras teks memenuhi WCAG AA | Menunggu uji manual | — |
| 4 | Tidak ada request eksternal / upload gambar di Network | Pass | Tidak ada referensi eksternal pada source/build |
| 5 | Blob URL bersih setelah replace/remove/close berulang | Pass (audit) | Lifecycle `createObjectURL`/`revokeObjectURL` terkelola |
| 6 | Ganti gambar berkali-kali tanpa memory leak | Menunggu uji manual | — |
| 7 | Siklus PiP open - replace - close - reopen diulang | Menunggu uji manual | — |
| 8 | `npm run preview` pada hasil `npm run build` berjalan | Pass | Build OK (364ms), preview HTTP 200 di :4173 |

## 5. Known limitations (dicatat, bukan defect tersembunyi)

- Document PiP tidak didukung di Safari desktop dan browser mobile;
  mode preview saja (sesuai PRD 9.1).
- Batas 20 MiB bersifat provisional (PRD 8.2).
- Jendela PiP tidak dapat hidup lebih lama dari tab pembuka; posisi
  jendela tidak dapat ditentukan (PRD 9.2).
- Hanya satu gambar aktif dan satu PiP window per tab.

## 6. Ringkasan hasil

| Status akhir | Tanggal | Verifikator |
|---|---|---|
| Menunggu uji manual browser → Verified Functional Prototype | 20 November 2026 | Devin (audit + build); uji interaktif oleh pengguna |

Defect blocker/critical yang ditemukan dan status perbaikannya:

| ID | Deskripsi | Severity | Status |
|---|---|---|---|
| — | Tidak ada defect yang ditemukan pada audit statis/build | — | — |

Pengecualian acceptance criteria yang disetujui pengguna (bila ada):

| Kriteria | Alasan | Disetujui oleh |
|---|---|---|
| | | |

Status akhir yang diizinkan adalah **Verified Functional Prototype**,
bukan commercial release atau production-ready service (PRD Milestone 5).
