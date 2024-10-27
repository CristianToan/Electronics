"use client";
import React, { useEffect, useState } from "react";
import ProductBox from "../ProductBox";
import { SETTINGS } from "@/constants/settings";

interface TData {
  categories_list: TProductsCat[];
}

interface TProductsCat {
  _id?: string;
  category_name: string;
  description: string;
  slug: string;
  order: number;
  isActive: boolean;
}
const ProductCat = () => {
  const [productsCat, setProductsCat] = useState<TData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${SETTINGS.URL_API}/v1/categories`);
      const data = await res.json();

      setProductsCat(data.data);
    };

    fetchData();
  }, []);
  return (
    <div className='row'>
      <div className='col-12'>
        {/* Giả lập dũ liệu, khi gọi API thì xóa */}
        {productsCat?.categories_list.map((item) => {
          return <ProductBox key={item._id} dataCategory={item} />;
        })}
      </div>
    </div>
  );
};

export default ProductCat;
