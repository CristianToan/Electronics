import Image from "next/image";
import React from "react";

const ProductItem = ({
  discount,
  product_name,
  price,
  product_attributes = {
    phan_giai: "4K",
    man_hinh: "55inch",
  },
}: {
  discount?: number;
  product_name?: string;
  price?: number;
  product_attributes?: {
    phan_giai: string;
    man_hinh: string;
  };
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
            src='https://cdn.mediamart.vn/thumb/images/product/smart-tivi-samsung-4k-55-inch-55au7700-uhd_81068dbe.jpg'
            width={300}
            height={300}
            alt='Smart Tivi Samsung 4K 55 inch 55AU7700 UHD'
            priority
          />
        </div>
        <div className='card-body flex flex-col'>
          <p className='product-specialtype-box'>
            <Image
              src='https://cdn.mediamart.vn/images/catalog/2010_d503c72b.png'
              width={100}
              height={100}
              alt='Khuyến mại'
              priority
            />
            <span>{discount}%</span>
          </p>
          <p className='card-title product-name'>{product_name}</p>
          <ul className='list-inline product-attributes'>
            <li>{product_attributes.phan_giai}</li>
            <li>{product_attributes.man_hinh}</li>
          </ul>
          <p className='product-price-regular'>
            <span>{price} ₫</span>
          </p>
          <p className='card-text product-price'>9.990.000 ₫</p>
        </div>
      </a>
    </div>
  );
};

export default ProductItem;
