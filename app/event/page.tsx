import KatalogInteraktif from "@/components/KatalogInteraktif";
import { events } from "@/data/events"; // <-- Impor data event dari folder data

export default function HalamanEvent() {
  return (
    <main className="container mx-auto px-4 py-8">
      <KatalogInteraktif events={events} /> {/* <-- Kirim data events di sini */}
    </main>
  );
}