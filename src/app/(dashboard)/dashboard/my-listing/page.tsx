import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { PlusCircle, Store } from 'lucide-react';
import UMKMCard from '@/components/katalog/UMKMCard';
import { Listing } from '@/types/database';

export const instant = false;

export const metadata: Metadata = {
  title: 'Daftar Usaha Saya - Dashboard',
  description: 'Kelola daftar usaha Anda di Direktori UMKM.',
};

export default async function MyListingPage() {
  const supabase = await createClient();
  const { data: rawListings } = await supabase
    .from('listings')
    .select('*, category:categories!category_id(name, slug)')
    .order('created_at', { ascending: false });

  const listings: Listing[] = (rawListings as unknown as Listing[]) || [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daftar Usaha Saya</h1>
          <p className="text-sm text-gray-500">Kelola informasi dan profil usaha yang telah Anda daftarkan.</p>
        </div>
        <Link
          href="/dashboard/tambah"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
        >
          <PlusCircle className="w-4 h-4" />
          Tambah Usaha Baru
        </Link>
      </div>

      {listings && listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {listings.map((item) => (
            <UMKMCard key={item.id} listing={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-800 mb-1">Belum Ada Usaha Terdaftar</h3>
          <p className="text-sm text-gray-500 mb-4">Mulai daftarkan usaha Anda agar dapat ditemukan oleh calon pelanggan.</p>
          <Link
            href="/dashboard/tambah"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
          >
            <PlusCircle className="w-4 h-4" />
            Daftarkan Sekarang
          </Link>
        </div>
      )}
    </main>
  );
}
