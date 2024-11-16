import Breadcrumb from "@/components/Breadcrumb";
import ProductFilters from "@/components/ProductFilters";
import ProductFiltersSide from "@/components/ProductFiltersSide";
import ProductItem from "@/components/ProductItem";
import ProductSort from "@/components/ProductSort";
import { SETTINGS } from "@/constants/setting";
import { TProduct } from "@/types/modes";
import { Metadata } from "next";
import { notFound } from "next/navigation";

async function fetchBrandData(slug: string, searchParams: URLSearchParams) {
  try {
    const url = new URL(`${SETTINGS.URL_API}/v1/products/brand/${slug}`);

    // Add search parameters to the URL
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error("Failed to fetch brand data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const brand = await fetchBrandData(slug, new URLSearchParams());
  if (brand?.statusCode === 400) notFound();

  return {
    title: `${brand?.data?.brand_name} - Sản phẩm`,
    description: `Sản phẩm đến từ  ${brand?.data?.brand_name}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slug = params.slug;

  // Construct URLSearchParams from searchParams object
  const urlSearchParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => urlSearchParams.append(key, v));
    } else if (value) {
      urlSearchParams.append(key, value);
    }
  });

  const brand = await fetchBrandData(slug, urlSearchParams);
  if (!brand) notFound();

  const brandName = brand.data?.brand_name;

  return (
    <>
      <div className='body-content bg-page'>
        <div className='container'>
          <div className='wrap-product'>
            <Breadcrumb pageName={brandName} />

            <ProductFilters />

            <div className='clearfix pt-3' />
            <div className='row'>
              <div className='col-12 col-md-9'>
                <ProductSort />
                <div className='row'>
                  <div id='getproducts' className='col-12 col-md-12'>
                    <div className='row product-list product-list-bycate'>
                      {brand.data.products_list?.map(
                        (item: TProduct, index: number) => (
                          <div key={index} className='col-6 col-md-3 col-lg-3'>
                            <ProductItem product={item} />
                          </div>
                        )
                      )}
                      <a
                        className='row seemoreproducts'
                        href=''
                        title='Xem thêm 544 Tivi'
                      >
                        <span>Xem thêm 544 Tivi</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-0 col-md-3'>
                <ProductFiltersSide />
              </div>
            </div>
            <div className='clearfix pt-3' />
            <div className='row'>
              <div className='category-viewed col-12 col-md-12' />
            </div>
            <div className='clearfix pt-3' />
            <div className='row'>
              <div className='product-viewed col-12 col-md-12' />
            </div>
            <div className='clearfix pt-3' />
          </div>
        </div>
        <div className='clearfix' />
      </div>
      <div className='clearfix'></div>
    </>
  );
}
