import Link from 'next/link';
import { Store, PlusCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Store className="w-6 h-6 text-blue-600" />
          <span>Direktori<span className="text-gray-900">UMKM</span></span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/umkm" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
            Katalog
          </Link>
          <Link
            href="/dashboard/tambah"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
          >
            <PlusCircle className="w-4 h-4" />
            Daftarkan UMKM
          </Link>
        </nav>
      </div>
    </header>
  );
}