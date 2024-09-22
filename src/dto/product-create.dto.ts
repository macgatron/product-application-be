export interface ProductCreateDto {
    userId: number;
    title: string;
    slug: string;
    lang: string;
    status: string;
    count: number;
    stock: number;
    category: number;
    price: number;
}
