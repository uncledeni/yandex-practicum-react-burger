import React from "react";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsStyles from "./css/style.module.css"
import { INGREDIENTS_DATA as TEMP_DATA } from "../../shared/utils/data";

const BUN_TYPE = "bun";
const MAIN_TYPE = "main";
const SAUCE_TYPE = "sauce";

const IngredientsTabs = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={BurgerIngredientsStyles.ingredientsTabsContainer}>
            <Tab value="burger" active={current === 'burger'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="filling" active={current === 'filling'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

const Ingredients = () => {
    return (
        <div className={BurgerIngredientsStyles.ingredientsList}>
            <IngredientsStack title="Булки" data={TEMP_DATA} type={BUN_TYPE} />
            <IngredientsStack title="Начинка" data={TEMP_DATA} type={MAIN_TYPE} />
            <IngredientsStack title="Соусы" data={TEMP_DATA} type={SAUCE_TYPE} />
        </div>
    )
}

const IngredientsStack = (props) => {
    return (
        <div className={BurgerIngredientsStyles.ingredientsStackWrapper}>
            <p className={`${BurgerIngredientsStyles.ingredientsStackTitle} text text_type_main-medium`}>{props.title}</p>
            <div className={BurgerIngredientsStyles.ingredientsStackContent}>
                {props.data.map((ingredient) => (
                    (ingredient.type === props.type) && <IngredientElem key={ingredient._id} ingredient={ingredient} />
                ))}
            </div>
        </div>
    )
}

const IngredientElem = (props) => {
    return (
        <div className={BurgerIngredientsStyles.ingredientElemWrapper}>
            <Counter count={1} size="default" extraClass={`${BurgerIngredientsStyles.counterElem} m-1`} />
            <div className={BurgerIngredientsStyles.ingredientElemContent}>
                <img className={BurgerIngredientsStyles.ingredientElemIllustration} src={props.ingredient.image} alt={`${props.ingredient.name}`} />
                <div className={BurgerIngredientsStyles.ingredientElemPrice}>
                    <p className="text text_type_digits-default">{props.ingredient.price}</p>
                    <CurrencyIcon />
                </div>
                <h3 className={`${BurgerIngredientsStyles.ingredientElemName} text text_type_main-default`}>{props.ingredient.name}</h3>
            </div>
        </div>
    )
}

export const BurgerIngredients = (data) => {
    return (
        <div className={BurgerIngredientsStyles.burgerIngredientsWrapper}>
            <p className={`${BurgerIngredientsStyles.burgerIngredientsWrapperTitle} text text_type_main-large`}>Соберите бургер</p>
            <IngredientsTabs />
            <Ingredients />
        </div>
    )
}