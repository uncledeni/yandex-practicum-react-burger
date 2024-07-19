import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppHeader } from "../../../widgets/app-header"
import { IngredientDetails } from "../../../widgets/burger-ingredients/components/ingredient-details/ingredient-details"
import { getBurgerIngredients } from "../../../shared/services/actions/burger-ingredients";
import { GET_INGREDIENT_DETAILS } from "../../../shared/services/actions/ingredient-details";

import IngredientPageStyles from "./css/style.module.css";

export const IngredientPage = () => {
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const { id } = useParams();
    const dispatch = useDispatch();

    const getIngredientDetails = (ingredient) => {
        dispatch({ type: GET_INGREDIENT_DETAILS, details: ingredient })
    }

    useEffect(() => {
        dispatch(getBurgerIngredients());
    }, [dispatch]);

    useEffect(() => {
        console.log(ingredients)
        if (ingredients.length !== 0) {
            const ingredient = ingredients.find(ingredient => ingredient._id == id);
            getIngredientDetails(ingredient)
        }
    }, [dispatch, ingredients])

    return (
        <div className={IngredientPageStyles.pageWrapper}>
            <AppHeader />
            <main>
                <IngredientDetails />
            </main>
        </div>
    )
}