'use client'
import React, { useState } from 'react'

const ProductFilters = () => {
    const [ isShowFilterBrand, setIsShowFilterBrand ] = useState(false)
    const [ isShowFilterCategory, setIsShowFilterCategory ] = useState(false)
    const [ isShowFilterPrice, setIsShowFilterPrice ] = useState(false)

    const toogleShowBrand = () => {
        setIsShowFilterBrand(!isShowFilterBrand)
        setIsShowFilterCategory(false)
        setIsShowFilterPrice(false)
    }
    const toogleShowCategory = () => {
        setIsShowFilterCategory(!isShowFilterCategory)
        setIsShowFilterBrand(false)
        setIsShowFilterPrice(false)
    }
    const toogleShowPrice = () => {
        setIsShowFilterPrice(!isShowFilterPrice)
        setIsShowFilterBrand(false)
        setIsShowFilterCategory(false)
    }


  return (
    <>
        <div className="row pl-filters pl-filters-deM">
            <div className="col-12 col-md-12">
            <div className="pl-filters-tabs">
                <ul className="nav nav-tabs esw-scroll-x">
                    <li >
                        <a data-toggle="tab"  onClick= {toogleShowBrand}>
                        
                        <span>Hãng</span>
                        <i />
                        </a>
                    </li>
                    <li>
                        <a data-toggle="tab"onClick={toogleShowCategory}>
                        
                        <span>Danh mục</span>
                        <i />
                        </a>
                    </li>
                    <li>
                        <a data-toggle="tab" onClick={toogleShowPrice}>
                        
                        <span>Giá</span>
                        <i />
                        </a>
                    </li>
                
                </ul>
                <div className="tab-content pl-filter-tabcontent">
                    <div
                        id="pl-filterBrand-tab"
                        className= {`pl-filterBrand-tab pl-filterBox tab-pane fade ${isShowFilterBrand ? ('active show') : ''}`}
                    >
                        <a
                        onClick= {toogleShowBrand}
                        className="pl-filter-tabcontent-close tab-content-close"
                        title="Đóng"
                        >
                        Đóng[x]
                        </a>
                        <div className="card">
                        <div className="card-body">
                            <ul className="list-unstyled">
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-782"
                                href="tivi-coex"
                                data-href="coex"
                                data-id={782}
                                data-exist={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/coex_5c9a92a1.png"
                                    alt="Coex"
                                    />
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-4"
                                href="tivi-samsung"
                                data-href="samsung"
                                data-id={4}
                                data-exist={0}
                                >
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/samsung-2XG2f2.png"
                                    alt="Samsung"
                                    />
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-2"
                                href="tivi-sony"
                                data-href="sony"
                                data-id={2}
                                data-exist={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/sony-h4u22e.png"
                                    alt="Sony"
                                    />
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-6"
                                href="tivi-lg"
                                data-href="lg"
                                data-id={6}
                                data-exist={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/lg-OI70q3.png"
                                    alt="LG"
                                    />
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-348"
                                href="tivi-tcl"
                                data-href="tcl"
                                data-id={348}
                                data-exist={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/tcl-VaKze8.png"
                                    alt="TCL"
                                    />
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-755"
                                href="tivi-casper"
                                data-href="casper"
                                data-id={755}
                                data-exist={0}
                                >
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/casper-8NR1sV.png"
                                    alt="Casper"
                                    />
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-780"
                                href="tivi-sharp"
                                data-href="sharp"
                                data-id={780}
                                data-exist={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/sharp-dte6C5.png"
                                    alt="Sharp"
                                    />
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-806"
                                href="tivi-skyworth"
                                data-href="skyworth"
                                data-id={806}
                                data-exist={0}
                                >
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/skyworth-GCDo1y.png"
                                    alt="Skyworth"
                                    />
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-781"
                                href="tivi-toshiba"
                                data-href="toshiba"
                                data-id={781}
                                data-exist={0}
                                >
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/toshiba-m7LbEx.png"
                                    alt="Toshiba"
                                    />
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-819"
                                href="tivi-xiaomi"
                                data-href="xiaomi"
                                data-id={819}
                                data-exist={0}
                                >
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/xiaomi-68M4uk.png"
                                    alt="Xiaomi"
                                    />
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-brand pa-filter-brand-862"
                                href="tivi-hisense"
                                data-href="hisense"
                                data-id={862}
                                data-exist={0}
                                >
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <img
                                    src="https://cdn.mediamart.vn/images/brand/hisense-rssEhM.png"
                                    alt="Hisense"
                                    />
                                </label>
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div
                            className="card-footer pfooter-filter"
                            style={{ display: "none" }}
                        >
                            <a
                            href=""
                            className="pfooter-filter-close brand"
                            >
                            Bỏ chọn
                            </a>
                            <a
                            href=""
                            className="pfooter-filter-countproducts brand"
                            >
                            Xem
                            <b /> kết quả
                            </a>
                        </div>
                        </div>
                    </div>
                    <div
                        id="pl-filterType-tab"
                        className={`pl-filterType-tab pl-filterBox tab-pane fade ${isShowFilterCategory ? ('active show') : ''}`}
                    >
                        <a
                        onClick={toogleShowCategory}
                        className="pl-filter-tabcontent-close tab-content-close"
                        
                        title="Đóng"
                        >
                        Đóng[x]
                        </a>
                        <div className="card">
                        <div className="card-body">
                            <ul className="list-unstyled">
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-type pa-filter-type-11"
                                href="tivi?e=tra-gop-0"
                                data-href="tra-gop-0"
                                data-id={11}
                                data-exist={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Trả góp 0%<small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-type pa-filter-type-12"
                                href="tivi?e=tra-gop-0.5"
                                data-href="tra-gop-0.5"
                                data-id={12}
                                data-exist={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Trả góp 0.5%<small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-type pa-filter-type-14"
                                href="tivi?e=model-moi"
                                data-href="model-moi"
                                data-id={14}
                                data-exist={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Mới 2024<small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-type pa-filter-type-20"
                                href="tivi?e=doc-quyen"
                                data-href="doc-quyen"
                                data-id={20}
                                data-exist={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Độc quyền<small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-type pa-filter-type-53"
                                href="tivi?e=gia-soc"
                                data-href="gia-soc"
                                data-id={53}
                                data-exist={0}
                                >
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Hàng Cao Cấp<small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-type pa-filter-type-59"
                                href="tivi?e=khung-sp-59"
                                data-href="khung-sp-59"
                                data-id={59}
                                data-exist={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Xả Hàng trưng bày<small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div
                            className="card-footer"
                            style={{ display: "none" }}
                        >
                            <a
                            href=""
                            className="pfooter-filter-close type"
                            >
                            Bỏ chọn
                            </a>
                            <a
                            href=""
                            className="pfooter-filter-countproducts type"
                            >
                            Xem <b /> kết quả
                            </a>
                        </div>
                        </div>
                    </div>
                    <div
                        id="pl-filterPriceRange-tab"
                        className= {`pl-filterPriceRange-tab pl-filterBox tab-pane fade ${isShowFilterPrice ? ('active show') : '' }`}
                    >
                        <a
                        onClick={toogleShowPrice}
                        className="pl-filter-tabcontent-close tab-content-close"
                        title="Đóng"
                        >
                        Đóng[x]
                        </a>
                        <div className="card">
                        <div className="card-body">
                            <ul className="list-unstyled">
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-pricerange pa-filter-pricerange-0"
                                href="tivi?p=duoi-5-trieu"
                                data-href="duoi-5-trieu"
                                data-id={0}
                                data-exist={0}
                                data-min=""
                                data-max={5000000}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span> Dưới 5 triệu</span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-pricerange pa-filter-pricerange-1"
                                href="tivi?p=tu-5-7-trieu"
                                data-id={1}
                                data-href="tu-5-7-trieu"
                                data-exist={0}
                                data-min={5000000}
                                data-max={7000000}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span> Từ 5 - 7 triệu</span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-pricerange pa-filter-pricerange-2"
                                href="tivi?p=tu-7-10-trieu"
                                data-id={2}
                                data-href="tu-7-10-trieu"
                                data-exist={0}
                                data-min={7000000}
                                data-max={10000000}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span> Từ 7 - 10 triệu</span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-pricerange pa-filter-pricerange-3"
                                href="tivi?p=tu-10-15-trieu"
                                data-id={3}
                                data-href="tu-10-15-trieu"
                                data-exist={0}
                                data-min={10000000}
                                data-max={15000000}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span> Từ 10 - 15 triệu </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-pricerange pa-filter-pricerange-4"
                                href="tivi?p=tu-15-20-trieu"
                                data-id={4}
                                data-href="tu-15-20-trieu"
                                data-exist={0}
                                data-min={15000000}
                                data-max={20000000}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span> Từ 15 - 20 triệu </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-pricerange pa-filter-pricerange-4"
                                href="tivi?p=tren-20-trieu"
                                data-href="tren-20-trieu"
                                data-exist={0}
                                data-min={20000000}
                                data-max=""
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span> Trên 20 triệu </span>
                                </label>
                                </a>
                            </li>
                            </ul>
                            <div>
                            <div>
                                <div className="priceSlider pa-filter pa-filter-priceslider pa-filter-priceslider-99"></div>
                                <div className="pa-filter-minPrice-maxPrice">
                                <input
                                    type="hidden"
                                    className="originMinPrice"
                                    defaultValue={2890000}
                                />
                                <input
                                    type="hidden"
                                    className="originMaxPrice"
                                    defaultValue={136400000}
                                />
                                <span className="minPrice" />
                                <span className="maxPrice" />
                                <span className="minPriceFormat" />
                                <span className="maxPriceFormat" />
                                </div>
                            </div>
                            </div>
                        </div>
                        <div
                            className="card-footer"
                            style={{ display: "none" }}
                        >
                            <a
                            href=""
                            className="pfooter-filter-close pricerange"
                            >
                            Bỏ chọn
                            </a>
                            <a
                            href=""
                            className="pfooter-filter-countproducts pricerange"
                            >
                            Xem <b /> kết quả
                            </a>
                        </div>
                        </div>
                    </div>
                    <div
                        id="pl-filterAttr-tab-2"
                        className="pl-filterBox pl-filterAttr-tab tab-pane fade"
                    >
                        <a
                        className="pl-filter-tabcontent-close tab-content-close"
                        href=""
                        title="Đóng"
                        >
                        Đóng[x]
                        </a>
                        <div className="card">
                        <div className="card-body">
                            <ul className="list-unstyled">
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-6"
                                href="tivi?f=qled-tv"
                                data-href="qled-tv"
                                data-id={6}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    QLED TV <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-7"
                                href="tivi?f=oled-tv"
                                data-href="oled-tv"
                                data-id={7}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    OLED TV <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-10"
                                href="tivi?f=neo-qled"
                                data-href="neo-qled"
                                data-id={10}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Neo QLED <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-11"
                                href="tivi?f=nanocell-tv"
                                data-href="nanocell-tv"
                                data-id={11}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    NanoCell TV <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-12"
                                href="tivi?f=lifestyle-tv"
                                data-href="lifestyle-tv"
                                data-id={12}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    LifeStyle TV <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-16"
                                href="tivi?f=crystal-uhd-4k"
                                data-href="crystal-uhd-4k"
                                data-id={16}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Crystal UHD <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-17"
                                href="tivi?f=tv-led-thuong"
                                data-href="tv-led-thuong"
                                data-id={17}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    TV LED thường <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-19"
                                href="tivi?f=miniled"
                                data-href="miniled"
                                data-id={19}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    MINILED <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-20"
                                href="tivi?f=micro-led-tv"
                                data-href="micro-led-tv"
                                data-id={20}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Micro LED TV <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-21"
                                href="tivi?f=tv-may-chieu"
                                data-href="tv-may-chieu"
                                data-id={21}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    TV máy chiếu <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div
                            className="card-footer objFilterFooter"
                            style={{ display: "none" }}
                        >
                            <a
                            href=""
                            className="pfooter-filter-close attr"
                            >
                            Bỏ chọn
                            </a>
                            <a
                            href=""
                            className="pfooter-filter-countproducts attr"
                            >
                            Xem
                            <b /> kết quả
                            </a>
                        </div>
                        </div>
                    </div>
                    <div
                        id="pl-filterAttr-tab-3"
                        className="pl-filterBox pl-filterAttr-tab tab-pane fade"
                    >
                        <a
                        className="pl-filter-tabcontent-close tab-content-close"
                        href=""
                        title="Đóng"
                        >
                        Đóng[x]
                        </a>
                        <div className="card">
                        <div className="card-body">
                            <ul className="list-unstyled">
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-22"
                                href="tivi?f=8k-uhd"
                                data-href="8k-uhd"
                                data-id={22}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    8K <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-23"
                                href="tivi?f=4k-uhd"
                                data-href="4k-uhd"
                                data-id={23}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    4K <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-24"
                                href="tivi?f=full-hd-1080p"
                                data-href="full-hd-1080p"
                                data-id={24}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Full HD <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-25"
                                href="tivi?f=hd-ready"
                                data-href="hd-ready"
                                data-id={25}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    HD <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div
                            className="card-footer objFilterFooter"
                            style={{ display: "none" }}
                        >
                            <a
                            href=""
                            className="pfooter-filter-close attr"
                            >
                            Bỏ chọn
                            </a>
                            <a
                            href=""
                            className="pfooter-filter-countproducts attr"
                            >
                            Xem
                            <b /> kết quả
                            </a>
                        </div>
                        </div>
                    </div>
                    <div
                        id="pl-filterAttr-tab-4"
                        className="pl-filterBox pl-filterAttr-tab tab-pane fade"
                    >
                        <a
                        className="pl-filter-tabcontent-close tab-content-close"
                        href=""
                        title="Đóng"
                        >
                        Đóng[x]
                        </a>
                        <div className="card">
                        <div className="card-body">
                            <ul className="list-unstyled">
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-26"
                                href="tivi?f=thai-lan"
                                data-href="thai-lan"
                                data-id={26}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Thái Lan <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-27"
                                href="tivi?f=	malaysia"
                                data-href="	malaysia"
                                data-id={27}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Malaysia <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-28"
                                href="tivi?f=	viet-nam"
                                data-href="	viet-nam"
                                data-id={28}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Việt Nam <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-29"
                                href="tivi?f=indonesia"
                                data-href="indonesia"
                                data-id={29}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Indonesia <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div
                            className="card-footer objFilterFooter"
                            style={{ display: "none" }}
                        >
                            <a
                            href=""
                            className="pfooter-filter-close attr"
                            >
                            Bỏ chọn
                            </a>
                            <a
                            href=""
                            className="pfooter-filter-countproducts attr"
                            >
                            Xem
                            <b /> kết quả
                            </a>
                        </div>
                        </div>
                    </div>
                    <div
                        id="pl-filterAttr-tab-74"
                        className="pl-filterBox pl-filterAttr-tab tab-pane fade"
                    >
                        <a
                        className="pl-filter-tabcontent-close tab-content-close"
                        href=""
                        title="Đóng"
                        >
                        Đóng[x]
                        </a>
                        <div className="card">
                        <div className="card-body">
                            <ul className="list-unstyled">
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1859"
                                href="tivi?f=32-inch"
                                data-href="32-inch"
                                data-id={1859}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    32 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1860"
                                href="tivi?f=43-inch"
                                data-href="43-inch"
                                data-id={1860}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    43 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1862"
                                href="tivi?f=40-inch"
                                data-href="40-inch"
                                data-id={1862}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    40 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1863"
                                href="tivi?f=48-inch"
                                data-href="48-inch"
                                data-id={1863}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    48 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1864"
                                href="tivi?f=49-inch"
                                data-href="49-inch"
                                data-id={1864}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    49 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1865"
                                href="tivi?f=50-inch"
                                data-href="50-inch"
                                data-id={1865}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    50 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1868"
                                href="tivi?f=85-inch"
                                data-href="85-inch"
                                data-id={1868}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    85 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1869"
                                href="tivi?f=86-inch"
                                data-href="86-inch"
                                data-id={1869}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    86 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1871"
                                href="tivi?f=82-inch"
                                data-href="82-inch"
                                data-id={1871}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    82 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1872"
                                href="tivi?f=77-inch"
                                data-href="77-inch"
                                data-id={1872}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    77 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1874"
                                href="tivi?f=88-inch"
                                data-href="88-inch"
                                data-id={1874}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    88 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1876"
                                href="tivi?f=55-inch"
                                data-href="55-inch"
                                data-id={1876}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    55 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1878"
                                href="tivi?f=65-inch"
                                data-href="65-inch"
                                data-id={1878}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    65 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1879"
                                href="tivi?f=70-inch"
                                data-href="70-inch"
                                data-id={1879}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    70 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1880"
                                href="tivi?f=75-inch"
                                data-href="75-inch"
                                data-id={1880}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    75 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1881"
                                href="tivi?f=98-inch"
                                data-href="98-inch"
                                data-id={1881}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    98 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1882"
                                href="tivi?f=110-inch"
                                data-href="110-inch"
                                data-id={1882}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    110 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1883"
                                href="tivi?f=99-inch"
                                data-href="99-inch"
                                data-id={1883}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    99 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1884"
                                href="tivi?f=130-inch"
                                data-href="130-inch"
                                data-id={1884}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    130 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-1885"
                                href="tivi?f=120-inch"
                                data-href="120-inch"
                                data-id={1885}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    120 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-11958"
                                href="tivi?f=42-inch"
                                data-href="42-inch"
                                data-id={11958}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    42 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-13564"
                                href="tivi?f=100-inch"
                                data-href="100-inch"
                                data-id={13564}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    100 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-15279"
                                href="tivi?f=83-inch"
                                data-href="83-inch"
                                data-id={15279}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    83 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-15280"
                                href="tivi?f=97-inch"
                                data-href="97-inch"
                                data-id={15280}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    97 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-19437"
                                href="tivi?f=58-inch"
                                data-href="58-inch"
                                data-id={19437}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    58 inch <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div
                            className="card-footer objFilterFooter"
                            style={{ display: "none" }}
                        >
                            <a
                            href=""
                            className="pfooter-filter-close attr"
                            >
                            Bỏ chọn
                            </a>
                            <a
                            href=""
                            className="pfooter-filter-countproducts attr"
                            >
                            Xem
                            <b /> kết quả
                            </a>
                        </div>
                        </div>
                    </div>
                    <div
                        id="pl-filterAttr-tab-5"
                        className="pl-filterBox pl-filterAttr-tab tab-pane fade"
                    >
                        <a
                        className="pl-filter-tabcontent-close tab-content-close"
                        href=""
                        title="Đóng"
                        >
                        Đóng[x]
                        </a>
                        <div className="card">
                        <div className="card-body">
                            <ul className="list-unstyled">
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-32"
                                href="tivi?f=choi-game-tren-tivi"
                                data-href="choi-game-tren-tivi"
                                data-id={32}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Chơi game trên tivi
                                    <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-33"
                                href="tivi?f=ket-noi-loa-qua-bluetooth"
                                data-href="ket-noi-loa-qua-bluetooth"
                                data-id={33}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    Kết nối loa qua Bluetooth <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-34"
                                href="tivi?f=dieu-khien-duoc-bang-dien-thoai"
                                data-href="dieu-khien-duoc-bang-dien-thoai"
                                data-id={34}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Điều khiển được bằng điện thoại
                                    <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-35"
                                href="tivi?f=chieu-man-hinh-qua-airplay"
                                data-href="chieu-man-hinh-qua-airplay"
                                data-id={35}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    Chiếu màn hình qua Airplay
                                    <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-36"
                                href="tivi?f=tro-ly-ao-bixby-tizen-os"
                                data-href="tro-ly-ao-bixby-tizen-os"
                                data-id={36}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    Trợ lý ảo Bixby (Tizen OS)
                                    <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-37"
                                href="tivi?f=tro-ly-ao-google-assistant"
                                data-href="tro-ly-ao-google-assistant"
                                data-id={37}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    Trợ lý ảo Google Assistant
                                    <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-38"
                                href="tivi?f=tim-kiem-bang-giong-noi-co-ho-tro-tieng-viet"
                                data-href="tim-kiem-bang-giong-noi-co-ho-tro-tieng-viet"
                                data-id={38}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Tìm kiếm bằng giọng nói (có hỗ trợ tiếng
                                    Việt) <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-39"
                                href="tivi?f=dieu-khien-bang-giong-noi-khong-can-remote"
                                data-href="dieu-khien-bang-giong-noi-khong-can-remote"
                                data-id={39}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Điều khiển bằng giọng nói không cần Remote
                                    <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-40"
                                href="tivi?f=chieu-dien-thoai-len-tv-khong-day"
                                data-href="chieu-dien-thoai-len-tv-khong-day"
                                data-id={40}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Chiếu điện thoại lên TV (không dây)
                                    <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div
                            className="card-footer objFilterFooter"
                            style={{ display: "none" }}
                        >
                            <a
                            href=""
                            className="pfooter-filter-close attr"
                            >
                            Bỏ chọn
                            </a>
                            <a
                            href=""
                            className="pfooter-filter-countproducts attr"
                            >
                            Xem
                            <b /> kết quả
                            </a>
                        </div>
                        </div>
                    </div>
                    <div
                        id="pl-filterAttr-tab-836"
                        className="pl-filterBox pl-filterAttr-tab tab-pane fade"
                    >
                        <a
                        className="pl-filter-tabcontent-close tab-content-close"
                        href=""
                        title="Đóng"
                        >
                        Đóng[x]
                        </a>
                        <div className="card">
                        <div className="card-body">
                            <ul className="list-unstyled">
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-19769"
                                href="tivi?f=google-tv"
                                data-href="google-tv"
                                data-id={19769}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Google TV <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-19770"
                                href="tivi?f=android"
                                data-href="android"
                                data-id={19770}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Android <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-19771"
                                href="tivi?f=webos"
                                data-href="webos"
                                data-id={19771}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    WebOS <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-19772"
                                href="tivi?f=tizenos"
                                data-href="tizenos"
                                data-id={19772}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    TizenOS <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-19773"
                                href="tivi?f=linux"
                                data-href="linux"
                                data-id={19773}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    Linux <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-21649"
                                href="tivi?f=coolita-20"
                                data-href="coolita-20"
                                data-id={21649}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Coolita 2.0 <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            <li>
                                <a
                                className="pa-filter pa-filter-count pa-filter-attr pa-filter-attr-23108"
                                href="tivi?f=coolita"
                                data-href="coolita"
                                data-id={23108}
                                data-exist={0}
                                data-slug={0}
                                >
                                
                                <label className="checkbox">
                                    
                                    <input type="checkbox" />
                                    <span>
                                    
                                    Coolita <small>(0)</small>
                                    </span>
                                </label>
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div
                            className="card-footer objFilterFooter"
                            style={{ display: "none" }}
                        >
                            <a
                            href=""
                            className="pfooter-filter-close attr"
                            >
                            Bỏ chọn
                            </a>
                            <a
                            href=""
                            className="pfooter-filter-countproducts attr"
                            >
                            Xem
                            <b /> kết quả
                            </a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className="clearfix pt-3" />
    </>
  )
}

export default ProductFilters
