WEBSITE V.A.B.E — VOLUNTEER AMBULANCE BANDUNG EMERGENCY

Cara memakai:
1. Buka index.html di Chrome, Edge, Firefox, atau Safari.
2. Website dapat digunakan tanpa instalasi dan tanpa koneksi internet.
3. Logo V.A.B.E tersimpan sebagai logo-vabe.jpeg dan sudah digunakan pada header serta halaman pembuka.
4. Ganti nomor call center, email, dan wilayah layanan sebelum dipublikasikan.
5. Formulir pendaftaran saat ini adalah demo. Data tersimpan hanya di browser perangkat dan belum dikirim ke server.

Bagian utama website:
- Beranda
- Form pendaftaran anggota
- Susunan kepengurusan tanpa judul “Organigram”, serta data anggota diterima
- Visi, misi, dan kode etik
- Satu artikel edukasi utama serta ringkasan hukum dan keselamatan ambulans
- Call center PSC Kota Bandung dan PSC Kabupaten Bandung

Data pendaftar pada versi demo disimpan hanya di localStorage browser perangkat, bukan di server.

Struktur multi-halaman:
- index.html — Beranda dan galeri kegiatan
- daftar.html — Form registrasi anggota
- anggota.html — Susunan kepengurusan dan data anggota yang sudah diterima
- visi-misi.html — Visi dan misi komunitas
- call-center.html — PSC Kota/Kabupaten Bandung dan 112
- edukasi.html — Penanganan awal kecelakaan jalan
- hukum.html — Dasar hukum prioritas ambulans
- admin.html — Panel pengelolaan admin
- laporan.html — Form laporan kejadian, pratinjau A4, riwayat, cetak, dan simpan PDF

Calon anggota tidak tampil di halaman publik. Data baru muncul di anggota.html setelah statusnya diubah menjadi Diterima oleh admin. Data sensitif tidak ditampilkan.

Panel admin:
- Buka admin.html atau tekan tautan Panel Admin pada bagian bawah website.
- PIN demo awal: 2026.
- Admin dapat melihat pendaftar, memfilter status, menerima, menolak, atau menghapus data.
- Admin dapat mengisi nama dan kontak kepengurusan; data tersebut tampil pada organigram setelah website dimuat ulang.
- Form registrasi berisi nama, tanggal lahir, domisili, pilihan Escorting/Driver Ambulance, nomor SIM, dan WhatsApp.
- Setiap pendaftaran memperoleh ID berurutan Volunteer #001, Volunteer #002, dan seterusnya serta status Menunggu verifikasi.
- Admin dapat mengisi satu tautan grup utama anggota V.A.B.E.
- Tombol Terima & WA mengubah status menjadi Diterima dan membuka pesan WhatsApp kelulusan beserta tautan grup bila sudah tersedia.
- Beberapa pendaftar dapat dipilih sekaligus. Tombol Terima pilihan & bagikan menyiapkan pengumuman WhatsApp yang mencantumkan seluruh ID Volunteer yang lulus.
- Menu Laporan kejadian menyediakan form, pratinjau langsung, riwayat lokal, tombol bagikan, cetak, dan Simpan PDF.
- Alur laporan terdiri dari dua halaman keadaan: form terlebih dahulu, lalu hasil laporan berdesain lengkap setelah disimpan.
- Pada hasil laporan, tombol Simpan memberikan pilihan PDF atau foto. Fitur Bagikan mengirim file desain melalui menu berbagi perangkat ke WhatsApp atau Gmail bila didukung.
- Data laporan tampil pada tab Data laporan di panel admin dengan tindakan Buka, Edit, Unduh, dan Hapus.
- Saat laporan disimpan, file PDF berdesain A4 langsung dibuat dan diunduh. Tombol Simpan PDF dapat dipakai untuk mengunduh ulang.
- Pilihan kota/kabupaten, kecamatan, serta desa/kelurahan dimuat otomatis; hanya jalan, nomor, atau patokan yang diketik manual.
- PIN dan penyimpanan browser hanya cocok untuk demo. Penggunaan publik membutuhkan backend, database, autentikasi aman, dan pembatasan hak akses.

Kontak darurat yang ditampilkan:
- PSC Kota Bandung: 119 ekstensi 0
- WhatsApp Emergency PSC Kota Bandung: 0811-2442-119
- PSC Kabupaten Bandung: 119 tekan 1
- Darurat umum Kota Bandung: 112

Artikel edukasi utama membahas langkah aman saat menemukan kecelakaan di jalan berdasarkan materi Kementerian Kesehatan RI dan WHO Indonesia.

Catatan:
- Materi hukum adalah edukasi umum, bukan nasihat hukum.
- Tautan sumber resmi tersedia di bagian Dasar Hukum.
- Relawan tidak dinyatakan memiliki kewenangan kepolisian.

Terakhir ditinjau: 19 November 2026.
