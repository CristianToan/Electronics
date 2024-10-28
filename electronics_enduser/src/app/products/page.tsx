import ProductFilters from "@/components/ProductFilters";
import ProductFiltersSide from "@/components/ProductFiltersSide";
import ProductItem from "@/components/ProductItem";
import ProductSort from "@/components/ProductSort";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sản phẩm - Electronics",
  description: "Sản phẩm siêu thị điện máy",
};

const products = Array.from(Array(20).keys()) // Chỉ giả lập, khi gọi API sẽ xóa

export default async function Page() {
  return (
    <>
      <div className="body-content bg-page">
        <div className="container">
          <div className="wrap-product">
            <div className="row">
              <div className="col-12">
                <h1 className="breadcrumb-highlight">
                  Sản phẩm
                </h1>
                <nav>
                  <ol
                    className="breadcrumb"
                    itemType="https://schema.org/BreadcrumbList"
                  >
                    <li
                      className="breadcrumb-item"
                      itemProp="itemListElement"
                      itemType="https://schema.org/ListItem"
                    >
                      <Link href="/" itemProp="item">
                       
                        <span itemProp="name">Electronics</span>
                        <meta itemProp="position" />
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">
                      <span>Sản phẩm</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="clearfix pt-3"> </div>
            
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
