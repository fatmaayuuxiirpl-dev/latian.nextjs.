
"use client";

import { useState } from "react";

const daftarEvent = [
  { id: 1, nama: "Seminar Teknologi Digital", kategori: "Seminar", tanggal: "15 November 2026", kuota: 50, harga: 50000 },
  { id: 2, nama: "Workshop Web Development", kategori: "Workshop", tanggal: "20 November 2026", kuota: 0, harga: 75000 },
  { id: 3, nama: "Festival Musik Kampus", kategori: "Hiburan", tanggal: "25 November 2026", kuota: 100, harga: 30000 },
  { id: 4, nama: "Workshop UI UX Design", kategori: "Workshop", tanggal: "28 November 2026", kuota: 20, harga: 60000 },
  { id: 5, nama: "Seminar Bisnis Digital", kategori: "Seminar", tanggal: "30 November 2026", kuota: 0, harga: 45000 },
];

export default function EventPage() {
  const [kataKunci, setKataKunci] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [hanyaTersedia, setHanyaTersedia] = useState(false);

  const hasilFilter = daftarEvent.filter((event) => {
    const cocokNama = event.nama.toLowerCase().includes(kataKunci.toLowerCase());
    const cocokKategori = kategori === "Semua" || event.kategori === kategori;
    const cocokTiket = !hanyaTersedia || event.kuota > 0;

    return cocokNama && cocokKategori && cocokTiket;
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Katalog Event
        </h1>

        <p className="mb-6 text-gray-600">
          Temukan event menarik yang ingin kamu ikuti.
        </p>

        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Cari nama event..."
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            className="rounded-lg border bg-white p-3"
          />

          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="rounded-lg border bg-white p-3"
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Hiburan">Hiburan</option>
          </select>
        </div>

        <label className="mb-6 flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={hanyaTersedia}
            onChange={(e) => setHanyaTersedia(e.target.checked)}
          />
          Hanya yang masih ada tiket
        </label>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {hasilFilter.length > 0 ? (
            hasilFilter.map((event) => (
              <div key={event.id} className="rounded-xl bg-white p-5 shadow">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                  {event.kategori}
                </span>

                <h2 className="mb-3 mt-4 text-xl font-bold text-gray-800">
                  {event.nama}
                </h2>

                <p className="text-gray-600">Tanggal: {event.tanggal}</p>
                <p className="text-gray-600">Sisa tiket: {event.kuota}</p>
                <p className="mt-2 font-semibold text-blue-600">
                  Rp {event.harga.toLocaleString("id-ID")}
                </p>

                <p className={event.kuota > 0 ? "mt-3 text-green-600" : "mt-3 text-red-600"}>
                  {event.kuota > 0 ? "Tiket tersedia" : "Tiket habis"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Event tidak ditemukan.</p>
          )}
        </div>
      </div>
    </main>
  );
}
