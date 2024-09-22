export interface IProductCategory {
    category_id: number;
    term_id: number;
}

export interface IPrice {
    id: number;
    term_id: number;
    price: number;
}

export interface IImage {
    id: number;
    term_id: number;
    type: string;
    content: string;
}

export interface IStock {
    id: number;
    term_id: number;
    stock: number;
}

export interface IProduct {
    id: number;
    title: string;
    slug: string;
    lang: string;
    auth_id: number;
    status: number;
    type: number;
    count: number;
    created_at: string;
    updated_at: string;
    pivot: IProductCategory;
    price: IPrice;
    preview: IImage;
    addons: Array<any>;
    stock: IStock;

}

export interface PaneloResponseDto {
    id: number;
    name: string;
    user_id: number;
    products: Array<IProduct>;
}
