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

export type TFilterPrice = {
  id: number;
  title: string;
  href: string;
  min: number;
  max: number;
};
