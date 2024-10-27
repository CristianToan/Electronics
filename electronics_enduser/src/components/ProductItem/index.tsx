"use client";
import { formatToVND } from "@/helpers/numbersToCurrency";
import Image from "next/image";
import React from "react";

const ProductItem = ({
  thumbnail,
  discount,
  product_name,
  price,
}: {
  thumbnail: string;
  discount?: number;
  product_name?: string;
  price?: number;
}) => {
  return (
    <div className='card item mb-4'>
      <a
        href='/tivi/smart-tivi-samsung-4k-55-inch-55au7700-uhd'
        className='product-item'
      >
        <div className='card-img-top'>
          <span
            className='product-type product-type-11'
            style={{
              display: "block",
              position: "absolute",
              right: 6,
              top: 8,
              fontSize: 11,
              zIndex: 3,
              backgroundColor: "#f1f1f1",
              color: "#333",
              padding: "2px 5px",
              borderRadius: 3,
            }}
          >
            Trả góp 0%
          </span>

          <Image
            src={`http://localhost:8080/${thumbnail}`}
            width={300}
            height={300}
            alt='Smart Tivi Samsung 4K 55 inch 55AU7700 UHD'
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
          <p className='card-text product-price'>9.990.000 ₫</p>
        </div>
      </a>
    </div>
  );
};

export default ProductItem;
