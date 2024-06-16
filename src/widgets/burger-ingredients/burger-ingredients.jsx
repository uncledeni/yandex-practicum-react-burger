import React from "react";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import "./css/style.css"
import { INGREDIENTS_DATA as TEMP_DATA  } from "../../shared/utils/data";

const BUN_TYPE = "bun";
const MAIN_TYPE = "main";
const SAUCE_TYPE = "sauce";

const IngredientsTabs = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className="ingredients-tabs-container">
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
        <div className="ingredients-list">
            <IngredientsStack title="Булки" data={TEMP_DATA} type={BUN_TYPE} />
            <IngredientsStack title="Начинка" data={TEMP_DATA} type={MAIN_TYPE} />
            <IngredientsStack title="Соусы" data={TEMP_DATA} type={SAUCE_TYPE} />
        </div>
    )
}

const IngredientsStack = (props) => {
    return (
        <div className="ingredients-stack-wrapper">
            <p className="ingredients-stack-title text text_type_main-medium">{props.title}</p>
            <div className="ingredients-stack-content">
                {props.data.map((ingredient) => (
                    (ingredient.type === props.type) && <IngredientElem ingredient={ingredient} />
                ))}
            </div>
        </div>
    )
}

const IngredientElem = (props) => {
    return (
        <div className="ingredient-elem-wrapper">
            <Counter className="counter" count={1} size="default" extraClass="m-1" />
            <div className="ingredient-elem-content">
                <img className="ingredient-elem-illustration" src={props.ingredient.image} alt="" />
                <div className="ingredient-elem-price">
                    <p className="text text_type_digits-default">{props.ingredient.price}</p>
                    <CurrencyIcon />
                </div>
                <h3 className="ingredient-elem-name text text_type_main-default">{props.ingredient.name}</h3>
            </div>
        </div>
    )
}

export const BurgerIngredients = (data) => {
    return (
        <div className="burger-ingredients-wrapper">
            <p className="burger-ingredients-wrapper-title text text_type_main-large">Соберите бургер</p>
            <IngredientsTabs />
            <Ingredients />
        </div>
    )
}