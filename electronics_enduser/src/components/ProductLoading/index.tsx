import ProductFiltersSide from "../ProductFiltersSide";
import ProductSort from "../ProductSort";
import ProductFilters from "../ProductFilters";
import Breadcrumb from "../Breadcrumb";
import Skeleton from "react-loading-skeleton";
const products = Array.from(Array(12).keys()); //fect api xong xoá

export default function ProductLoading() {
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
                      {products?.map((index) => {
                        return (
                          <div key={index} className='col-6 col-md-3 col-lg-3'>
                            <Skeleton className='w-100' height={100} />
                          </div>
                        );
                      })}
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
              <Skeleton
                className='category-viewed col-12 col-md-12'
                height={200}
              />
            </div>
            <div className='clearfix pt-3' />
            <div className='row'>
              <Skeleton
                className='product-viewed col-12 col-md-12'
                height={200}
              />
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
