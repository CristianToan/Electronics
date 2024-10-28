"use client";
import React, { useEffect, useState } from "react";
import ProductBox from "../ProductBox";
import { SETTINGS } from "@/constants/settings";
import { TProductsCat } from "@/types/TProductsCat";

interface TData {
  categories_list: TProductsCat[];
}

const ProductCat = () => {
  const [productsCat, setProductsCat] = useState<TData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${SETTINGS.URL_API}/v1/categories`);
        const data = await res.json();

        setProductsCat(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='row'>
      <div className='col-12'>
        {/* Giả lập dũ liệu, khi gọi API thì xóa */}
        {productsCat?.categories_list
          .map((item) => {
            return (
              item.isActive == true && (
                <ProductBox
                  key={`product_cat_${item._id}`}
                  dataCategory={item}
                />
              )
            );
          })
          .slice(0, 4)}
      </div>
    </div>
  );
};

export default ProductCat;
