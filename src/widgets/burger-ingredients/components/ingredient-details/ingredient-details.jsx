import { useSelector } from "react-redux";
import { ingredientDetailsType } from "../../../../shared/utils/types";
import BurgerIngredientsModalStyles from "./style.module.css";

export const IngredientDetails = () => {
    const ingredient = useSelector(store => store.ingredientsDetails.details)

    return (
        <div className={BurgerIngredientsModalStyles.card}>
            <div className={BurgerIngredientsModalStyles.titleButton}>
                <p className="text text_type_main-large">Детали ингредиента</p>
            </div>
            <img className={BurgerIngredientsModalStyles.ingredientModalIllustration} src={ingredient.image_large} alt={`${ingredient.name}`} />
            <div className={BurgerIngredientsModalStyles.content}>
                <p className={`${BurgerIngredientsModalStyles.ingredientTitle} text text_type_main-medium`}>{ingredient.name}</p>
                <div className={BurgerIngredientsModalStyles.nutritionValues}>
                    <div>
                        <p className={`${BurgerIngredientsModalStyles.valueNames} text text_type_main-default`}>Калории,ккал</p>
                        <p className={`${BurgerIngredientsModalStyles.values} text text_type_digits-default`}>{ingredient.calories}</p>
                    </div>
                    <div>
                        <p className={`${BurgerIngredientsModalStyles.valueNames} text text_type_main-default`}>Белки, г</p>
                        <p className={`${BurgerIngredientsModalStyles.values} text text_type_digits-default`}>{ingredient.proteins}</p>
                    </div>
                    <div>
                        <p className={`${BurgerIngredientsModalStyles.valueNames} text text_type_main-default`}>Жиры, г</p>
                        <p className={`${BurgerIngredientsModalStyles.values} text text_type_digits-default`}>{ingredient.fat}</p>
                    </div>
                    <div>
                        <p className={`${BurgerIngredientsModalStyles.valueNames} text text_type_main-default`}>Углеводы, г</p>
                        <p className={`${BurgerIngredientsModalStyles.values} text text_type_digits-default`}>{ingredient.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredientDetailsType
}