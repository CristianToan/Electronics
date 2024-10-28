"use client";
import { SETTINGS } from "@/constants/settings";
import { formatToVND } from "@/helpers/numbersToCurrency";
import Image from "next/image";
import React from "react";

const ProductItem = ({
  thumbnail,
  discount = 0,
  product_name,
  price,
  slug,
}: {
  thumbnail: string;
  discount?: number;
  product_name?: string;
  price?: number;
  slug?: string;
}) => {
  return (
    <div className='card item mb-4'>
      <a href={`products/${slug}`} className='product-item'>
        <div className='card-img-top'>
          <Image
            src={SETTINGS.URL_IMAGE + "/" + thumbnail}
            width={300}
            height={300}
            alt={String(product_name)}
            priority
          />
        </div>
        <div className='card-body flex flex-col'>
          <p className='product-specialtype-box'>
            <Image
              src='https://cf.shopee.vn/file/5c61cd4e3877f2b709295cd2ba6800d7'
              width={200}
              height={100}
              alt='Khuyến mại'
              priority
            />
            <span className=''>{discount}%</span>
          </p>
          <p className='card-title product-name'>{product_name}</p>
          <ul className='list-inline product-attributes'></ul>
          <p className='product-price-regular'>
            <span>{price && formatToVND(price)}</span>
          </p>
          <p className='card-text product-price'>
            {price && formatToVND((price / 100) * (100 - discount))}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ProductItem;
