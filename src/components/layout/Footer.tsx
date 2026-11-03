import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-12 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Direktori UMKM Lokal</h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            Wadah publikasi dan katalog digital resmi untuk pelaku usaha mikro, kecil, menengah, serta profesi lokal.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Tautan Cepat</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/umkm" className="hover:text-white transition">Cari UMKM</Link></li>
            <li><Link href="/dashboard/tambah" className="hover:text-white transition">Daftarkan Usaha</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Legalitas & Kebijakan</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy-policy" className="hover:text-white transition">Kebijakan Privasi</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Syarat & Ketentuan</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        &copy; 2026 Direktori UMKM. All rights reserved.
      </div>
    </footer>
  );
}
