import Breadcrumb from "@/components/Breadcrumb";
import ProductFilters from "@/components/ProductFilters";
import ProductFiltersSide from "@/components/ProductFiltersSide";
import ProductItem from "@/components/ProductItem";
import ProductSort from "@/components/ProductSort";
import { SETTINGS } from "@/constants/setting";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const products = Array.from(Array(20).keys()) // Chỉ giả lập, khi gọi API sẽ xóa

async function fetchCategoriesData(slug: string) {
    try {
        const res = await fetch(`${SETTINGS.URL_API}/v1/categories/slug/${slug}`, {
            next: { revalidate: 60 },
        });
        return res.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = params.slug;
    const categories = await fetchCategoriesData(slug);
    if(categories.statusCode === 400) notFound()
   
    return {
        title: `${categories?.data?.category_name} - Sản phẩm`,
        description: `Sản phẩm thuộc nhóm ${categories?.data?.category_name}`,
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const categories = await fetchCategoriesData(slug);
    const categoryName = categories.data?.category_name
    return(
        <>
        <div className="body-content bg-page">
            <div className="container">
            <div className="wrap-product">
                
                <Breadcrumb pageName = {categoryName} />
                
                <ProductFilters />
                
                <div className="clearfix pt-3" />
                <div className="row">
                <div className="col-12 col-md-9">
                    <ProductSort />
                    <div className="row">
                    <div id="getproducts" className="col-12 col-md-12">
                        <div className="row product-list product-list-bycate">
                        {
                            products?.map( (index) => {
                                return(
                                <div key = {index} className="col-6 col-md-3 col-lg-3">
                                    <ProductItem />
                                </div>
                                )
                            } )
                        }
                        <a
                            className="row seemoreproducts"
                            href=""
                            title="Xem thêm 544 Tivi"
                        >
                            <span>Xem thêm 544 Tivi</span>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-0 col-md-3">
                    <ProductFiltersSide />
                </div>
                </div>
                <div className="clearfix pt-3" />
                <div className="row">
                <div className="category-viewed col-12 col-md-12" />
                </div>
                <div className="clearfix pt-3" />
                <div className="row">
                <div className="product-viewed col-12 col-md-12" />
                </div>
                <div className="clearfix pt-3" />
            </div>
            </div>
            <div className="clearfix" />
        </div>
        <div className="clearfix"></div>
        </>
    ); 
}