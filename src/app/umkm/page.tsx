import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import FilterBar from '@/components/katalog/FilterBar';
import UMKMCard from '@/components/katalog/UMKMCard';
import { Listing } from '@/types/database';

export const instant = false;

export const metadata: Metadata = {
  title: 'Katalog UMKM & Jasa Lokal',
  description: 'Temukan produk dan layanan terbaik dari pelaku usaha lokal.',
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    district?: string;
  }>;
}

export default async function KatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Fetch Kategori untuk Filter Bar
  const { data: categories } = await supabase
    .from('categories')
    .select('name, slug')
    .order('name');

  // Query Data Listing UMKM
  let query = supabase
    .from('listings')
    .select('*, category:categories!category_id(name, slug)')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (params.q) {
    query = query.or(`title.ilike.%${params.q}%,description.ilike.%${params.q}%`);
  }

  if (params.district) {
    query = query.eq('district', params.district);
  }

  const { data: rawListings, error } = await query;

  if (error) {
    console.error('Supabase Query Error:', error);
  }

  let listings: Listing[] = (rawListings as unknown as Listing[]) || [];

  if (params.category && listings.length > 0) {
    listings = listings.filter(
      (item) => item.category?.slug === params.category || item.categories?.slug === params.category
    );
  }

  const districts = [
    'Garut Kota',
    'Tarogong Kaler',
    'Tarogong Kidul',
    'Cikajang',
    'Wanaraja',
    'Kadungora',
    'Samarang',
    'Selaawi',
    'Cisurupan',
    'Cisewu',
    'Cibiuk',
    'Bayongbong',
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Katalog UMKM & Jasa Lokal</h1>
        <p className="text-sm text-gray-500">Temukan produk dan layanan terbaik dari pelaku usaha lokal.</p>
      </div>

      <FilterBar categories={categories || []} districts={districts} />

      {listings && listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {listings.map((item) => (
            <UMKMCard key={item.id} listing={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200 space-y-2">
          <p className="text-gray-600 font-medium text-sm">Data UMKM belum ditemukan atau tabel di Supabase masih kosong.</p>
          <p className="text-xs text-gray-400">Pastikan Script Seed SQL sudah dijalankan di Supabase Editor atau tambahkan usaha baru.</p>
        </div>
      )}
    </main>
  );
}
