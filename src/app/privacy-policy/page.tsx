export const metadata = {
  title: 'Kebijakan Privasi - Katalog UMKM',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 prose prose-slate">
      <h1 className="text-3xl font-bold mb-6">Kebijakan Privasi</h1>
      <p className="text-gray-600">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
      
      <p>
        Katalog UMKM berkomitmen untuk melindungi privasi pengguna kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
      </p>

      <h2>Informasi yang Kami Kumpulkan</h2>
      <p>
        Kami mengumpulkan informasi yang Anda berikan secara langsung saat mendaftarkan UMKM atau jasa Anda, seperti nama usaha, nomor telepon/WhatsApp, alamat, dan deskripsi produk.
      </p>

      <h2>Iklan dan Cookie (Google AdSense)</h2>
      <p>
        Situs kami menggunakan layanan iklan pihak ketiga seperti Google AdSense. Google menggunakan cookie untuk menyajikan iklan berdasarkan kunjungan sebelumnya dari pengguna ke situs web ini atau situs web lain. Penggunaan cookie iklan oleh Google memungkinkan Google dan mitranya untuk menyajikan iklan kepada pengguna berdasarkan kunjungan mereka.
      </p>

      <h2>Kontak Kami</h2>
      <p>
        Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui halaman kontak.
      </p>
    </main>
  );
}