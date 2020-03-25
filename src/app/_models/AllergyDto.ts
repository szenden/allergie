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
    potentialReactions: string;
    remarks: string;
}

export interface IAllergy {
    allergyId: number;
    name: string;
    isChecked: boolean;
}

export interface IListAllergyDto{
    allergies: IAllergyDto[]
}

export interface IListUserAllergyDto{
    allergies: IAllergy[]
}