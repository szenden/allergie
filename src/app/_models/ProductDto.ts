export interface IProductRequest{
    Barcode: string;
}

export interface IProductDto {
    Id: number;
    Barcode: string;
    ProductName: string;
    Brands: string;
    NutritionGrades: string;
    ImageUrl: string;
    Thumbnail: string;
    KeyWords: string;
    NutrientLevels: string;
    Quantity: string;
    Creator: string;
    Nutriments: string;
    Categories: string;
    IngredientText: string;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn: Date;
    ModifiedBy?: any;
}