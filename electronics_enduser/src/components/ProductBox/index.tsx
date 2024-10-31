"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ProductBanner from "../ProductBanner";
import ProductItem from "../ProductItem";
import { SETTINGS } from "@/constants/settings";
import { TProducts, TProductsCat } from "@/types/modes";
import {} from "@/types/modes";
import Skeleton from "react-loading-skeleton";
const ProductBox = ({ dataCategory }: { dataCategory: TProductsCat }) => {
  const [products, setProducts] = useState<TProducts[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${SETTINGS.URL_API}/v1/products/category/${dataCategory.slug}?sort=order&order=ASC`
        );
        const data = await res.json();
        const productsPublic = data.data.products_list.filter(
          (item: { isShowHome: boolean }) => item.isShowHome == true
        );
        setProducts(productsPublic);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dataCategory.slug]);

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
              className='product-slider my-4'
              modules={[Navigation, Autoplay]}
              spaceBetween={3}
              slidesPerView={4}
              loop={false}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                1200: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 4,
                },
                992: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 2,
                },
                0: {
                  slidesPerView: 1,
                },
              }}
            >
              {isLoading
                ? Array.from({ length: 20 }).map((_, index) => (
                    <SwiperSlide key={`sl_brand_${index}`}>
                      <div className='brand-slider__item'>
                        <Skeleton height={160} width={560} />
                      </div>
                    </SwiperSlide>
                  ))
                : products && products.length > 0
                ? products?.map((item) => {
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
                  })
                : null}
            </Swiper>

            <a
              className='viewmore viewmorecate'
              href={`/${dataCategory?.slug}`}
            >
              <span>Xem tất cả {dataCategory?.slug}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBox;
