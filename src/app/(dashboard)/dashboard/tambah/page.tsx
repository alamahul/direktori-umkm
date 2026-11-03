import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function TambahUMKMPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');

  async function handleSubmit(formData: FormData) {
    'use server';

    const supabase = await createClient();
    const title = formData.get('title') as string;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const payload = {
      title,
      slug,
      category_id: formData.get('category_id'),
      phone_number: formData.get('phone_number'),
      district: formData.get('district'),
      address: formData.get('address'),
      description: formData.get('description'),
      city: 'Garut',
      images: ['https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800'], // Fallback image untuk MVP
    };

    const { error } = await supabase.from('listings').insert([payload]);

    if (!error) {
      redirect(`/umkm/${slug}`);
    } else {
      console.error(error);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daftarkan UMKM / Profesi Anda</h1>
          <p className="text-sm text-gray-500">Tampilkan usaha Anda di katalog lokal secara gratis.</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nama Usaha / Jasa</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Contoh: Keripik Tempe Renyah Barokah"
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Kategori</label>
              <select
                name="category_id"
                required
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Pilih Kategori</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Kecamatan</label>
              <input
                type="text"
                name="district"
                required
                placeholder="Contoh: Tarogong Kidul"
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nomor WhatsApp (Aktif)</label>
            <input
              type="text"
              name="phone_number"
              required
              placeholder="081234567890"
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Alamat Lengkap</label>
            <textarea
              name="address"
              rows={2}
              required
              placeholder="Jl. Pembangunan No. 12..."
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Deskripsi Lengkap</label>
            <textarea
              name="description"
              rows={4}
              required
              placeholder="Jelaskan produk, keunggulan, atau layanan yang ditawarkan..."
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition shadow-sm"
          >
            Kirim & Publikasikan Usaha
          </button>
        </form>
      </div>
    </main>
  );
}