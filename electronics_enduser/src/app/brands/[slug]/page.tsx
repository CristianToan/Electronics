import { SETTINGS } from "@/constants/setting";
import { TProduct } from "@/types/modes";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = params.slug;
    let brand
    try {
        const res = await fetch(`${SETTINGS.URL_API}/v1/brands/slug/${slug}`, {
            next: { revalidate: 60 },
        });
        brand = await res.json();
    } catch (error) {
        console.error('Error fetching brands:', error);
    }
   
    return {
        title: `${brand?.data?.brand_name} - Sản phẩm`,
        description: `Sản phẩm đến từ  ${brand?.data?.brand_name}`,
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    let allProducts
    try {
        const res = await fetch(`${SETTINGS.URL_API}/v1/products/brand/${slug}`, {
            next: { revalidate: 60 },
        });
        allProducts = await res.json();
    } catch (error) {
        console.error('Error fetching product brands:', error);
    }
    
    return(
        <ul>
            {
                allProducts && allProducts.data.products_list.length > 0 && allProducts.data.products_list.map((p: TProduct) => {
                    return(
                        <li key={p._id}>
                            {p.product_name}
                        </li>
                    )
                })
            }
        </ul>
    ); 
}