import React, { useEffect, useRef } from "react";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsStyles from "./css/style.module.css";
import { Modal } from "../../shared/components/modal/modal";
import { IngredientDetails } from "./components/ingredient-details/ingredient-details";
import { ingredientElemType, ingredientsStackType } from "../../shared/utils/types";
import { useModal } from "../../shared/hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredients } from "../../shared/services/actions/burger-ingredients";
import { CLEAR_INGREDIENT_DETAILS, GET_INGREDIENT_DETAILS } from "../../shared/services/actions/ingredient-details";
import { useDrag } from "react-dnd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BUN_TYPE = "bun";
const MAIN_TYPE = "main";
const SAUCE_TYPE = "sauce";

const IngredientsTabs = ({ current }) => {
    return (
        <div className={BurgerIngredientsStyles.ingredientsTabsContainer}>
            <Tab value="burger" active={current === 'burger'} >
                Булки
            </Tab>
            <Tab value="filling" active={current === 'filling'} >
                Начинки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} >
                Соусы
            </Tab>
        </div>
    )
}

const Ingredients = ({ setCurrentTab }) => {
    const { isModalOpen, openModal, closeModal } = useModal();
    let navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBurgerIngredients());
    }, [dispatch]);

    const clearIngredientDetails = () => {
        dispatch({ type: CLEAR_INGREDIENT_DETAILS })
    }

    const closeAndClear = () => {
        closeModal();
        navigate(-1);
        clearIngredientDetails();
    }

    const bunRef = useRef(null)
    const sauceRef = useRef(null)
    const mainRef = useRef(null)

    const onEditClick = () => {
        if (bunRef.current.getBoundingClientRect().top > 0) {
            setCurrentTab('burger');
        } else if (mainRef.current.getBoundingClientRect().top > 0) {
            setCurrentTab('filling');
        } else if (sauceRef.current.getBoundingClientRect().top > 0) {
            setCurrentTab('sauce');
        } else {
            setCurrentTab('sauce');
        }
    };

    return (
        <div onScroll={() => onEditClick()} className={BurgerIngredientsStyles.ingredientsListWrapper}>
            <div className={BurgerIngredientsStyles.ingredientsList}>
                <IngredientsStack scrollRef={bunRef} setOpenModal={openModal} title="Булки" type={BUN_TYPE} />
                <IngredientsStack scrollRef={mainRef} setOpenModal={openModal} title="Начинка" type={MAIN_TYPE} />
                <IngredientsStack scrollRef={sauceRef} setOpenModal={openModal} title="Соусы" type={SAUCE_TYPE} />
                {isModalOpen && <Modal handlerOpen={closeAndClear}>
                    <IngredientDetails />
                </Modal>}
            </div>
        </div>
    )
}

const IngredientsStack = (props) => {
    const ingredientsData = useSelector(store => store.ingredients.ingredients);
    let location = useLocation();

    return (
        (ingredientsData !== undefined) ?
            <div className={BurgerIngredientsStyles.ingredientsStackWrapper}>
                <p ref={props.scrollRef} className={`${BurgerIngredientsStyles.ingredientsStackTitle} text text_type_main-medium`}>{props.title}</p>
                <div className={BurgerIngredientsStyles.ingredientsStackContent}>
                    {ingredientsData.map((ingredient) => (
                        (ingredient.type === props.type) &&
                        <Link key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }} >
                            <IngredientElem setOpenModal={props.setOpenModal} ingredient={ingredient} />
                        </Link>
                    ))}
                </div>
            </div>
            :
            <></>
    )
}

IngredientsStack.propTypes = ingredientsStackType;

const IngredientElem = ({ setOpenModal, ingredient }) => {
    const dispatch = useDispatch();
    const getIngredientDetails = (ingredient) => {
        dispatch({ type: GET_INGREDIENT_DETAILS, details: ingredient })
    }

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: { ingredient }
    });

    const openModal = () => {
        setOpenModal();
        getIngredientDetails(ingredient);
    }

    return (
        <div className={BurgerIngredientsStyles.ingredientElemWrapper}>
            {(ingredient.__v !== 0) ? <Counter count={ingredient.__v} size="default" extraClass={`${BurgerIngredientsStyles.counterElem} m-1`} /> : <></>}
            <div onClick={() => openModal()} className={BurgerIngredientsStyles.ingredientElemContent} ref={dragRef}>
                <img className={BurgerIngredientsStyles.ingredientElemIllustration} src={ingredient.image} alt={`${ingredient.name}`} />
                <div className={BurgerIngredientsStyles.ingredientElemPrice}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon />
                </div>
                <h3 className={`${BurgerIngredientsStyles.ingredientElemName} text text_type_main-default`}>{ingredient.name}</h3>
            </div>
        </div>
    )
}

IngredientElem.propTypes = ingredientElemType;

export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('burger');

    return (
        <div className={BurgerIngredientsStyles.burgerIngredientsWrapper}>
            <p className={`${BurgerIngredientsStyles.burgerIngredientsWrapperTitle} text text_type_main-large`}>Соберите бургер</p>
            <IngredientsTabs current={current} />
            <Ingredients setCurrentTab={setCurrent} />
        </div>
    )
}