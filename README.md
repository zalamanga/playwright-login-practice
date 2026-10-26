# Playwright Login Practice

Latihan pengujian login Swag Labs di SauceDemo menggunakan Playwright dan TypeScript. Source berisi lima skenario login dan konfigurasi untuk Chromium serta Firefox.

## Skenario

- Username demo dengan password yang valid.
- Password salah.
- Akun demo yang dikunci.
- Password sangat panjang.
- Password kosong.

Username dan password pada `tests/login.spec.ts` adalah kredensial publik milik lingkungan latihan SauceDemo, bukan akun pribadi atau credential produksi. Teks hasil yang diharapkan mengikuti latihan pada source dan dapat berubah jika situs latihan berubah.

## Pasang dan baca daftar tes

Gunakan Node.js dan npm yang mendukung versi Playwright pada lockfile:

```powershell
npm ci --ignore-scripts
npx playwright test --list
```

Perintah `--list` hanya memuat konfigurasi dan menampilkan kasus; belum menjalankan login. Untuk menjalankan secara manual pada lingkungan latihan yang memang boleh diuji:

```powershell
npx playwright install chromium firefox
npx playwright test
```

Perintah kedua membuka browser dan mengirim request ke https://www.saucedemo.com. Jangan mengganti target atau kredensial dengan layanan nyata tanpa izin pemiliknya.

## Struktur

| Berkas | Fungsi |
| --- | --- |
| `playwright.config.ts` | Folder tes, browser, retry CI, reporter, dan trace |
| `tests/login.spec.ts` | Lima skenario login aktif |
| `tests-examples/demo-todo-app.spec.ts` | Contoh tambahan dari starter Playwright, di luar `testDir` aktif |
| `package-lock.json` | Versi dependency untuk instalasi yang konsisten |

## Pemeriksaan

Pada 27 Oktober 2026, `npm ci --ignore-scripts` berhasil dan `playwright test --list` memuat 10 kombinasi tes: lima skenario pada masing-masing Chromium dan Firefox. Ini membuktikan konfigurasi dan source dapat ditemukan, bukan hasil pengujian login.

Browser tidak dijalankan dan tidak ada login atau pengiriman formulir ke situs pihak ketiga selama persiapan repo ini. Hasil login belum diklaim PASS. Trace, laporan HTML, dependency terpasang, dan hasil percobaan lama tidak disertakan.

## Asal latihan

Contoh Todo berasal dari starter Playwright dan rujukan aslinya tetap ada di source. Materi login memakai aplikasi demo Swag Labs/SauceDemo. Tidak ditemukan lisensi proyek khusus pada kumpulan sumber lokal; repo ini tidak mengklaim memiliki aplikasi atau akun demo tersebut.
