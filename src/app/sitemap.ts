import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://domain-anda.com';
  const supabase = await createClient();

  const { data: listings } = await supabase.from('listings').select('slug, created_at');

  const listingUrls = (listings || []).map((item) => ({
    url: `${baseUrl}/umkm/${item.slug}`,
    lastModified: new Date(item.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/umkm`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...listingUrls,
  ];
}