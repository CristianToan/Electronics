import Breadcrumb from "@/components/Breadcrumb";
import ProductFilters from "@/components/ProductFilters";
import ProductFiltersSide from "@/components/ProductFiltersSide";
import ProductItem from "@/components/ProductItem";
import ProductSort from "@/components/ProductSort";
import { SETTINGS } from "@/constants/settings";
import { Metadata, NextPage } from "next";
// import { redirect } from 'next/navigation';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
import { TProduct } from "@/types/modes";
import PaginationComponent from "@/components/PaginationComponent";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "Sản phẩm - Electronics",
  description: "Sản phẩm siêu thị điện máy",
};

export default async function ProductPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams.page || 1;
  const limit = 12;

  let fetchProducts;
  let pagination;
  try {
    const dataProduct = await fetch(
      `${SETTINGS.URL_API}/v1/products?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 60 },
      }
    );
    fetchProducts = await dataProduct.json();
    pagination = fetchProducts.data.pagination;
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  return (
    <>
      <div className='body-content bg-page'>
        <div className='container'>
          <div className='wrap-product'>
            <Breadcrumb pageName={"Sản phẩm"} />
            <ProductFilters />

            <div className='clearfix pt-3' />
            <div className='row'>
              <div className='col-12 col-md-9'>
                <ProductSort />
                <div className='row'>
                  <div id='getproducts' className='col-12 col-md-12'>
                    <div className='row product-list product-list-bycate mb-3'>
                      {fetchProducts?.data?.products_list?.length > 0 &&
                        fetchProducts.data?.products_list.map(
                          (product: TProduct) => {
                            return (
                              <div
                                key={`child_${product._id}`}
                                className='col-6 col-md-3 col-lg-3'
                              >
                                <ProductItem product={product} />
                              </div>
                            );
                          }
                        )}
                    </div>
                    <PaginationComponent totalPages={pagination.totalPages} />
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
// Fetch dữ liệu từ server dựa vào trang hiện tại
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const page = parseInt((context.query.page as string) || "1", 10);

//   try {
//     const res = await fetch(
//       `${SETTINGS.URL_API}/v1/products?page=${page}&limit=${ITEMS_PER_PAGE}`,
//       {
//         next: { revalidate: 60 },
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch products");
//     }

//     const data = await res.json();

//     return {
//       props: {
//         products: data.data.products_list,
//         totalProducts: data.data.total_products, // Đảm bảo API trả về tổng số sản phẩm
//         currentPage: page,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return {
//       props: {
//         products: [],
//         totalProducts: 0,
//         currentPage: page,
//       },
//     };
//   }
// };
