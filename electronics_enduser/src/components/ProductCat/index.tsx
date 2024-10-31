"use client";
import React, { useEffect, useState } from "react";
import ProductBox from "../ProductBox";
import { SETTINGS } from "@/constants/settings";
import { TProductsCat } from "@/types/modes";

const ProductCat = () => {
  const [productsCat, setProductsCat] = useState<TProductsCat[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${SETTINGS.URL_API}/v1/categories?limit=5&sort=order&order=ASC`
        );
        const data = await res.json();

        setProductsCat(data.data.categories_list);
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
        {productsCat?.map((item) => {
          return (
            item.isActive == true && (
              <ProductBox key={`product_cat_${item._id}`} dataCategory={item} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default ProductCat;
