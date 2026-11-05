
"use client";

import { useEffect, useMemo, useState } from "react";
import type { Event } from "@/data/events";
import KartuEvent from "./KartuEvent";

interface Props {
  events: Event[];
}

type Urutan = "tanggal" | "murah" | "mahal" | "nama";

const PAGE_SIZE = 2;

function waktuTanggal(tanggal: string) {
  const bulan: Record<string, number> = {
    Januari: 0,
    Februari: 1,
    Maret: 2,
    April: 3,
    Mei: 4,
    Juni: 5,
    Juli: 6,
    Agustus: 7,
    September: 8,
    Oktober: 9,
    November: 10,
    Desember: 11,
  };

  const bagian = tanggal.split(" ");
  return new Date(
    Number(bagian[2]),
    bulan[bagian[1]] ?? 0,
    Number(bagian[0])
  ).getTime();
}

export default function KatalogInteraktif({ events }: Props) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urutan, setUrutan] = useState<Urutan>("tanggal");
  const [minimalTiket, setMinimalTiket] = useState("0");
  const [hargaMaksimal, setHargaMaksimal] = useState("");
  const [jumlahTampil, setJumlahTampil] = useState(PAGE_SIZE);

  // Mengingat pilihan urutan
  useEffect(() => {
    const tersimpan = localStorage.getItem("urutanEvent");

    if (
      tersimpan === "tanggal" ||
      tersimpan === "murah" ||
      tersimpan === "mahal" ||
      tersimpan === "nama"
    ) {
      setUrutan(tersimpan);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("urutanEvent", urutan);
  }, [urutan]);

  const daftarKategori = [
    "Semua",
    ...new Set(events.map((e) => e.kategori)),
  ];

  const hasil = useMemo(() => {
    return events
      .filter((e) => {
        const cocokCari =
          e.judul.toLowerCase().includes(cari.toLowerCase()) ||
          e.lokasi.toLowerCase().includes(cari.toLowerCase());

        const cocokKategori =
          kategori === "Semua" || e.kategori === kategori;

        const tiketTersisa = e.kuota - e.terisi;
        const cocokTiket = tiketTersisa >= Number(minimalTiket);

        const cocokHarga =
          hargaMaksimal === "" ||
          e.harga <= Number(hargaMaksimal);

        return (
          cocokCari &&
          cocokKategori &&
          cocokTiket &&
          cocokHarga
        );
      })
      .sort((a, b) => {
        if (urutan === "murah") return a.harga - b.harga;
        if (urutan === "mahal") return b.harga - a.harga;
        if (urutan === "nama") {
          return a.judul.localeCompare(b.judul, "id");
        }

        return waktuTanggal(a.tanggal) - waktuTanggal(b.tanggal);
      });
  }, [events, cari, kategori, urutan, minimalTiket, hargaMaksimal]);

  useEffect(() => {
    setJumlahTampil(PAGE_SIZE);
  }, [cari, kategori, urutan, minimalTiket, hargaMaksimal]);

  const totalTiket = hasil.reduce(
    (total, e) => total + e.kuota - e.terisi,
    0
  );

  const rataHarga =
    hasil.length > 0
      ? hasil.reduce((total, e) => total + e.harga, 0) /
        hasil.length
      : 0;

  function rupiah(angka: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Katalog Event
        </h1>
        <p className="text-slate-600">
          Temukan event menarik dan pesan tiket favoritmu.
        </p>
      </div>

      {/* Pencarian */}
      <input
        type="text"
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        placeholder="Cari nama atau lokasi event..."
        className="w-full rounded-lg border px-4 py-3"
      />

      {/* Filter dan pengurutan */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="rounded-lg border bg-white px-3 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <select
          value={urutan}
          onChange={(e) => setUrutan(e.target.value as Urutan)}
          className="rounded-lg border bg-white px-3 py-2"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="murah">Harga termurah</option>
          <option value="mahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>

        <input
          type="number"
          min="0"
          value={minimalTiket}
          onChange={(e) => setMinimalTiket(e.target.value)}
          placeholder="Minimal tiket tersisa"
          className="rounded-lg border px-3 py-2"
        />

        <input
          type="number"
          min="0"
          value={hargaMaksimal}
          onChange={(e) => setHargaMaksimal(e.target.value)}
          placeholder="Harga maksimal (Rp)"
          className="rounded-lg border px-3 py-2"
        />
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Event ditemukan</p>
          <p className="text-2xl font-bold text-blue-700">
            {hasil.length}
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm text-slate-600">Total tiket tersisa</p>
          <p className="text-2xl font-bold text-green-700">
            {totalTiket}
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 p-4">
          <p className="text-sm text-slate-600">Rata-rata harga</p>
          <p className="text-xl font-bold text-orange-700">
            {rupiah(rataHarga)}
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Menampilkan {Math.min(jumlahTampil, hasil.length)} dari{" "}
        {hasil.length} event.
      </p>

      {/* Daftar event */}
      {hasil.length === 0 ? (
        <p className="rounded-lg bg-slate-100 p-6 text-center text-slate-500">
          Tidak ada event yang cocok dengan pencarian atau filter.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.slice(0, jumlahTampil).map((event) => (
            <div key={event.id} className="relative">
              {event.kuota > 0 &&
                event.terisi / event.kuota >= 0.7 && (
                  <span className="absolute right-2 top-2 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                    Laris
                  </span>
                )}

              <KartuEvent event={event} />
              <p className="px-4 pb-3 text-sm text-slate-600">
                Harga: {rupiah(event.harga)}
                <br />
                Tiket tersisa: {event.kuota - event.terisi}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tampilkan lagi */}
      {jumlahTampil < hasil.length && (
        <div className="text-center">
          <button
            onClick={() =>
              setJumlahTampil((sebelumnya) => sebelumnya + PAGE_SIZE)
            }
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Tampilkan lagi
          </button>
        </div>
      )}
    </section>
  );
}
