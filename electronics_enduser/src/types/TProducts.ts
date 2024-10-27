export interface TProducts {
  _id?: string;
  product_name: string;
  price: number;
  discount: number;
  category: {
    _id?: string;
    category_name: string;
  };
  brand: {
    _id?: string;
    brand_name: string;
  };
  description: string;
  thumbnail: string;
  stock: number;
  slug: string;
  order: number;
  isBest: {
    type: boolean;
    require: false;
    default: false;
  };
  isRecentlyAdded: {
    type: boolean;
    require: false;
    default: false;
  };
  isShowHome: {
    type: boolean;
    require: false;
    default: false;
  };
  isDelete: {
    type: boolean;
    require: false;
    default: false;
  };
  specifications: {
    type: string;
    require: false;
  };
}
