import { supabase } from "@/lib/supabase";
import ProductGrid from "@/app/products/components/productGrid";

// Definisikan tipe data agar bisa digunakan di komponen lain
export type Product = {
  id: number;
  name: string;
  slug: string;
  caption: string;
  price: number;
  image_url: string;
  category: string | null;
  description: string;
};

// Ini tetap menjadi Server Component untuk fetch data
export default async function ProductsPage() {
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    return <p>Maaf, terjadi kesalahan saat mengambil data produk.</p>;
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Panggil Client Component dan kirim data produk sebagai props */}
        <ProductGrid products={products || []} />
        
      </div>
    </div>
  );
}