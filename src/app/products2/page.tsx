import { supabase } from "@/lib/supabase"
import ProductGrid2 from "./components/ProductGrid2";

export type Product = {
    id: number;
    name: string;
    slug: string;
    caption: string | null;
    price: number;
    image_url: string;
    category: string | null;
}

export default async function Products2(){
    const {data: products, error} = await supabase
    .from('products')
    .select('*')
    .order('name', {ascending: true})
    .order('category', {ascending: true})
    if (error){
        return <p>Fetching lu Error bang</p>;
    }
    
    return(
        <>
            <div className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <ProductGrid2 products={products || []} />
                </div>
            </div>
        </>
    )
}