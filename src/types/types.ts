export interface ProductImage {
  Image_ID?: number;
  Image_URL?: string;
  MainImage?: boolean;
  Product_ID?: number;
  position?: string;
  sort_order?: number;
  title?: string;
  image_url?: string;
  Category_Image?: string;
}

export interface ProductMark {
  Mark_Name: "hit" | "sale" | "new" | "premium" | "discount";
  color_code: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  old_price: number | null;
  images: ProductImage[];
  marks: ProductMark[];
}

export interface Category {
  Category_ID: number;
  Category_Name: string;
  Category_Image: string | null;
  category_images: any[] | null;
  parent_category_id: number | null;
  sort_order: number;
}

export interface ApiMainResponse {
  categories: Category[];
  products: Product[];
  pagination: {
    current_page: number;
    has_next: boolean;
    has_prev: boolean;
    per_page: number;
    total_pages: number;
    total_products: number;
  };
  special_project_parameters_json: {
    fast_search_strings: {
      parameters_list: string[];
    };
  };
  status: string;
}

export interface FilterParams {
  search?: string;
  category?: number;
  min_price?: number;
  max_price?: number;
  per_page?: number;
  page?: number;
}
