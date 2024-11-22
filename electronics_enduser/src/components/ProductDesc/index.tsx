"use client"
import { formatToVND } from '@/helpers/numbersToCurrency'
import { useCart } from '@/stores/useCart'
import { TProduct } from '@/types/modes'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDesc = ({product}: {product: TProduct}) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numberValue = Number(value);
        if (!isNaN(numberValue) && numberValue >= 1) {
          setQuantity(numberValue);
        } else if (value === "") {
          setQuantity(1);
        }
    }
    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
      };
    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };
    const { addToCart} = useCart()

    const handleAddToCart = () => {
        setIsLoading(true)
        addToCart({
          _id: product._id!,
          slug: product.slug,
          product_name: product.product_name,
          price: product.price,
          discount: product.discount,
          price_end: product.price_end,
          thumbnail: product.thumbnail,
          quantity: quantity,
        });
        toast.success("Thêm vào giỏ hàng thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
            setIsLoading(false)
        }, 2000); 
    };

  return (
    <div className="col-12 col-md-5 pdetail-des ">
        <div className="clearfix" />
        <div>
        <div className="pdetail-info">
            <p>
                Thương hiệu: <b>32F4000X</b>
            </p>
            <p>
                Bảo hành: <b>24 tháng, 1 đổi 1 trong 60 ngày</b> 
            </p>
        </div>
        <div className="pdetail-options"></div>
        
        <div className="pdetail-price">
            <div className="pdetail-price-box">
                <h3>{ product.price_end !== null ? formatToVND(product.price_end) : "Liên hệ" }</h3>
                {
                    product.discount > 0 && (
                        <div className="product-price-discount">
                            <p className="product-price-regular">{ formatToVND(product.price) } </p>
                            <p className="product-price-saving">Tiết kiệm ({product.discount}% )</p>
                        </div>
                    )
                }
            </div>
            <div className="order-product">
                <div className="box-quantity d-flex justify-between">
                    <button  onClick={handleDecrease} className="btn btn-minus w-[100px] h-[40px] border-slate-400 outline-0 shadow-none"><i className="fa fa-minus" aria-hidden="true"></i></button>
                    <input
                        type="number"
                        className="form-control h-[40px] text-center shadow-none"
                        value={quantity}
                        min={1}
                        onChange={handleChange}
                    />

                    <button onClick={handleIncrease} className="btn btn-plus w-[100px] h-[40px] border-slate-400 outline-0 shadow-none"><i className="fa fa-plus" aria-hidden="true"></i></button>
                </div>
            </div>
            <button
            onClick={handleAddToCart}
            disabled={product.price_end === null || isLoading}
            type="button" className="btn btn-lg btn-add-cart redirectCart mb-3" >MUA NGAY <br />(Giao hàng tận nơi - Giá tốt - An toàn)</button>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            <div className="pdetail-promotion">
                <p className="pdetail-promotion-title">
                    <i className="fa fa-gift" aria-hidden="true" />
                    Khuyến mại
                </p>
                <div className="pdetail-promotion-body">
                    <ul>
                    <li>
                        Tặng Ấm siêu tốc Coex CK-5120 trị giá đến 279.000đ
                    </li>
                    <li>Tặng Gói hỗ trợ lắp đặt trị giá 200,000đ</li>
                    </ul>
                    <div className="clearfix" />
                </div>
            </div>
        </div>
        <div className="pdetail-promotiongeneral">
            <p className="pdetail-promotiongeneral-title">
            Ưu đãi đi kèm
            </p>
            <div className="pdetail-promotiongeneral-body">
            <ul>
                <li>
                Tặng eVoucher trị giá đến 500.000đ khi thanh toán
                qua Techcombank (áp dụng từ 20/09 - 31/12/2024). Xem
                chi tiết{" "}
                <a
                    href="https://mediamart.vn/uu-dai-thanh-toan/giam-toi-500k-khi-thanh-toan-qua-ngan-hang-techcombank-tai-mediamart"
                    target="_blank"
                >
                    tại đây
                </a>
                .
                </li>
                <li>Tài trợ Trả Góp 0% lãi suất (*)</li>
                <li>
                Bảo hành 24 tháng + lỗi 1 đổi 1 đến 60 ngày (*)
                </li>
                <li>
                Giảm thêm 5% cho cán bộ nhân viên Techcombank khi
                mua các sản phẩm thương hiệu Roler, Coex (Áp dụng từ
                20/09 - 31/12/2024).&nbsp;Xem chi tiết{" "}
                <a
                    href="https://mediamart.vn/uu-dai-thanh-toan/uu-dai-dac-biet-danh-cho-can-bo-nhan-vien-techcombank"
                    target="_blank"
                >
                    tại đây
                </a>
                .
                </li>
                <li></li>
                <li>
                Giảm đến 49% khi mua thêm loa Soundbar. Chi tiết xem{" "}
                <a href="https://mediamart.vn/soundbar">tại đây</a>.
                </li>
                <li>
                Tặng eVoucher ưu đãi trị giá 3.200.000đ. Xem chi
                tiết{" "}
                <a href="https://mediamart.vn/tin-khuyen-mai/tang-voucher-3-2-trieu">
                    tại đây
                </a>
                </li>
                <li>
                Tặng bộ Phiếu Mua Hàng trị giá đến 10 triệu đồng.
                Xem chi tiết{" "}
                <a href="https://mediamart.vn/tin-khuyen-mai/uu-dai-tang-bo-pmh-tri-gia-10-trieu">
                    tại đây
                </a>
                .
                </li>
                <li>
                Tặng Phiếu mua hàng trị giá 100.000đ (Từ 15/7 -
                31/12/2024) (Áp dụng cho đơn hàng gia dụng Thương
                hiệu Coex, Roler kế tiếp trị giá trên 1.000.000đ)
                (từ 15/07 - 31/12/2024). Xem chi tiết{" "}
                <a
                    href="https://mediamart.vn/tin-khuyen-mai/mua-hang-dien-may-cong-nghe-tang-phieu-mua-hang-100000d"
                    target="_blank"
                >
                    tại đây
                </a>
                .
                </li>
                <li></li>
            </ul>
            <div className="clearfix" />
            </div>
        </div>
        
       
        
        
        </div>
    </div>
  )
}

export default ProductDesc
