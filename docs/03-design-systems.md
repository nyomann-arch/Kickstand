# Design System dan Identitas Visual — Kickstand

**Berkas:** `03-design-systems.md`  
**Produk:** Kickstand  
**Versi dokumen:** 1.2  
**Cakupan:** Main web utility, image input/preview, Document PiP window, status, dan interaction states  
**Status:** Arah visual untuk functional prototype Kickstand; nilai token dapat disempurnakan setelah implementasi dan verifikasi fungsi

Dokumen ini menetapkan kepribadian merek, tipografi, design tokens, struktur antarmuka, perilaku komponen, serta aksesibilitas Kickstand. Tujuannya adalah menghasilkan utilitas developer yang terasa ringkas, modern, tenang, dan cepat dipahami—bukan dashboard SaaS yang besar.

---

## 1. Filosofi dan Kepribadian Merek

### 1.1 Metafora Kickstand

Kickstand mengambil namanya dari penyangga fisik pada perangkat seperti tablet atau layar portabel. Kickstand fisik menjaga perangkat tetap berdiri pada sudut pandang yang nyaman agar konten dapat dilihat sementara tangan pengguna bebas melakukan pekerjaan lain.

Secara digital, produk ini berperan sebagai penyangga satu referensi visual: gambar dimasukkan ke halaman, lalu ditampilkan pada jendela Document Picture-in-Picture agar tetap terlihat saat pengguna bekerja di aplikasi utama.

Metafora ini harus terasa fungsional, bukan literal atau dekoratif. Kickstand bukan produk aksesori hardware, bukan aplikasi pengelola gambar, dan bukan reference board profesional.

Nilai merek:

- **Supportive:** membantu referensi tetap berada dalam pandangan tanpa mengambil alih workflow pengguna.
- **Practical:** menyelesaikan satu pekerjaan yang spesifik dengan langkah sesedikit mungkin.
- **Focused:** satu gambar aktif, satu jendela PiP, dan sedikit kontrol.
- **Steady:** perilaku produk dapat dipahami dan keterbatasan browser dijelaskan dengan jujur.
- **Local-first:** gambar diproses di browser dan tidak diunggah oleh aplikasi.

### 1.2 Positioning dan copy

- **Nama produk:** `Kickstand`
- **Kategori/descriptor:** `Floating Visual Reference`
- **Tagline:** `Keep your reference in sight.`
- **Core promise:** `Turn one image into a floating reference window while you work.`
- **Workflow:** `Paste. Pop Out. Keep Working.`
- **Primary action:** `Pop Out`

Gunakan `Kickstand` dengan kapitalisasi K besar dan huruf berikutnya kecil. Jangan menulis `KICKSTAND` sebagai wordmark default, kecuali untuk konteks teknis yang memang membutuhkan huruf kapital.

Jangan gunakan positioning `Visual Clipboard`, karena produk bukan clipboard manager global. Hindari klaim `global clipboard`, `universal always-on-top`, `works over every fullscreen app`, atau `works on every browser`.

### 1.3 Kepribadian visual dan verbal

Kickstand harus terasa:

- Praktis dan langsung ke tujuan.
- Tenang, minimal, dan presisi.
- Kokoh serta dapat diandalkan tanpa terlihat seperti software enterprise yang berat.
- Ramah dan jelas, tetapi tidak kekanak-kanakan atau antropomorfis.
- Modern tanpa terlihat seperti template dashboard generik.

Nada bahasa harus ringkas, lugas, dan membantu. Hindari metafora “buddy”, maskot teman kecil, bahasa terlalu playful, atau jargon pemasaran yang berlebihan.

Hindari:

- Neon atau gradient agresif.
- Hero illustration besar.
- Sidebar dashboard yang tidak diperlukan.
- Banyak menu dan tab.
- Tombol toolbar yang tidak memiliki fungsi pada functional prototype.
- Visual yang membuat gambar referensi menjadi elemen sekunder.

### 1.4 Logo dan wordmark

Arah logo yang disarankan adalah **panel visual sederhana yang ditopang satu kaki penyangga miring**. Mark harus tetap terbaca pada ukuran kecil dan dapat digunakan sebagai favicon.

Prinsip:

- Bentuk utama dapat berupa persegi panjang tipis yang mewakili layar atau gambar.
- Tambahkan satu garis/penyangga miring dan alas kecil untuk menyampaikan metafora kickstand.
- Gunakan geometri sederhana, proporsi seimbang, dan jumlah detail minimum.
- Wordmark ditulis `Kickstand` dalam sentence case.
- Mark harus bisa berdiri sendiri tanpa wordmark pada favicon.
- Gunakan SVG lokal atau CSS sederhana; jangan mengambil logo dari CDN.

