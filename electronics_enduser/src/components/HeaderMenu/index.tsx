"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { SETTINGS } from "../../constants/settings";
type TCategory = {
  // id: string;
  _id: string;
  category_name: string;
  slug: string;
  imageUrl: string;
};
const HeaderMenu = () => {
  const [isShowCat, setIsShowCat] = useState(false);
  const [categories, setCategories] = useState<{
    data?: { categories_list: TCategory[] };
  }>({});
  const [error, setError] = useState(null);
  const toggleShowCat = () => {
    setIsShowCat(!isShowCat);
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${SETTINGS.URL_API}/v1/categories`, {
        // taạ folder contstants trong app co file settting nhu admin đê gọi link api
        next: { revalidate: 60 }, // Làm mới dữ liệu mỗi 60 giây
      });
      if (!response.ok) {
        throw new Error("Phản hồi mạng không hợp lệ");
      }
      const data = await response.json();
      setCategories(data); // Cập nhật danh sách danh mục
      console.log("category:", data); // Ghi log danh mục
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    fetchCategories(); // Gọi hàm fetchCategories khi component được mount
  }, []); // Mảng phụ thuộc rỗng có nghĩa là hàm này chỉ chạy một lần khi component được mount

  if (error) {
    return <div>Lỗi: {error}</div>; // Hiển thị thông báo lỗi nếu có
  }

  return (
    <div className="bgheader-menu">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-0">
            <div className="box-nav">
              <div className="main-nav navbar navbar-expand-lg navbar-default navbar-inverse">
                <button
                  className="navbar-toggler navbar-toggler-always"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarMain"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="true"
                  aria-label="Toggle navigation"
                  onClick={toggleShowCat}
                >
                  <span className="navbar-toggler-icon"></span>
                  <b>
                    Danh Mục<span> Sản Phẩm</span>
                  </b>
                  <i></i>
                </button>
                <div
                  className={`navbar-collapse navbar-lg collapse ${
                    isShowCat ? "show" : ""
                  }`}
                  id="navbarMain"
                >
                  <ul className="navbar-nav">
                    {categories.data &&
                    categories.data?.categories_list.length > 0
                      ? categories.data?.categories_list.map(
                          (category: TCategory) => (
                            <li
                              key={category._id}
                              className="nav-item dropdown"
                            >
                              <span
                                className="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                {category.imageUrl ? (
                                  <Image
                                    src={`${SETTINGS.URL_IMAGE}/${category.imageUrl}`}
                                    alt={category.category_name}
                                    width={21}
                                    height={30}
                                    priority
                                  />
                                ) : null}
                                <span className="nav-link-text">
                                  <span>
                                    <Link href={category.slug}>
                                      {category.category_name}
                                    </Link>
                                  </span>
                                </span>
                              </span>
                            </li>
                          )
                        )
                      : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
