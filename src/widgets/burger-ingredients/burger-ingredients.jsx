import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsStyles from "./css/style.module.css"
import { getDataService } from "../../shared/api/get-data-service";
import { Modal } from "../../shared/components/modal/modal";
import { IngredientDetails } from "./components/ingredient-details/ingredient-details";
import { ingredientElemType, ingredientsStackType } from "../../shared/utils/types";
import { useModal } from "../../shared/hooks/useModal";

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
    const [ingredientsData, setIngredientsData] = useState([]);
    const { isModalOpen, openModal, closeModal } = useModal();
    const [ingredient, setIngredient] = useState({});

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getDataService();
                setIngredientsData(res.data);
            } catch (err) {
                alert(err);
            }
        }
        getData();
    }, [])

    return (
        <div className={BurgerIngredientsStyles.ingredientsList}>
            <IngredientsStack setOpenModal={openModal} setIngredient={setIngredient} title="Булки" data={ingredientsData} type={BUN_TYPE} />
            <IngredientsStack setOpenModal={openModal} setIngredient={setIngredient} title="Начинка" data={ingredientsData} type={MAIN_TYPE} />
            <IngredientsStack setOpenModal={openModal} setIngredient={setIngredient} title="Соусы" data={ingredientsData} type={SAUCE_TYPE} />
            {isModalOpen && <Modal handlerOpen={closeModal}>
                <IngredientDetails ingredient={ingredient} />
            </Modal>}
        </div>
    )
}

const IngredientsStack = (props) => {
    return (
        <div className={BurgerIngredientsStyles.ingredientsStackWrapper}>
            <p className={`${BurgerIngredientsStyles.ingredientsStackTitle} text text_type_main-medium`}>{props.title}</p>
            <div className={BurgerIngredientsStyles.ingredientsStackContent}>
                {props.data.map((ingredient) => (
                    (ingredient.type === props.type) && <IngredientElem key={ingredient._id} openModal={props.openModal} setOpenModal={props.setOpenModal} setIngredient={props.setIngredient} ingredient={ingredient} />
                ))}
            </div>
        </div>
    )
}

IngredientsStack.propTypes = ingredientsStackType;

const IngredientElem = (props) => {
    return (
        <div className={BurgerIngredientsStyles.ingredientElemWrapper}>
            <Counter count={1} size="default" extraClass={`${BurgerIngredientsStyles.counterElem} m-1`} />
            <div onClick={() => { props.setOpenModal(); props.setIngredient(props.ingredient) }} className={BurgerIngredientsStyles.ingredientElemContent}>
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

IngredientElem.propTypes = ingredientElemType;

export const BurgerIngredients = () => {
    return (
        <div className={BurgerIngredientsStyles.burgerIngredientsWrapper}>
            <p className={`${BurgerIngredientsStyles.burgerIngredientsWrapperTitle} text text_type_main-large`}>Соберите бургер</p>
            <IngredientsTabs />
            <Ingredients />
        </div>
    )
}