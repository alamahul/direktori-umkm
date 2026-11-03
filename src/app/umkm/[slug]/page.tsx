import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { BadgeCheck, MapPin, Phone, ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';

export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: listing } = await supabase
    .from('listings')
    .select('title, description, images')
    .eq('slug', slug)
    .single();

  if (!listing) return { title: 'UMKM Tidak Ditemukan' };

  const desc = listing.description?.slice(0, 160) || '';

  return {
    title: `${listing.title} - Katalog UMKM & Jasa Lokal`,
    description: desc,
    openGraph: {
      title: listing.title,
      description: desc,
      images: listing.images?.[0] ? [listing.images[0]] : [],
    },
  };
}

export default async function UMKMDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: listing } = await supabase
    .from('listings')
    .select('*, category:categories!category_id(name, slug)')
    .eq('slug', slug)
    .single();

  if (!listing) notFound();

  const phone = listing.phone_number ? listing.phone_number.replace(/^0/, '62').replace(/\D/g, '') : '';
  const waUrl = `https://wa.me/${phone}?text=Halo%20${encodeURIComponent(listing.title)},%20saya%20menemukan%20usaha%20Anda%20di%20Katalog%20UMKM.`;

  // Schema.org Structured Data (LocalBusiness) untuk Google Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.title,
    description: listing.description,
    telephone: listing.phone_number,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: listing.district,
      addressRegion: listing.city,
      addressCountry: 'ID',
    },
    image: listing.images?.[0] || '',
  };

  const categoryName = listing.category?.name || 'UMKM';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/umkm"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Main Image */}
          <div className="relative aspect-video w-full bg-gray-100">
            <Image
              src={listing.images?.[0] || '/placeholder-umkm.svg'}
              alt={listing.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-2">
                  {categoryName}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {listing.title}
                  {listing.is_verified && (
                    <span title="Terverifikasi" className="inline-flex items-center">
                      <BadgeCheck className="w-6 h-6 text-blue-500 shrink-0" />
                    </span>
                  )}
                </h1>
              </div>

              {phone && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition shadow-sm"
                >
                  <Phone className="w-4 h-4" /> Hubungi via WhatsApp
                </a>
              )}
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Deskripsi Usaha / Jasa</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{listing.description}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <span>{listing.address}, Kecamatan {listing.district}, {listing.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Terdaftar sejak {new Date(listing.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
