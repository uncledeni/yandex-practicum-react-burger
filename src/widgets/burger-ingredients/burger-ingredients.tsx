import React, { FC, useRef } from "react";
import { Link, useLocation, Location } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { GET_INGREDIENT_DETAILS } from "../../shared/services/actions/ingredient-details";

import BurgerIngredientsStyles from "./css/style.module.css";
import { useTypedSelector } from "../../shared/hooks/useTypedSelector";
import { Loader } from "../../shared/components/loader/loader";
import { checkOnUndefined } from "../../shared/utils/checks";
import { IIngredient, TODO_ANY } from "../../shared/types/types";

enum IngredientTypes {
    bun = 'bun',
    main = 'main',
    sauce = 'sauce'
}

interface IIngredientsTabsFC {
    current: string
}

const IngredientsTabs: FC<IIngredientsTabsFC> = ({ current }) => {
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

interface IIngredientsFC {
    setCurrentTab: (arg0: IngredientTypes) => void
}

const Ingredients: FC<IIngredientsFC> = ({ setCurrentTab }) => {
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

interface IIngredientsStackFC {
    location: Location<TODO_ANY>;
    scrollRef: React.RefObject<HTMLParagraphElement>;
    title: string;
    type: IngredientTypes;
}

const IngredientsStack: FC<IIngredientsStackFC> = ( {scrollRef, title, type, location} ) => {
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
                        <Link key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }} >
                            <IngredientElem ingredient={ingredient} />
                        </Link>
                    ))}
                </div>
            </Loader>}
        </div>
    )
}

interface IIngredientElemFC {
    ingredient: IIngredient
}

const IngredientElem: FC<IIngredientElemFC> = ({ ingredient }) => {
    const dispatch = useDispatch();
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

export const BurgerIngredients: FC = () => {
    const [current, setCurrent] = React.useState<string>(IngredientTypes.bun);

    return (
        <div className={BurgerIngredientsStyles.burgerIngredientsWrapper}>
            <p className={`${BurgerIngredientsStyles.burgerIngredientsWrapperTitle} text text_type_main-large`}>Соберите бургер</p>
            <IngredientsTabs current={current} />
            <Ingredients setCurrentTab={setCurrent} />
        </div>
    )
}