Jangan membuat logo berupa sepeda, motor, roda, atau ilustrasi produk hardware. Jangan meniru logo merek lain. Hindari pin lokasi, pushpin, paperclip, dan karakter maskot karena tidak mewakili metafora merek yang dipilih.

### 1.5 Catatan nama merek

Nama `Kickstand` telah dipilih sebagai nama resmi proyek oleh pemilik produk. Dokumen ini tidak menyatakan bahwa nama tersebut telah lolos pemeriksaan merek dagang, domain, atau handle sosial. Pencarian awal menemukan penggunaan dan catatan merek KICKSTAND terdahulu, termasuk catatan historis terkait software. Pemeriksaan formal bukan syarat penyelesaian prototipe lokal. Jika proyek kelak dipublikasikan sebagai produk, dipasarkan, atau digunakan secara komersial, lakukan pemeriksaan formal pada wilayah target dan kelas barang/jasa yang sesuai. Jangan membuat klaim bahwa nama telah legal-cleared tanpa bukti.

## 2. Prinsip Pengalaman Pengguna

1. **Satu aksi utama terlihat jelas.** Setelah gambar berhasil masuk, Pop Out menjadi CTA utama.
2. **Input tidak boleh tersembunyi.** Paste, file picker, dan drag-and-drop memiliki petunjuk yang mudah ditemukan.
3. **Gambar adalah fokus.** Preview harus menjadi area visual terbesar setelah gambar dimasukkan.
4. **Tidak ada surprise state.** Pengguna harus tahu apakah gambar siap, PiP sedang aktif, PiP ditutup, atau browser tidak mendukung.
5. **Pertahankan gambar setelah PiP ditutup.** Jangan memaksa pengguna paste ulang.
6. **Tidak mengklaim always-on-top tanpa batas.** Jelaskan bahwa fitur bergantung pada dukungan browser dan OS.
7. **Privasi dijelaskan dengan bahasa spesifik.** Nyatakan bahwa gambar diproses lokal dan tidak diunggah; jangan menjanjikan keamanan absolut.
8. **Minimalkan UI di jendela PiP.** Pada functional prototype, konten PiP hanya gambar dan background; tidak ada toolbar khusus.

## 3. Arah Visual dan Design Tokens

Arah awal yang direkomendasikan adalah **steady workspace utility**: latar mist yang terang, surface putih, teks graphite, dan aksen steel-blue yang memberi kesan stabil serta fungsional. Identitas Kickstand tidak bergantung pada ilustrasi hardware; metafora penyangga cukup diwujudkan melalui logo dan detail visual yang terukur.

Nilai berikut adalah baseline desain yang dapat disesuaikan setelah screenshot prototype ditinjau. Jangan menambah token yang tidak digunakan.

### 3.1 Warna utama

```css
:root {
  --color-bg: #F5F7F9;
  --color-surface: #FFFFFF;
  --color-surface-muted: #EEF2F5;
  --color-text-primary: #1B2733;
  --color-text-secondary: #657382;
  --color-border: #DDE4EA;
  --color-primary: #3F6893;
  --color-primary-hover: #315477;
  --color-primary-soft: #EAF1F7;
  --color-focus: #85A8C7;
  --color-danger: #B54747;
  --color-danger-soft: #FDEEEE;
  --color-success: #287A57;
  --color-success-soft: #EAF6EF;
}
```

Penggunaan:

- `--color-bg`: latar aplikasi utama.
- `--color-surface`: kartu, preview frame, dan area input.
- `--color-surface-muted`: dropzone dan area pendukung.
- `--color-text-primary`: judul dan teks utama.
- `--color-text-secondary`: deskripsi dan label pendukung.
- `--color-border`: garis batas dan pemisah.
- `--color-primary`: CTA Pop Out dan kontrol utama.
- `--color-primary-hover`: hover/focus visual CTA.
- `--color-primary-soft`: highlight dropzone atau status aktif.
- `--color-focus`: indikator keyboard focus.
- `--color-danger*`: error state.
- `--color-success*`: status sukses.

Periksa kontras warna teks dan tombol sesuai WCAG AA. Jangan memakai warna sebagai satu-satunya penanda status.

### 3.2 Warna PiP window

PiP document adalah dokumen terpisah dan memerlukan style sendiri. Gunakan background netral gelap agar gambar putih atau terang tetap memiliki batas visual:

