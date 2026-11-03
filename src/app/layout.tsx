import type { Metadata } from 'next';
import Script from 'next/script'
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3151263409931771" crossOrigin="anonymous"></script>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}