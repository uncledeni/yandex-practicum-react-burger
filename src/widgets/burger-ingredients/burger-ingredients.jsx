import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsStyles from "./css/style.module.css"
import { GetDataService } from "../../shared/api/get-data-service";
import { Modal } from "../../shared/components/modal/modal";
import { IngredientDetails } from "./components/ingredient-details/ingredient-details";

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
    const [openModal, setOpenModal] = useState(false);
    const [ingredient, setIngredient] = useState({});

    useEffect(() => {
        const getData = async () => {
            const res = await GetDataService();
            setIngredientsData(res.data);
        }
        getData();
    }, [])

    return (
        <div className={BurgerIngredientsStyles.ingredientsList}>
            <IngredientsStack openModal={openModal} setOpenModal={setOpenModal} setIngredient={setIngredient} title="Булки" data={ingredientsData} type={BUN_TYPE} />
            <IngredientsStack openModal={openModal} setOpenModal={setOpenModal} setIngredient={setIngredient} title="Начинка" data={ingredientsData} type={MAIN_TYPE} />
            <IngredientsStack openModal={openModal} setOpenModal={setOpenModal} setIngredient={setIngredient} title="Соусы" data={ingredientsData} type={SAUCE_TYPE} />
            <Modal isOpen={openModal} handlerOpen={setOpenModal}>
                <IngredientDetails
                    image_large={ingredient.image_large}
                    name={ingredient.name}
                    calories={ingredient.calories}
                    proteins={ingredient.proteins}
                    fat={ingredient.fat}
                    carbohydrates={ingredient.carbohydrates}
                />
            </Modal>
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

IngredientsStack.propTypes = {
    data: PropTypes.array,
    openModal: PropTypes.bool,
    setIngredient: PropTypes.func,
    setOpenModal: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string
}

const IngredientElem = (props) => {
    return (
        <div className={BurgerIngredientsStyles.ingredientElemWrapper}>
            <Counter count={1} size="default" extraClass={`${BurgerIngredientsStyles.counterElem} m-1`} />
            <div onClick={() => { props.setOpenModal(!props.openModal); props.setIngredient(props.ingredient) }} className={BurgerIngredientsStyles.ingredientElemContent}>
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

IngredientElem.propTypes = {
    ingredient: PropTypes.shape({
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string,
        __v: PropTypes.number,
        _id: PropTypes.string,
    }),
    openModal: PropTypes.bool,
    setIngredient: PropTypes.func,
    setOpenModal: PropTypes.func
}

export const BurgerIngredients = () => {
    return (
        <div className={BurgerIngredientsStyles.burgerIngredientsWrapper}>
            <p className={`${BurgerIngredientsStyles.burgerIngredientsWrapperTitle} text text_type_main-large`}>Соберите бургер</p>
            <IngredientsTabs />
            <Ingredients />
        </div>
    )
}