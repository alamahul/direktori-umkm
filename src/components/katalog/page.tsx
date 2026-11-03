import { createClient } from '@/lib/supabase/server';
import FilterBar from '@/components/katalog/FilterBar';
import UMKMCard from '@/components/katalog/UMKMCard';
import { Listing } from '@/types/database';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    district?: string;
  }>;
}

export const revalidate = 60; // Incremental Static Regeneration (ISR) tiap 60 detik

export default async function KatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Fetch Kategori untuk Filter Bar
  const { data: categories } = await supabase
    .from('categories')
    .select('name, slug')
    .order('name');

  // Query Data Listing UMKM dengan Filter Dynamic
  let query = supabase
    .from('listings')
    .select('*, category:categories(name, slug)')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (params.q) {
    query = query.or(`title.ilike.%${params.q}%,description.ilike.%${params.q}%`);
  }

  if (params.category) {
    query = query.eq('category.slug', params.category);
  }

  if (params.district) {
    query = query.eq('district', params.district);
  }

  const { data: listings } = await query;

  // List Kecamatan Dummy/Statis untuk Garut (Dapat disesuaikan)
  const districts = ['Garut Kota', 'Tarogong Kaler', 'Tarogong Kidul', 'Cikajang', 'Wanaraja', 'Leles'];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Katalog UMKM & Jasa Lokal</h1>
        <p className="text-sm text-gray-500">Temukan produk dan layanan terbaik dari pelaku usaha lokal.</p>
      </div>

      {/* Filter & Search Section */}
      <FilterBar categories={categories || []} districts={districts} />

      {/* Result Grid */}
      {listings && listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {listings.map((item: Listing) => (
            <UMKMCard key={item.id} listing={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium text-sm">Tidak ada UMKM yang sesuai dengan kriteria pencarian Anda.</p>
        </div>
      )}
    </main>
  );
}