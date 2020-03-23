export interface IAllergyDto {
    allergyId: number;
    ingredientId: number;
    url: string;
    name: string;
    originalId: string;
    products: number;
    sameAs: string;
    ingredientsTextWithAllergens: string;
    allergensFromIngredients: string;
    allergens: string;
    allergensTags: string;
}

export interface IListAllergyDto{
    allergies: IAllergyDto[]
}