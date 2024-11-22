'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useCart } from "@/stores/useCart";
import { SETTINGS } from "@/constants/setting";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TCustomer } from "@/types/modes";



const CheckoutShop = () => {
  const router = useRouter()
  const {products, clearCart} = useCart()
  const { data: session, status } = useSession();
  const idCustomer = session?.user.id
  console.log("🚀 ~ CheckoutShop ~ idCustomer:", idCustomer)
  const isLoggedIn = status === "authenticated";
  const [customer, setCustomer] = useState<TCustomer | null>(null)
  console.log("🚀 ~ onSubmit ~ session?.user.access_token:", session?.user.access_token)

  useEffect( () => {
    if(isLoggedIn) {
        const infoCustomer = async () => {
          const res = await fetch(`${SETTINGS.URL_API}/v1/customers/${idCustomer}`)
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          const getCustomer = await res.json();
          setCustomer(getCustomer.data)
        }
        infoCustomer()
    }
  },[isLoggedIn,idCustomer])

  const schema = yup.object({
    first_name: yup.lazy(() =>
      isLoggedIn ? yup.string().optional() : yup.string().required("Vui lòng nhập tên")
    ),
    last_name: yup.lazy(() =>
      isLoggedIn ? yup.string().optional() : yup.string().required("Vui lòng nhập họ")
    ),
    phone: yup.lazy(() =>
      isLoggedIn ? yup.string().optional() : yup.string().required("Vui lòng nhập số điện thoại")
    ),
    email: yup.lazy(() =>
      isLoggedIn
        ? yup.string().optional()
        : yup.string().email("Email không hợp lệ").required("Vui lòng nhập email")
    ),
    street: yup.string().required("Vui lòng nhập tên đường"),
    city: yup.string().required("Vui lòng nhập thành phố"),
    state: yup.string(),
    zip_code: yup.string().optional(),
    note: yup.string().optional(),
    payment_type: yup
      .number()
      .positive()
      .min(1)
      .max(4)
      .required("Vui lòng chọn phương thức thanh toán"),
  });
  
  
  
    type FormData = yup.InferType<typeof schema>;
  
  const { register, handleSubmit, reset, setValue, formState: { errors },} = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  
  useEffect(() => {
    if (customer) {
      // Thay vì reset, sử dụng setValue để cập nhật các giá trị mặc định
      setValue('street', customer.street);
      setValue('city', customer.city);
      setValue('state', customer.state);
      setValue('zip_code', customer.zip_code);
    }
  }, [customer, setValue]);
  
  const [buttonText, setButtonText] = useState("Đặt hàng");
  const [isLoading, setIsLoading] = useState(false)
 

  const onSubmit = async (data: FormData) => {
    if (isLoading) return; 
    setButtonText("Đang xử lý")
    setIsLoading(true)
    const payload = {
      customer: { 
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          email: data.email,
          street: data.street,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
          order_note: data.note
      },
      payment_type: data.payment_type,
      // Danh sách sản phẩm
      order_items: products
    }

    const response = await fetch(`${SETTINGS.URL_API}/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user.access_token}`,
      }, 
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      console.error("Failed to submit order:", response.statusText);
      setButtonText("Đặt hàng");
      setIsLoading(false)
      return;
    }

    const result = await response.json();

    console.log("Order submitted successfully:", result);

    setTimeout(() => {
      reset();
      clearCart()
      router.push('/cart?msg=success');
    }, 3000); 
  }

  return (
    <div
      className="row order-checkout"
    >
      <form id="checkout-delivery-address" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="col-12">
          <div>
            {
              !isLoggedIn && (
                <>
                 <h4>THÔNG TIN KHÁCH HÀNG</h4>
                  <div className="form-group row">
                    <div className="col-6 col-md-6 placeholder-text mb-3">
                      <input
                        className="form-control"
                        title="Nhập tên"
                        id="NewAddressForm_ContactName"
                        {...register("first_name")}
                      />
                      <label htmlFor="NewAddressForm_ContactName">
                        Nhập tên (*)
                      </label>
                      <p className="text-red-500">{errors.first_name?.message}</p>
                    </div>
                    <div className="col-6 col-md-6 placeholder-text mb-3">
                      <input
                        className="form-control"
                        placeholder=""
                        title="Nhập họ"
                        id="NewAddressForm_ContactLast"
                        {...register("last_name")}
                      />
                      <label htmlFor="NewAddressForm_ContactLast">
                        Nhập họ (*)
                      </label>
                      <p className="text-red-500">{errors.last_name?.message}</p>
                    </div>
                    <div className="col-6 col-md-6 placeholder-text">
                      <input
                        className="form-control"
                        title="Số điện thoại"
                        id="NewAddressForm_ContactPhone"
                        {...register("phone")}
                      />
                      <label htmlFor="NewAddressForm_ContactPhone">
                        Số điện thoại (*)
                      </label>
                      <p className="text-red-500">{errors.phone?.message}</p>
                    </div>
                    <div className="col-6 col-md-6 placeholder-text">
                      <input
                        className="form-control"
                        id="NewAddressForm_ContactEmail"
                        {...register("email")}
                      />
                      <label htmlFor="NewAddressForm_ContactEmail">
                        Email (*)
                      </label>
                      <p className="text-red-500">{errors.email?.message}</p>
                    </div>
                  </div>
                </>
              )
            }
           
            <h4>CHỌN ĐỊA CHỈ GIAO HÀNG</h4>
            <div className="form-group row">
              <div className="col-6 col-md-6 placeholder-text mb-3">
                <input
                  className="form-control"
                  title="Nhập đường"
                  id="NewAddressForm_ContactStreet"
                  {...register("street")}
                
                />
                <label htmlFor="NewAddressForm_ContactStreet">
                  Nhập đường (*)
                </label>
                <p className="text-red-500">{errors.street?.message}</p>
              </div>
              <div className="col-6 col-md-6 placeholder-text mb-3">
                <input
                  className="form-control"
                  title="Nhập thành phố"
                  id="NewAddressForm_ContactCity"
                  {...register("city")}
                 
                />
                <label htmlFor="NewAddressForm_ContactCity">
                  Nhập thành phố (*)
                </label>
                <p className="text-red-500">{errors.city?.message}</p>
              </div>
              <div className="col-6 col-md-6 placeholder-text mb-3">
                <input
                  className="form-control"
                  title="Nhập bang"
                  id="NewAddressForm_ContactState"
                  {...register("state")}
                />
                <label htmlFor="NewAddressForm_ContactState">
                  Nhập bang
                </label>
              </div>
              <div className="col-6 col-md-6 placeholder-text mb-3">
                <input
                  className="form-control"
                  title="Mã bưu chính"
                  id="NewAddressForm_ContactZipCode"
                  {...register("zip_code")}
                 
                />
                <label htmlFor="NewAddressForm_ContactZipCode">
                  Mã bưu chính
                </label>
              </div>
            </div>
            <h4>PHƯƠNG THƯC THANH TOÁN</h4>
            <div className="form-group row">
              <div className="col-12 px-[15px] d-flex gap-[10px]">
                <label className="d-flex gap-[10px]">
                  <input defaultChecked  type="radio" value={1} {...register("payment_type")} />
                  COD
                </label>
                <label className="d-flex gap-[10px]">
                  <input type="radio" value={2} {...register("payment_type")} />
                  Credit
                </label>
                <label className="d-flex gap-[10px]">
                  <input type="radio" value={3} {...register("payment_type")} />
                  ATM
                </label>
                <label className="d-flex gap-[10px]">
                  <input type="radio" value={4} {...register("payment_type")} />
                  Cash
                </label>
              </div>
              <div className="col-12 px-[15px]">
                <textarea rows={3} className="form-control" placeholder="Ghi chú: thời gian nhận hàng, cà thẻ tại nhà ..."  {...register("note")} id="NewAddressForm_OrderNote" ></textarea>
                <p className="text-red-500">{errors.note?.message}</p>
              </div>
            </div>
          
            <div className="form-group">
              <div className="text-right">
                <button id="btnOrderCheckOutSubmit" className="btn btn-order" disabled={isLoading}>
                  {isLoading && <i className="fa fa-refresh mr-3 fa-spin" aria-hidden="true"></i>}
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        
      </form>
    </div>
  );
};

export default CheckoutShop;
