import Link from "next/link";

interface EventProps {
  event: {
    id: number;
    judul: string;
    deskripsi?: string;
    [key: string]: any;
  };
}

export default function KartuEvent({ event }: EventProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="font-bold text-lg mb-2">{event.judul}</h3>
      <p className="text-slate-600 text-sm mb-4">{event.deskripsi}</p>
      <Link
        href={`/event/${event.id}`}
        className="text-blue-600 hover:underline font-medium text-sm"
      >
        Detail Event &rarr;
      </Link>
    </div>
  );
}