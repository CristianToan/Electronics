export type TCategory = {
  _id: string;
  category_name: string;
  slug: string;
  imageUrl: string;
  isActive: boolean;
};
export type TBrand = {
  _id: string;
  brand_name: string;
  slug: string;
  logo_url: string;
  isActive: boolean;
};

export type TProduct = {
  _id: string;
  product_name: string;
};
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
  };
  isRecentlyAdded: {
    type: boolean;
  };
  isShowHome: {
    type: boolean;
  };
  isDelete: {
    type: boolean;
  };
  specifications: {
    type: string;
  };
}

export interface TProductsCat {
  _id?: string;
  category_name: string;
  description: string;
  slug: string;
  order: number;
  isActive: boolean;
}

export type TFilterPrice = {
  id: number;
  title: string;
  href: string;
  min: number;
  max: number;
};
