import Link from "next/link";
import { events } from "@/data/events";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Daftar Event</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded-lg shadow-sm bg-white text-black">
            <h2 className="text-xl font-bold">{event.judul}</h2>
            <p className="text-slate-600 mb-4">{event.tanggal} · {event.lokasi}</p>
            <Link
              href={`/event/${event.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}