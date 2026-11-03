import Link from "next/link";

export default function Navbar() {
 const menu = [
    { href: "/", teks: "Beranda" },
    { href: "/", teks: "Event" }, // Mengarah ke beranda/daftar event
    { href: "/favorit", teks: "Favorit" },
   { href: "/tentang", teks: "Tentang" },
  ];
  return (
    <nav className="bg-slate-800 p-4 text-white">
      <div className="container mx-auto flex gap-6">
        {menu.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="hover:text-blue-300 font-medium"
          >
            {item.teks}
          </Link>
        ))}
      </div>
    </nav>
  );
}