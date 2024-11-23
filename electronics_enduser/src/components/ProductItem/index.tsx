import React from "react";
import { TProduct } from "@/types/modes";
import { SETTINGS } from "@/constants/setting";
import Image from "next/image";
import Link from "next/link";
import { formatToVND } from "@/helpers/numbersToCurrency";

const ProductItem = ({ product }: { product: TProduct }) => {
  let arr_specifi: any = [];
  if (product?.specifications) {
    arr_specifi = product.specifications.split("\n");
  }

  return (
    <div className="card item mb-4">
      <Link href={`/products/${product?.slug}`} className="product-item">
        <div className="card-img-top">
          <Image
            src={`${SETTINGS.URL_IMAGE}/${product?.thumbnail}`}
            alt={product?.product_name}
            width={300}
            height={300}
            priority
          />
        </div>
        <div className="card-body">
          <p className="card-title product-name">{product?.product_name}</p>
          <ul className="list-inline product-attributes">
            {arr_specifi.slice(0, 3).map((spec: string, index: number) => (
              <li key={index}>
                {spec.split(":").length == 2
                  ? spec.split(":")[1]
                  : spec.split(":")[0]}
              </li>
            ))}
          </ul>
          <div className="card-text product-price">
            {product && product.price ? (
              product.discount ? (
                <>
                  <div>
                    {formatToVND(product.price * (1 - product.discount / 100))}
                  </div>
                  <div>
                    <span
                      className="text-muted "
                      style={{ textDecoration: "line-through" }}
                    >
                      {formatToVND(product.price)}
                    </span>
                    <span style={{ paddingLeft: "5px" }}>
                      {typeof product?.discount === "number" &&
                        product.discount > 0 && (
                          <span className="product-specialtype-box">
                            {product.discount}%
                          </span>
                        )}
                    </span>
                  </div>
                </>
              ) : (
                <span>{formatToVND(product.price)}</span>
              )
            ) : (
              "Liên Hệ"
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
