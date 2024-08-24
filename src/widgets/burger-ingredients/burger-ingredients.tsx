import React, { useRef } from "react";
import { Link, useLocation, Location } from "react-router-dom";
import { useDrag } from "react-dnd";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { checkOnUndefined } from "../../shared/utils/checks";
import { IIngredient, TODO_ANY } from "../../shared/types/types";
import { GET_INGREDIENT_DETAILS } from "../../shared/services/actions/ingredient-details";
import { useTypedSelector, useTypedDispatch } from "../../shared/hooks";
import { Loader } from "../../shared/components/loader/loader";

import BurgerIngredientsStyles from "./css/style.module.css";

enum IngredientTypes {
    bun = 'bun',
    main = 'main',
    sauce = 'sauce'
}

interface IIngredientsTabsProps {
    current: string
}

const IngredientsTabs = ({ current }: IIngredientsTabsProps) => {
    return (
        <div className={BurgerIngredientsStyles.ingredientsTabsContainer}>
            <Tab onClick={() => { return }} value={IngredientTypes.bun} active={current === IngredientTypes.bun} >
                Булки
            </Tab>
            <Tab onClick={() => { return }} value={IngredientTypes.main} active={current === IngredientTypes.main} >
                Начинки
            </Tab>
            <Tab onClick={() => { return }} value={IngredientTypes.sauce} active={current === IngredientTypes.sauce} >
                Соусы
            </Tab>
        </div>
    )
}

interface IIngredientsProps {
    setCurrentTab: (arg0: IngredientTypes) => void
}

const Ingredients = ({ setCurrentTab }: IIngredientsProps) => {
    const location = useLocation();

    const bunRef = useRef<HTMLParagraphElement>(null);
    const sauceRef = useRef<HTMLParagraphElement>(null);
    const mainRef = useRef<HTMLParagraphElement>(null);

    const onEditClick = () => {
        if ((bunRef.current !== null) && (mainRef.current !== null) && (sauceRef.current !== null)) {
            if (bunRef.current.getBoundingClientRect().top > 0) {
                setCurrentTab(IngredientTypes.bun);
            } else if (mainRef.current.getBoundingClientRect().top > 0) {
                setCurrentTab(IngredientTypes.main);
            } else if (sauceRef.current.getBoundingClientRect().top > 0) {
                setCurrentTab(IngredientTypes.sauce);
            } else {
                setCurrentTab(IngredientTypes.sauce);
            }
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

interface IIngredientsStackProps {
    location: Location<TODO_ANY>;
    scrollRef: React.RefObject<HTMLParagraphElement>;
    title: string;
    type: IngredientTypes;
}

const IngredientsStack = ({ scrollRef, title, type, location }: IIngredientsStackProps) => {
    const { ingredients, isLoading } = useTypedSelector(store => store.ingredients);

    return (
        <div className={BurgerIngredientsStyles.ingredientsStackWrapper}>
            <p ref={scrollRef} className={`${BurgerIngredientsStyles.ingredientsStackTitle} text text_type_main-medium`}>{title}</p>
            {checkOnUndefined(ingredients) && <Loader
                isLoading={isLoading}
                loadingText="пожалуйста подождите, данные загружаются"
            >
                <div className={BurgerIngredientsStyles.ingredientsStackContent}>
                    {ingredients.map((ingredient: IIngredient) => (
                        (ingredient.type === type) &&
                        <Link className={BurgerIngredientsStyles.link} key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }} >
                            <IngredientElem ingredient={ingredient} />
                        </Link>
                    ))}
                </div>
            </Loader>}
        </div>
    )
}

interface IIngredientElemProps {
    ingredient: IIngredient
}

const IngredientElem = ({ ingredient }: IIngredientElemProps) => {
    const dispatch = useTypedDispatch();
    const getIngredientDetails = (ingredient: IIngredient) => {
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