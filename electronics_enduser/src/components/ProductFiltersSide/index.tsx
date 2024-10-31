'use client'
import { SETTINGS } from '@/constants/setting'
import useBrands from '@/stores/useBrands'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import noImage from '@/images/no-image.jpg';
import Skeleton from 'react-loading-skeleton'
import useCategories from '@/stores/useCategories'
import { usePathname } from 'next/navigation'

const ProductFiltersSide = () => {
    const pathname = usePathname();

    const [ isShowBrands, setIshowBrands ] = useState(true)
    const [ isShowCategories, setIshowCategories ] = useState(true)
    const [ isShowPrice, setIshowPrice ] = useState(true)
    
    const [ isPageBrands, setIsPageBrands ] = useState(false)
    const [ isPageCategories, setIsPageCategories] = useState(false)

    const { brands, fetchBrands, isLoading, error} = useBrands()
    const {categories, fetchCategories, ...isStatus } =  useCategories();

    useEffect(() => {
        fetchBrands();
        fetchCategories();
        if(pathname.includes("brands")){
            setIsPageBrands(true)
        }else if(pathname.includes("categories")){
            setIsPageCategories(true)
        }
    }, [fetchBrands, fetchCategories, pathname]);

    const toogleShowBrands  = () => {
        setIshowBrands(!isShowBrands)
    }
    const toogleShowCategories = () => {
        setIshowCategories(!isShowCategories)
    }
    const toogleShowPrice = () => {
        setIshowPrice(!isShowPrice)
    }
 
  return (
    <div className="pl-filters pl-filters-deD sticky-top">
        {
            !isPageBrands &&(
                <div className="accordion-collapse pl-filterBox">
                    <div className="card">
                        <div className="card-header" id="cardHeaderBrand">
                        <h5>
                            <a
                                className="collapsed"
                                onClick={toogleShowBrands}
                            >
                            
                            Hãng <i className="fa fa-angle-down" />
                            </a>
                        </h5>
                        </div>
                        <div
                        className={`collapse ${isShowBrands ? ('show') : ''}`}
                        id="collapseBrand"
                        aria-labelledby="cardHeaderBrand"
                        >
                        <div className="card-body">
                            <ul className="list-unstyled">
                                {error && <li className="alert alert-danger m-0 w-100"> Error: {error}</li>}
                                {   
                                    isLoading ? Array.from({ length: 10 }).map((_, index) => (
                                        <li key = {`filter_sd_br_${index}`}>
                                            <Skeleton height={38} width={160} />
                                        </li>
                                    ))
                                    : brands && brands.length > 0 && (
                                        brands.map((brand, index) => {
                                            return(
                                                <li key = {`filter_sd_br_${index}`}>
                                                    <a
                                                    className="pa-filter pa-filter-fast pa-filter-brand pa-filter-brand-782"
                                                    >
                                                        <label className="checkbox">
                                                            <input type="checkbox" />
                                                            <Image
                                                                src = {brand.logo_url ? `${SETTINGS.URL_IMAGE}/${brand.logo_url}` : noImage }
                                                                alt = { brand.brand_name}
                                                                width={160}
                                                                height={38}
                                                                priority
                                                            />                                    
                                                        </label>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    )
                                }
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
                </div>
            )
        }
        {
            !isPageCategories && (
                <div className="accordion-collapse pl-filterBox">
                    <div className="card">
                        <div className="card-header" id="cardHeaderType">
                        <h5 className="mb-0">
                            <a
                            onClick={toogleShowCategories}
                            className="collapsed"
                            >
                            
                            Danh mục <i className="fa fa-angle-down" />
                            </a>
                        </h5>
                        </div>
                        <div
                        className={`collapse ${isShowCategories ? ('show') : ''}`}
                        id="collapseType"
                        aria-labelledby="cardHeaderType"
                        >
                        <div className="card-body">
                            <ul className="list-unstyled">
                                {isStatus.error && <li className="alert alert-danger m-0 w-100"> Error: {isStatus.error}</li>}
                                {
                                    isStatus.isLoading ? Array.from({ length: 10 }).map((_, index) => (
                                        <li key = {`filter_sd_br_${index}`}>
                                            <Skeleton height={38} width={160} />
                                        </li>
                                    ))
                                    : categories && categories.length > 0 && (
                                        categories.map((category, index) => {
                                            return(
                                                <li key= {`filter_sd_cat_${index}`}>
                                                    <a
                                                    className="pa-filter pa-filter-count pa-filter-type pa-filter-type-11"
                                                    >
                                                    
                                                    <label className="checkbox">
                                                        
                                                        <input type="checkbox" />
                                                        <span>
                                                            { category.category_name}
                                                        </span>
                                                    </label>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    )
                                }
                            </ul>
                        </div>
                        <div className="card-footer" style={{ display: "none" }}>
                            <a href="" className="pfooter-filter-close type">
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
                </div>
            )
        }
        <div className="accordion-collapse pl-filterBox">
        <div className="card">
            <div className="card-header" id="cardHeaderPriceRange">
            <h5>
                <a
                onClick={toogleShowPrice}
                className="collapsed"
                >
                
                Chọn mức giá <i className="fa fa-angle-down" />
                </a>
            </h5>
            </div>
            <div
            className={`collapse ${isShowPrice ? ('show') : ''}`}
            id="collapsePricerange"
            aria-labelledby="cardHeaderPriceRange"
            >
            <div className="card-body">
                <ul className="list-unstyled">
                <li>
                    <a
                    className="pa-filter pa-filter-fast pa-filter-pricerange pa-filter-pricerange-0"
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
                    className="pa-filter pa-filter-fast pa-filter-pricerange pa-filter-pricerange-1"
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
                    className="pa-filter pa-filter-fast pa-filter-pricerange pa-filter-pricerange-2"
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
                    className="pa-filter pa-filter-fast pa-filter-pricerange pa-filter-pricerange-3"
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
                    className="pa-filter pa-filter-fast pa-filter-pricerange pa-filter-pricerange-4"
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
                    className="pa-filter pa-filter-fast pa-filter-pricerange pa-filter-pricerange-4"
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
                        type="range"
                        className="originMinPrice"
                        defaultValue={2890000}
                    />
                    <input
                        type="text"
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
        </div>
        
    </div>
  )
}

export default ProductFiltersSide
