import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}