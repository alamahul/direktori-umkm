// src/app/page.tsx
import KatalogPage from './umkm/[slug]/page';

export default function Home(props: any) {
  return <KatalogPage {...props} />;
}