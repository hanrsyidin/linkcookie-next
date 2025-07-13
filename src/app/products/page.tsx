import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export type Product = {
  id: number;
  name: string;
  slug: string;
  caption: string;
  price: number;
  image_url: string;
  category: string | null;
};

export default async function ProductsPage() {
  
  console.log("Mencoba mengambil data produk dari Supabase..."); // LOG 1
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });

  // LOG untuk melihat hasil dari Supabase
  console.log("Data produk yang diterima:", products); // LOG 2
  console.log("Error yang diterima:", error); // LOG 3

  if (error) {
    console.error("Terjadi error dari Supabase:", error);
    return <p>Maaf, terjadi kesalahan saat mengambil data produk. Cek terminal untuk detail.</p>;
  }

  if (!products || products.length === 0) {
    console.log("Tidak ada produk yang ditemukan atau RLS mungkin memblokir.");
    return <p>Belum ada produk yang tersedia. Pastikan tabel 'products' memiliki data dan policy RLS sudah benar.</p>;
  }

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || 'Other Cookies';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);


  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-16">
          {Object.keys(groupedProducts).map((category) => (
            <section key={category}>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{category}</h2>
              <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
                {groupedProducts[category].map((product: Product) => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.slug}`} 
                    className="group block overflow-hidden rounded-lg border border-zinc-200 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative w-full h-64 sm:h-72">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-zinc-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-zinc-500 truncate">{product.caption}</p>
                      <p className="mt-4 text-md font-bold text-zinc-900">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}