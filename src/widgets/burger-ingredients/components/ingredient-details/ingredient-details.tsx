import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GET_INGREDIENT_DETAILS } from "../../../../shared/services/actions/ingredient-details";

import BurgerIngredientsModalStyles from "./style.module.css";

export const IngredientDetails = () => {
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const ingredient = useSelector(store => store.ingredientsDetails.details);
    const { id } = useParams();
    const dispatch = useDispatch();

    const getIngredientDetails = useCallback((ingredient) => {
        dispatch({ type: GET_INGREDIENT_DETAILS, details: ingredient })
    }, [dispatch])   

    useEffect(() => {
        if (ingredients.length !== 0) {
            getIngredientDetails(ingredients.find(ingredient => ingredient._id === id))
        }
    }, [dispatch, ingredients, id ,getIngredientDetails])

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