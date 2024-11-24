import { SETTINGS } from "@/constants/setting";
import Image from "next/image";
import React from "react";

const ProductGalleries = ({ imageUrl }: { imageUrl: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [folder, imageAlt] = imageUrl.split("/", 2);
  return (
    <div id='pdetail-images' className='col-12 col-md-7 pdetail-images'>
      <div className='sp-wrap'>
        <div className='pdetail-slideproduct'>
          <a href=''>
            <picture>
              <Image
                src={`${SETTINGS.URL_IMAGE}/${imageUrl}`}
                alt={imageAlt}
                width={612}
                height={408}
                property=''
              />
            </picture>
          </a>
          <a href=''>
            <picture>
              <source
                srcSet='https://cdn.mediamart.vn/images/product/tivi-led-coex-32-inch-32f4000x-hd-ready-hdr_4ddaf9d0.jpg'
                type='image/jpeg'
              />
              <img
                src='https://cdn.mediamart.vn/images/product/tivi-led-coex-32-inch-32f4000x-hd-ready-hdr_4ddaf9d0.jpg'
                alt='Tivi LED Coex 32 inch 32F4000X, HD Ready, HDR'
              />
            </picture>
          </a>
        </div>
      </div>
      <div className='pdetail-nav-modalinfo'>
        <ul>
          <li>
            <a
              className='pdetail-nav-modal-item pdetail-nav-modal-item-1'
              data-id={19439}
              data-item={1}
              title='Đặc điểm nổi bật'
            >
              <span className='nav-modalinfo-icon'>
                <i />
              </span>
              <span className='nav-modalinfo-content'>Đặc điểm nổi bật</span>
            </a>
          </li>
          <li>
            <a
              className='pdetail-nav-modal-item pdetail-nav-modal-item-2'
              data-id={19439}
              data-item={2}
              title='Hình ảnh'
            >
              <span className='nav-modalinfo-icon'>
                <Image
                  src={`${SETTINGS.URL_IMAGE}/${imageUrl}`}
                  alt={imageAlt}
                  width={612}
                  height={408}
                  property=''
                />
              </span>
              <span className='nav-modalinfo-content'>Hình ảnh</span>
            </a>
          </li>
          <li>
            <a
              className='pdetail-nav-modal-item pdetail-nav-modal-item-9'
              data-id={19439}
              data-item={1}
              title='Video'
            >
              <span className='nav-modalinfo-icon'>
                <i />
              </span>
              <span className='nav-modalinfo-content'>Video</span>
            </a>
          </li>
          <li>
            <a
              className='pdetail-nav-modal-item pdetail-nav-modal-item-3'
              data-id={19439}
              data-item={3}
              title='Thông số kỹ thuật'
            >
              <span className='nav-modalinfo-icon'>
                <i />
              </span>
              <span className='nav-modalinfo-content'>Thông số kỹ thuật</span>
            </a>
          </li>
          <li>
            <a
              className='pdetail-nav-modal-item pdetail-nav-modal-item-4'
              data-id={19439}
              data-item={4}
              title='Thông tin sản phẩm'
            >
              <span className='nav-modalinfo-icon'>
                <i />
              </span>
              <span className='nav-modalinfo-content'>Thông tin sản phẩm</span>
            </a>
          </li>
        </ul>
      </div>
      <div className='boxbanner-34'>
        <div className='banner-list'>
          <div className='item banner-item banner-item-1'>
            <a target='"_blank"' href='/#' data-id={5019}>
              <picture>
                <source
                  srcSet='https://cdn.mediamart.vn/images/banner/banner-chinh-sach---policy_45e6dce7.jpg'
                  type='image/jpeg'
                />
                <img
                  src='https://cdn.mediamart.vn/images/banner/banner-chinh-sach---policy_45e6dce7.jpg'
                  alt='Banner Chính sách - Policy'
                  width={850}
                  height={5}
                />
              </picture>
              <span
                className='banner-item-view banner-item-view-5019'
                style={{ display: "none" }}
              />
            </a>
          </div>
        </div>
      </div>
      <div className='clearfix' />
    </div>
  );
};

export default ProductGalleries;
