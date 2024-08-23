import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getFeedOrderDetails } from "../../shared/services/actions/feed-order-details";
import { useTypedSelector } from "../../shared/hooks/useTypedSelector";
import { TODO_ANY } from "../../shared/types/types";

import Styles from "./style.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { orderIngredientsSort } from "../../shared/utils/sorting";
import { feedOrderCalcTotal } from "../../shared/utils/calculating";

export const FeedOrderDetails = () => {
    const { ingredients } = useTypedSelector(store => store.ingredients);
    const { details } = useTypedSelector(store => store.feedOrderDetails);
    const { number } = useParams();
    const dispatch: TODO_ANY = useDispatch();

    const getIngredientDetails = useCallback((_id) => {
        dispatch(getFeedOrderDetails(_id))
    }, [dispatch])

    useEffect(() => {
        if (details._id === '') {
            getIngredientDetails(number)
        }
    }, [dispatch, ingredients, number, getIngredientDetails])

    const totalCalc = feedOrderCalcTotal(details.ingredients, ingredients);
    const sortedObjArr = orderIngredientsSort(details.ingredients);

    return (
        <div className={`${Styles.card} p-5`}>
            <p className={`${Styles.number} text text_type_digits-default mb-10`}>{`#${details.number}`}</p>
            <p className={`${Styles.name} text text_type_main-medium mb-3`}>{details.name}</p>
            <p className={`${Styles.status} text text_type_main-default mb-15`}>{details.status}</p>
            <p className={`text text_type_main-medium mb-6`}>Состав:</p>
            <div className={`${Styles.structure} mb-10`}>
                {sortedObjArr.map((ingredientObj, index) => {
                    const tempSrc = ingredients.find(i => {
                        return i._id === ingredientObj.value;
                    })
                    return (
                        <div className={`${Styles.ingredient} mb-4`} key={index}>
                            <span key={index} className={(index === 0) ? Styles.firstIngredientWrapper : Styles.ingredientWrapper}>
                                <img className={Styles.ingredientImage} src={tempSrc.image_mobile} alt={`${tempSrc.name}`} />
                            </span>
                            <p className={`${Styles.ingredientName} text text_type_main-default ml-4 mr-4`}>{tempSrc.name}</p>
                            <span className={`${Styles.price} pl-6`}>
                                <p className="text text_type_digits-default mr-2">{`${ingredientObj.count} x ${tempSrc.price}`}</p>
                                <CurrencyIcon type="primary" />
                            </span>
                        </div>
                    )
                })}
            </div>
            <div className={Styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">{details.createdAt}</p>
                <span className={`${Styles.totalPrice} pl-6`}>
                    <p className="text text_type_digits-default mr-2">
                        {totalCalc}
                    </p>
                    <CurrencyIcon type="primary" />
                </span>

            </div>
        </div>
    )
}