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
