import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { GET_INGREDIENT_DETAILS } from "../../shared/services/actions/ingredient-details";

import BurgerIngredientsStyles from "./css/style.module.css";

enum IngredientTypes {
    bun = 'bun',
    main = 'main',
    sauce = 'sauce'
}

const IngredientsTabs = ({ current }) => {
    return (
        <div className={BurgerIngredientsStyles.ingredientsTabsContainer}>
            <Tab value={IngredientTypes.bun} active={current === IngredientTypes.bun} >
                Булки
            </Tab>
            <Tab value={IngredientTypes.main} active={current === IngredientTypes.main} >
                Начинки
            </Tab>
            <Tab value={IngredientTypes.sauce} active={current === IngredientTypes.sauce} >
                Соусы
            </Tab>
        </div>
    )
}

const Ingredients = ({ setCurrentTab }) => {
    const location = useLocation();

    const bunRef = useRef<HTMLParagraphElement>(null);
    const sauceRef = useRef<HTMLParagraphElement>(null);
    const mainRef = useRef<HTMLParagraphElement>(null);

    const onEditClick = () => {
        if (bunRef.current.getBoundingClientRect().top > 0) {
            setCurrentTab(IngredientTypes.bun);
        } else if (mainRef.current.getBoundingClientRect().top > 0) {
            setCurrentTab(IngredientTypes.main);
        } else if (sauceRef.current.getBoundingClientRect().top > 0) {
            setCurrentTab(IngredientTypes.sauce);
        } else {
            setCurrentTab(IngredientTypes.sauce);
        }
    };

    return (
        <div onScroll={() => onEditClick()} className={BurgerIngredientsStyles.ingredientsListWrapper}>
            <div className={BurgerIngredientsStyles.ingredientsList}>
                <IngredientsStack location={location} scrollRef={bunRef} title="Булки" type={IngredientTypes.bun} />
                <IngredientsStack location={location} scrollRef={mainRef} title="Начинка" type={IngredientTypes.main} />
                <IngredientsStack location={location} scrollRef={sauceRef} title="Соусы" type={IngredientTypes.sauce} />
            </div>
        </div>
    )
}

const IngredientsStack = (props) => {
    const ingredientsData = useSelector(store => store.ingredients.ingredients);

    return (
        (ingredientsData !== undefined) ?
            <div className={BurgerIngredientsStyles.ingredientsStackWrapper}>
                <p ref={props.scrollRef} className={`${BurgerIngredientsStyles.ingredientsStackTitle} text text_type_main-medium`}>{props.title}</p>
                <div className={BurgerIngredientsStyles.ingredientsStackContent}>
                    {ingredientsData.map((ingredient) => (
                        (ingredient.type === props.type) &&
                        <Link key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: props.location }} >
                            <IngredientElem ingredient={ingredient} />
                        </Link>
                    ))}
                </div>
            </div>
            :
            <></>
    )
}

// IngredientsStack.propTypes = ingredientsStackType;

const IngredientElem = ({ ingredient }) => {
    const dispatch = useDispatch();
    const getIngredientDetails = (ingredient) => {
        dispatch({ type: GET_INGREDIENT_DETAILS, details: ingredient })
    }

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: { ingredient }
    });

    const openModal = () => {
        getIngredientDetails(ingredient);
    }

    return (
        <div className={BurgerIngredientsStyles.ingredientElemWrapper}>
            {(ingredient.__v !== 0) ? <Counter count={ingredient.__v} size="default" extraClass={`${BurgerIngredientsStyles.counterElem} m-1`} /> : <></>}
            <div onClick={() => openModal()} className={BurgerIngredientsStyles.ingredientElemContent} ref={dragRef}>
                <img className={BurgerIngredientsStyles.ingredientElemIllustration} src={ingredient.image} alt={`${ingredient.name}`} />
                <div className={BurgerIngredientsStyles.ingredientElemPrice}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className={`${BurgerIngredientsStyles.ingredientElemName} text text_type_main-default`}>{ingredient.name}</h3>
            </div>
        </div>
    )
}

// IngredientElem.propTypes = ingredientElemType;

export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState<string>(IngredientTypes.bun);

    return (
        <div className={BurgerIngredientsStyles.burgerIngredientsWrapper}>
            <p className={`${BurgerIngredientsStyles.burgerIngredientsWrapperTitle} text text_type_main-large`}>Соберите бургер</p>
            <IngredientsTabs current={current} />
            <Ingredients setCurrentTab={setCurrent} />
        </div>
    )
}