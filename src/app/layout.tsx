import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Direktori & Katalog UMKM Lokal',
  description: 'Temukan produk dan layanan terbaik dari pelaku UMKM dan profesi lokal.',
  verification: {
    google: 'dNbLFFgFeD-zYshbAex3NbE_hG244rtO194lAnsLEOk', // Masukkan string kode unik dari Google Search Console di sini
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}