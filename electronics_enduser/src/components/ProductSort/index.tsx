import React from 'react'

const ProductSort = () => {
  return (
    <div className="row">
        <div className="col-12 col-md-12">
        <ul id="sort-by-full" className="list-unstyled">
            <li>
            <b>Sắp xếp theo:</b>
            </li>
            <li>
            <a href="">
                
                <i className="fa fa-sort-amount-asc" />
                &nbsp;Giá thấp
            </a>
            </li>
            <li>
            <a href="">
                
                <i className="fa fa-sort-amount-desc" />
                &nbsp;Giá cao
            </a>
            </li>
            <li>
            <a href="">
                
                <i className="fa fa-star" />
                &nbsp;Bán chạy
            </a>
            </li>
        </ul>
        </div>
    </div>
  )
}

export default ProductSort
