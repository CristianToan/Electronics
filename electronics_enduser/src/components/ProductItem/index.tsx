"use client";
import { SETTINGS } from "@/constants/settings";
import { formatToVND } from "@/helpers/numbersToCurrency";
import { TProducts } from "@/types/modes";
import Image from "next/image";
import React from "react";

const ProductItem = ({ data }: { data: TProducts }) => {
  return (
    <div className='card item mb-4 '>
      <a href={`products/${data.slug}`} className='product-item'>
        <div className='card-img-top'>
          <Image
            src={SETTINGS.URL_IMAGE + "/" + data.thumbnail}
            width={300}
            height={300}
            alt={String(data.product_name)}
            priority
          />
        </div>
        <div className='card-body flex flex-col h-[200px]'>
          <p className='product-specialtype-box'>
            <Image
              src='https://cf.shopee.vn/file/5c61cd4e3877f2b709295cd2ba6800d7'
              width={200}
              height={100}
              alt='Khuyến mại'
              priority
            />
          </p>
          <div className='product-info  flex flex-col'>
            <p className='card-title product-name grow h-10'>
              {data.product_name}
            </p>
            <ul className='list-inline product-attributes'></ul>
            <p className='product-price-regular'>
              <span className='line-through flex-none'>
                {data.price && formatToVND(data.price)}
              </span>
            </p>
            <p className='card-text product-price text-red-700 flex-none'>
              <span>
                {data.price &&
                  formatToVND((data.price / 100) * (100 - data.discount))}
              </span>
              <span className='text-red-700 ml-2'>{-data.discount}%</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductItem;