```css
:root {
  --pip-bg: #171A20;
  --pip-image-padding: 10px;
}
```

Pastikan area gambar tetap menjadi fokus dan tidak ada dekorasi yang mengganggu.

### 3.3 Spacing

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
}
```

Gunakan skala secara konsisten untuk padding, gap, dan margin.

### 3.4 Radius, shadow, dan layout

```css
:root {
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --radius-pill: 999px;
  --shadow-card: 0 8px 28px rgba(24, 34, 48, 0.07);
  --container-width: 760px;
}
```

Jangan menggunakan shadow besar pada setiap komponen. Gunakan border dan perbedaan surface sebagai pemisah utama.

## 4. Tipografi

Gunakan system font stack. Jangan memuat font dari Google Fonts, CDN, atau layanan eksternal pada functional prototype.

### 4.1 Font UI

```css
:root {
  --font-ui: Inter, system-ui, -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, sans-serif;
}
```

`Inter` hanya digunakan jika tersedia secara lokal; jangan mengunduhnya.

### 4.2 Font teknis

Kickstand tidak memiliki editor kode. Gunakan font monospace hanya untuk detail teknis seperti shortcut atau format file bila diperlukan:

```css
:root {
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco,
               Consolas, "Liberation Mono", monospace;
}
```

### 4.3 Skala tipografi

```css
:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --heading-lg: 1.5rem;
  --heading-xl: 2rem;
}
```

Jaga hierarki sederhana. Jangan menggunakan heading besar yang mendorong area kerja terlalu jauh ke bawah.

## 5. Struktur Halaman Utama

Kickstand functional prototype merupakan satu halaman utama. Jangan membangun landing page multi-section, dashboard, sidebar, atau sistem navigasi kompleks pada tahap awal.

### 5.1 Kerangka desktop

Susunan yang direkomendasikan:

1. **Header ringkas:** mark/wordmark Kickstand dan status dukungan browser.
2. **Intro singkat:** satu judul dan satu kalimat yang menjelaskan fungsi.
3. **Input area:** area paste/drop dan tombol file picker.
4. **Preview area:** muncul setelah gambar valid dimasukkan.
5. **Primary action:** tombol Pop Out paling menonjol setelah preview tersedia.
6. **Secondary action:** Replace atau Remove image.
7. **Privacy note:** pesan bahwa gambar diproses lokal dan tidak diunggah.
8. **Status feedback:** informasi gambar siap, PiP aktif, PiP ditutup, atau error.

Jangan membuat navbar dengan banyak menu. Jangan membuat statistik atau panel fitur yang tidak berkaitan dengan workflow utama.

### 5.2 Empty state

Sebelum gambar dimasukkan:

- Area input menjadi elemen dominan.
- Tampilkan instruksi `Paste an image (Ctrl+V) or drop it here`.
- Sediakan tombol `Choose image`.
- Jelaskan format yang diterima: PNG, JPG, WebP.
- Tombol Pop Out belum ditampilkan sebagai aksi aktif atau harus terlihat disabled dengan alasan yang jelas.

### 5.3 Loaded state

Setelah gambar valid dimasukkan:

- Tampilkan preview yang cukup besar.
- Pertahankan rasio gambar.
- Tampilkan tombol `Pop Out` sebagai primary CTA.
- Sediakan `Replace image` dan `Remove` sebagai secondary actions.
- Berikan feedback `Image ready to float`.

### 5.4 PiP active state pada halaman utama

Ketika PiP terbuka:

- Berikan indikator `Floating window active`.
- Jangan mengaktifkan tombol untuk membuka jendela kedua.
- Aksi replace tetap boleh tersedia jika produk mempertahankan kemampuan mengganti gambar saat PiP aktif.
- Jika gambar diganti, status PiP tetap aktif dan gambar di jendela yang sama diperbarui.
- Jelaskan bahwa tab Kickstand harus tetap terbuka selama jendela PiP digunakan.

### 5.5 Unsupported/error state

- Jelaskan bahwa browser tidak mendukung Document PiP atau API dinonaktifkan.
- Preview gambar tetap dapat digunakan.
- Jangan menampilkan pesan seolah Pop Out berhasil.
- Sediakan arahan singkat untuk menggunakan browser desktop yang didukung.

## 6. PiP Window Design

### 6.1 Prinsip tampilan

Jendela PiP adalah ruang visual sekecil mungkin untuk satu gambar. Tidak ada header aplikasi, navigation, toolbar, menu, atau tombol kustom pada functional prototype.

Susunan:

- Background gelap netral.
- Padding sekitar 8–12 px.
- Satu elemen gambar responsif.
- Gambar menggunakan `object-fit: contain`.
- Rasio gambar dipertahankan.
- Tidak ada crop atau distorsi.

### 6.2 Ukuran awal

Ukuran awal boleh diminta sekitar 480 × 360 CSS px sebagai default, atau dihitung dari rasio gambar dengan batas maksimum yang wajar. `requestWindow()` harus menerima pasangan width dan height jika salah satunya diberikan.

Browser dapat clamp atau mengubah ukuran. Jangan menjanjikan ukuran akhir yang persis.

### 6.3 Resize behavior

- Gambar menyesuaikan ruang yang tersedia.
- Jangan menggunakan `object-fit: cover`.
- Jangan memaksa width dan height gambar ke rasio jendela.
- Pengguna menggunakan kontrol resize native browser jika tersedia.
- Website tidak dapat mengatur posisi PiP di layar.

### 6.4 PiP stylesheet

PiP window memiliki document terpisah. Style main page tidak otomatis ikut terbawa.

Pastikan style PiP disuntikkan atau stylesheet khusus dimuat secara eksplisit. Pada functional prototype, style dapat sangat kecil dan terpisah dari design system main page.

## 7. Komponen UI dan Interaction States

### 7.1 Input area / dropzone

**Empty state:**

- Surface memakai `--color-surface-muted`.
- Border dashed memakai `--color-border`.
- Petunjuk paste dan drop terlihat.
- File picker dapat diakses dengan mouse dan keyboard.

**Drag-over state:**

- Border berubah menjadi solid `--color-primary`.
- Background menggunakan `--color-primary-soft`.
- Tampilkan feedback bahwa file dapat dilepaskan.

**Error state:**

- Tampilkan error singkat.
- Jangan kehilangan preview lama secara diam-diam jika file baru gagal diproses.
- Pengguna dapat mencoba lagi.

### 7.2 Image preview

- Gunakan `<img>` dengan alt yang sesuai.
- Pertahankan aspect ratio.
- Jangan melakukan crop otomatis.
- Batasi ukuran preview agar tidak memenuhi seluruh halaman pada gambar besar.
- Berikan background/border yang membuat tepi gambar dapat dikenali.

### 7.3 Primary button

Label baseline: `Pop Out`.

- Background `--color-primary`.
- Teks putih dengan kontras memadai.
- Menjadi aksi paling menonjol setelah gambar tersedia.
- Memiliki hover, focus-visible, active, dan disabled state.
- Saat PiP aktif atau sedang dibuka, jangan tampilkan sebagai tombol yang membuka jendela kedua.

### 7.4 Secondary actions

Label baseline:

- `Choose image`
- `Replace image`
- `Remove image`

Gunakan visual sekunder/outline. Jangan menambah action yang tidak ada di scope.

### 7.5 Status feedback

Status minimum:

- `Paste or choose an image to get started.`
- `Image ready to float.`
- `Floating window is open. Keep this tab open.`
- `Floating window closed. Your image is still here.`
- `This browser does not support Document Picture-in-Picture.`
- `This image type is not supported. Use PNG, JPG, or WebP.`
- `The image could not be loaded. Try another file.`

Teks dapat disesuaikan, tetapi jangan menjanjikan perilaku yang tidak dijamin browser.

## 8. Microcopy dan Bahasa

Gunakan bahasa ringkas dan langsung. Baseline label UI dapat menggunakan bahasa Inggris agar konsisten dengan nama fitur dan target developer; dokumentasi proyek tetap berbahasa Indonesia. Jangan menambahkan language switch/i18n pada functional prototype tanpa persetujuan.

Copy utama:

- Product title: `Kickstand`
- Descriptor: `Floating Visual Reference`
- Tagline: `Keep your reference in sight.`
- Input hint: `Paste an image (Ctrl+V) or drop it here`
- File action: `Choose image`
- Main action: `Pop Out`
- Replace action: `Replace image`
- Remove action: `Remove image`
- Privacy note: `Images are processed locally in your browser. Kickstand does not upload your images.`

Jangan menggunakan copy seperti:

- `Works on every browser`.
- `Always on top in every situation`.
- `Global clipboard`.
- `100% secure`.
- `Close your tab and keep floating`.
- `No installation required on every managed device`.

## 9. Aksesibilitas

- Semua kontrol dapat dijangkau melalui keyboard.
- File input memiliki label atau tombol yang terhubung.
- Area drag-and-drop tetap memiliki file picker sebagai alternatif.
- Focus indicator terlihat dan tidak dihilangkan tanpa pengganti.
- Jangan menggunakan warna sebagai satu-satunya penanda status.
- Jaga kontras teks dan kontrol sesuai WCAG AA sejauh berlaku.
- Status dan error dapat diumumkan dengan `aria-live` secara terukur.
- Urutan tab mengikuti alur input → preview → Pop Out → secondary actions.
- Jangan menjadikan Ctrl+V sebagai satu-satunya input karena clipboard paste bergantung pada fokus halaman dan dukungan sumber.
- PiP image memiliki `alt` yang sesuai.

## 10. Responsivitas dan Target Perangkat

- Fokus UX utama adalah desktop/laptop.
- Main page harus tetap usable pada tablet dan layar sempit, tetapi floating PiP tidak dijanjikan tersedia pada mobile.
- Pada perangkat/browser unsupported, tampilkan preview dan penjelasan keterbatasan.
- Jangan menyembunyikan file picker pada layar kecil.
- Hindari horizontal overflow.
- Gambar preview harus memiliki max width/max height yang wajar dan mempertahankan rasio.

## 11. Ikon dan Aset Visual

- Utamakan CSS sederhana atau SVG lokal.
- Jangan mengambil ikon, ilustrasi, gambar, atau font dari CDN.
- Jangan menambahkan library ikon eksternal untuk functional prototype.
- Mark Kickstand menggunakan bentuk panel visual dengan satu penyangga miring dan alas sederhana; jangan menyerupai logo merek lain atau ilustrasi sepeda/motor.
- Pertahankan siluet mark tetap jelas pada ukuran favicon 16–32 px.
- Jangan memakai ilustrasi sepeda, motor, roda, meja kantor, atau foto aksesori hardware sebagai logo utama. Metafora penyangga harus disampaikan secara abstrak dan minimal.
- Ikon dekoratif tidak boleh menggantikan label.

## 12. Motion dan Feedback

- Gunakan transisi singkat untuk hover, focus, dan perubahan status bila membantu.
- Jangan menambahkan animasi loading panjang untuk proses yang seharusnya instan.
- Jangan menganimasikan gambar dengan cara yang mengganggu fungsi referensi.
- Jika Pop Out gagal, feedback harus muncul segera setelah error diketahui.
- Hindari glassmorphism berat, parallax, dan dekorasi yang mengurangi fokus.

## 13. Struktur CSS dan Konsistensi Implementasi

### 13.1 Prefix class

Gunakan prefix:

- `.kickstand-` untuk main application.
- `.pip-` untuk konten/elemen dalam PiP document.

Contoh:

```css
.kickstand-app { /* root application */ }
.kickstand-dropzone { /* image input area */ }
.kickstand-preview { /* main image preview */ }
.kickstand-popout-button { /* primary action */ }
.pip-stage { /* PiP document image stage */ }
.pip-image { /* image in PiP */ }
```

### 13.2 Batas selector global

- Selector global hanya untuk reset, base typography, dan design tokens.
- Jangan menggunakan `.card`, `.button`, `.container`, atau selector elemen generik untuk styling satu komponen.
- Gunakan class eksplisit untuk komponen.
- Hindari selector bertingkat panjang yang bergantung pada struktur DOM.

### 13.3 Pembagian stylesheet

Struktur yang disarankan:

```text
src/
├── main.js
├── styles.css   # main document
└── pip.css      # style khusus PiP document
```

PiP CSS harus dimuat ke PiP document secara eksplisit. Pilih teknik yang paling sederhana sesuai setup Vite dan dokumentasikan implementasinya.

### 13.4 Konsistensi

- Gunakan design token untuk warna, spacing, radius, dan shadow.
- Jangan mengulang hard-coded value jika token yang sesuai sudah tersedia.
- Komponen dengan fungsi sama memiliki state visual yang konsisten.
- Jangan memperkenalkan dark mode atau theme switch pada functional prototype kecuali disetujui.

## 14. Arah Visual Akhir

Kickstand harus terasa seperti utilitas kecil yang matang: pengguna membuka halaman, memasukkan gambar, menekan Pop Out, lalu kembali bekerja. Main page membantu menyelesaikan input dengan cepat; PiP window hanya menampilkan referensi dengan jelas.

**Kualitas desain diukur dari seberapa cepat pengguna menyelesaikan alur utama, bukan dari jumlah elemen visual atau banyaknya fitur.**
