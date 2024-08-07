import React from 'react';
import { IngredientDetails } from "../../../widgets/burger-ingredients/components/ingredient-details/ingredient-details";

import IngredientPageStyles from "./css/style.module.css";

export const IngredientPage = () => {
    return (
        <main className={IngredientPageStyles.pageWrapper}>
            <div className={IngredientPageStyles.mainWrapper}>
                <IngredientDetails />
            </div>
        </main>
    )
}