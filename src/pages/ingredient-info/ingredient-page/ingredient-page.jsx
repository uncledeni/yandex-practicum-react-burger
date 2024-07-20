import { AppHeader } from "../../../widgets/app-header"
import { IngredientDetails } from "../../../widgets/burger-ingredients/components/ingredient-details/ingredient-details";

import IngredientPageStyles from "./css/style.module.css";

export const IngredientPage = () => {
    return (
        <div className={IngredientPageStyles.pageWrapper}>
            <AppHeader />
            <main className={IngredientPageStyles.mainWrapper}>
                <IngredientDetails />
            </main>
        </div>
    )
}