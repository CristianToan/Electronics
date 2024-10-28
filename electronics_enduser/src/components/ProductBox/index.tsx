"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductBanner from "../ProductBanner";
import ProductItem from "../ProductItem";
import { SETTINGS } from "@/constants/settings";
import { TProducts } from "@/types/TProducts";
import { TProductsCat } from "@/types/TProductsCat";
interface TData {
  products_list: TProducts[];
}

const ProductBox = ({ dataCategory }: { dataCategory: TProductsCat }) => {
  const [products, setProducts] = useState<TData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${SETTINGS.URL_API}/v1/products`);
        const data = await res.json();

        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='clearfix' />
      <div className='wrapbox-pList'>
        <ul className='list-unstyled wrapbox-pNavCate wrapbox-pNavCates'>
          <li className='wrapbox-getProducts active' data-w={3} data-cid={17}>
            <h3>
              <a href=''>{dataCategory?.category_name}</a>
            </h3>
          </li>
        </ul>
        <div className='wrapbox-loadProducts wrapbox-loadProducts-3'>
          <div className='wrapbox-loadProduct wrapbox-loadProduct-3-17'>
            <ProductBanner />

            <Swiper
              className='product-list pList-olw'
              modules={[Navigation]}
              spaceBetween={0}
              slidesPerView={5}
              loop={true}
              breakpoints={{
                1200: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 3,
                },
                0: {
                  slidesPerView: 2,
                },
              }}
              navigation
            >
              {/* Giả lập có dữ liệ khi map, gọi API thì xóa  */}
              {products?.products_list.map((item) => {
                if (dataCategory?._id === item.category?._id)
                  return (
                    <SwiperSlide key={item._id}>
                      <ProductItem
                        thumbnail={item.thumbnail}
                        discount={item.discount}
                        product_name={item.product_name}
                        price={item.price}
                      />
                    </SwiperSlide>
                  );
              })}
            </Swiper>

            <a
              className='viewmore viewmorecate'
              href={SETTINGS.URL_enduser + `/${dataCategory.slug}`}
            >
              <span>Xem tất cả {dataCategory?.category_name}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBox;
