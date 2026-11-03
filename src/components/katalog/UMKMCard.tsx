import Link from 'next/link';
import Image from 'next/image';
import { BadgeCheck, MapPin, Phone } from 'lucide-react';
import { Listing } from '@/types/database';

interface UMKMCardProps {
  listing: Listing;
}

export default function UMKMCard({ listing }: UMKMCardProps) {
  // Format nomor WhatsApp
  const phone = listing.phone_number ? listing.phone_number.replace(/^0/, '62').replace(/\D/g, '') : '';
  const waUrl = `https://wa.me/${phone}?text=Halo%20${encodeURIComponent(listing.title)},%20saya%20menemukan%20usaha%20Anda%20di%20Katalog%20UMKM.`;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Aspect ratio image wrapper */}
        <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
          <Image
            src={listing.images?.[0] || '/placeholder-umkm.svg'}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {listing.is_featured && (
            <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
              Featured
            </span>
          )}
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-1">
            <Link
              href={`/umkm/${listing.slug}`}
              className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-1 transition"
            >
              {listing.title}
            </Link>
            {listing.is_verified && (
              <span title="Terverifikasi" className="inline-flex items-center">
                <BadgeCheck className="w-5 h-5 text-blue-500 shrink-0" />
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 line-clamp-2">{listing.description}</p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="truncate max-w-[120px]">{listing.district || 'Garut'}</span>
        </div>

        {phone && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium rounded-lg transition"
          >
            <Phone className="w-3.5 h-3.5" />
            Hubungi
          </a>
        )}
      </div>
    </div>
  );
}
