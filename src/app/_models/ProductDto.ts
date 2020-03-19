export interface IProductRequest{
    Barcode: string;
}

export class IProductDto {
    userInfo?: any;
    productInfo: ProductInfo;
    ingredients: Ingredient[];
    additives: Additive[];
    allergens: any[];
}

export interface ProductInfo {
    id: number;
    barcode: string;
    productName: string;
    brands: string;
    nutritionGrades: string;
    imageUrl: string;
    thumbnail: string;
    keyWords: string;
    nutrientLevels: string;
    quantity: string;
    creator: string;
    nutriments: string;
    categories: string;
    ingredientText: string;
}

export interface Ingredient {
    ingredientId: number;
    productId: number;
    vegetarian: string;
    text: string;
    vegan: string;
    ingreId: string;
    rank: number;
    percent: string;
    hasSubIngredients: string;
}

export interface Additive {
    addictiveId: number;
    url: string;
    name: string;
    originalId: string;
    products: number;
    sameAs: string;
}

export interface Payload {
    userInfo?: any;
    productInfo: ProductInfo;
    ingredients: Ingredient[];
    additives: Additive[];
    allergens: Additive[];
}
