export interface Event {
  id: number;
  judul: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  harga: number;
  kuota: number;
  terisi: number;
}

export const events: Event[] = [
  {
    id: 1,
    judul: "Turnamen Futsal",
    kategori: "Olahraga",
    tanggal: "10 Mei 2026",
    lokasi: "GOR Malangsari",
    harga: 50000,
    kuota: 20,
    terisi: 12,
  },
  {
    id: 2,
    judul: "Workshop React & Next.js",
    kategori: "Teknologi",
    tanggal: "15 Mei 2026",
    lokasi: "Lab Komputer",
    harga: 100000,
    kuota: 50,
    terisi: 32,
  },
  {
    id: 3,
    judul: "Seminar Digital Marketing",
    kategori: "Bisnis",
    tanggal: "20 Mei 2026",
    lokasi: "Aula Utama",
    harga: 75000,
    kuota: 40,
    terisi: 25,
  },
];

export function rupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
}