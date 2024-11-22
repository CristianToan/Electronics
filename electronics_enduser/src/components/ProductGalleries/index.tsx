import Image from 'next/image'
import React from 'react'

const ProductGalleries = () => {
  return (
    <div id="pdetail-images" className="col-12 col-md-7 pdetail-images">
        <div className="sp-wrap">
            <div className="pdetail-brand">
                <Image
                    alt="Coex"
                    src="https://cdn.mediamart.vn/images/brand/coex_5c9a92a1.png"
                    width={612}
                    height={408}
                    property=''
                />
            </div>
            <div className="pdetail-slideproduct">
                <a href="">
                    <picture>
                        <Image
                            src="https://cdn.mediamart.vn/images/product/tivi-led-coex-32-inch-32f4000x-hd-ready-hdr_dded6184.jpg"
                            alt="Tivi LED Coex 32 inch 32F4000X, HD Ready, HDR"
                            width={612}
                            height={408}
                            property=''
                        />
                    </picture>
                </a>
                <a href="">
                    <picture>
                    <source
                        srcSet="https://cdn.mediamart.vn/images/product/tivi-led-coex-32-inch-32f4000x-hd-ready-hdr_4ddaf9d0.jpg"
                        type="image/jpeg"
                    />
                    <img
                        src="https://cdn.mediamart.vn/images/product/tivi-led-coex-32-inch-32f4000x-hd-ready-hdr_4ddaf9d0.jpg"
                        alt="Tivi LED Coex 32 inch 32F4000X, HD Ready, HDR"
                    />
                    </picture>
                </a>
            </div>
        </div>
        <div className="pdetail-nav-modalinfo">
            <ul>
                <li>
                    <a
                    className="pdetail-nav-modal-item pdetail-nav-modal-item-1"
                    data-id={19439}
                    data-item={1}
                    title="Đặc điểm nổi bật"
                    >
                    
                    <span className="nav-modalinfo-icon">
                        <i />
                    </span>
                    <span className="nav-modalinfo-content">Đặc điểm nổi bật</span>
                    </a>
                </li>
                <li>
                    <a
                    className="pdetail-nav-modal-item pdetail-nav-modal-item-2"
                    data-id={19439}
                    data-item={2}
                    title="Hình ảnh"
                    >
                    
                    <span className="nav-modalinfo-icon">
                        
                        <img
                        src="https://cdn.mediamart.vn/thumb/images/product/tivi-led-coex-32-inch-32f4000x-hd-ready-hdr_dded6184.jpg"
                        alt="Hình ảnh sản phẩm"
                        />
                    </span>
                    <span className="nav-modalinfo-content">Hình ảnh</span>
                    </a>
                </li>
                <li>
                    <a
                    className="pdetail-nav-modal-item pdetail-nav-modal-item-9"
                    data-id={19439}
                    data-item={1}
                    title="Video"
                    >
                    
                    <span className="nav-modalinfo-icon">
                        <i />
                    </span>
                    <span className="nav-modalinfo-content">Video</span>
                    </a>
                </li>
                <li>
                    <a
                    className="pdetail-nav-modal-item pdetail-nav-modal-item-3"
                    data-id={19439}
                    data-item={3}
                    title="Thông số kỹ thuật"
                    >
                    
                    <span className="nav-modalinfo-icon">
                        <i />
                    </span>
                    <span className="nav-modalinfo-content">Thông số kỹ thuật</span>
                    </a>
                </li>
                <li>
                    <a
                    className="pdetail-nav-modal-item pdetail-nav-modal-item-4"
                    data-id={19439}
                    data-item={4}
                    title="Thông tin sản phẩm"
                    >
                    
                    <span className="nav-modalinfo-icon">
                        <i />
                    </span>
                    <span className="nav-modalinfo-content">Thông tin sản phẩm</span>
                    </a>
                </li>
            </ul>
        </div>
        <div className="boxbanner-34">
            <div className="banner-list">
            <div className="item banner-item banner-item-1">
                <a target='"_blank"' href="/#" data-id={5019}>
                <picture>
                    <source
                    srcSet="https://cdn.mediamart.vn/images/banner/banner-chinh-sach---policy_45e6dce7.jpg"
                    type="image/jpeg"
                    />
                    <img
                    src="https://cdn.mediamart.vn/images/banner/banner-chinh-sach---policy_45e6dce7.jpg"
                    alt="Banner Chính sách - Policy"
                    width={850}
                    height={5}
                    />
                </picture>
                <span
                    className="banner-item-view banner-item-view-5019"
                    style={{ display: "none" }}
                />
                </a>
            </div>
            </div>
        </div>
        <div className="clearfix" />
        <div className="pdetail-desc">
            <h3>Điểm nổi bật</h3>
            <ul>
            <li>
                <span
                style={{
                    color: "rgb(51,51,51)",
                    fontFamily: "Arial,Helvetica,sans-serif"
                }}
                >
                Màn hình 32 Inch độ phân giải HD
                </span>
                <br
                style={{
                    fontVariantNumeric: "normal",
                    fontVariantEastAsian: "normal",
                    fontStretch: "normal",
                    lineHeight: 24,
                    fontFamily: "Arial,Helvetica,sans-serif",
                    marginBottom: 0,
                    color: "rgb(51,51,51)"
                }}
                />
                <span
                style={{
                    color: "rgb(51,51,51)",
                    fontFamily: "Arial,Helvetica,sans-serif"
                }}
                >
                Công nghệ hình ảnh&nbsp;HDR10, âm thanh Dolby Audio
                </span>
            </li>
            <li>
                Hình ảnh sống động như đang xem tại rạp với chuỗi định dạng hình ảnh
                HDR10
            </li>
            <li>Xem truyền hình kỹ thuật số miễn phí với đầu thu DVB-T2</li>
            <li>Tivi LED Coex hỗ trợ nhiều cổng kết nối tiện dụng</li>
            <li></li>
            </ul>
        </div>
    </div>
  )
}

export default ProductGalleries
