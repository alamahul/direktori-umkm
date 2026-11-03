import KatalogPage from '@/app/umkm/page';
import { Metadata } from 'next';

export const instant = false;

export const metadata: Metadata = {
  title: 'Direktori UMKM - Temukan Produk & Jasa Lokal',
  description: 'Portal direktori dan katalog resmi UMKM dan jasa lokal terpercaya.',
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    district?: string;
  }>;
}

export default async function Home(props: PageProps) {
  return <KatalogPage {...props} />;
}
