'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';

interface FilterBarProps {
  categories: { name: string; slug: string }[];
  districts: string[];
}

export default function FilterBar({ categories, districts }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get('q') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentDistrict = searchParams.get('district') || '';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    startTransition(() => {
      router.push(`/umkm?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push('/umkm');
    });
  };

  const hasActiveFilters = currentSearch || currentCategory || currentDistrict;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari UMKM atau Jasa..."
            defaultValue={currentSearch}
            onChange={(e) => updateFilters('q', e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Category Select */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={currentCategory}
            onChange={(e) => updateFilters('category', e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition appearance-none cursor-pointer"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Select */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={currentDistrict}
            onChange={(e) => updateFilters('district', e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition appearance-none cursor-pointer"
          >
            <option value="">Semua Kecamatan</option>
            {districts.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Filter Button */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
          <span className="text-gray-500">
            {isPending ? 'Memuat data...' : 'Filter aktif'}
          </span>
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
          >
            <X className="w-3.5 h-3.5" />
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}