import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useTypedSelector, useTypedDispatch } from "../../../shared/hooks";
import { checkOnUndefined, orderIngredientsSort, feedOrderCalcTotal } from "../../../shared/utils";
import { IFeedOrder, IIngredient, WebSocketStatus } from "../../../shared/types/types";
import { connect, disconnect } from '../../../shared/services/actions/ws-feed-action-types';
import { GET_FEED_ORDER_DETAILS } from "../../../shared/services/actions/feed-order-details";

import Styles from './css/style.module.css';

interface IFeedElem {
    order: IFeedOrder,
    ingredientsList: IIngredient[]
}

const FeedElem = ({ order, ingredientsList }: IFeedElem) => {
    const dispatch = useTypedDispatch();

    const getIngredientDetails = (order: IFeedOrder) => {
        dispatch({ type: GET_FEED_ORDER_DETAILS, details: order })
    }

    const openModal = () => {
        getIngredientDetails(order);
    }

    const totalCalc = feedOrderCalcTotal(order.ingredients, ingredientsList);
    const sortedObjArr = orderIngredientsSort(order.ingredients);

    return (
        <div onClick={() => openModal()} className={`${Styles.feedElem} mb-4`}>
            <div className={`${Styles.feedHeader} pt-6 pr-6 pl-6`}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
            </div>
            <p className="text text_type_main-medium pt-6 pr-6 pl-6">{(order.name.length >= 33) ? `${order.name.slice(0, 33)}...` : order.name}</p>
            <div className={`${Styles.feedContent} pt-6 pb-6 pr-6 pl-6`}>
                <div className={Styles.ingredientsContent}>
                    {sortedObjArr.map((ingredientObj, index) => {
                        const tempSrc = ingredientsList.find(i => {
                            return i._id === ingredientObj.value;
                        })
                        return (
                            <span key={index} className={(index === 0) ? Styles.firstIngredientWrapper : Styles.ingredientWrapper}>
                                {(tempSrc !== undefined) && <img className={Styles.ingredient} src={tempSrc.image_mobile} alt={`${tempSrc.name}`} />}
                                {(ingredientObj.count > 1) && <span className={Styles.ingredientWrapperFade} />}
                                {(ingredientObj.count > 1) && <p className={`${Styles.ingredientCount} text text_type_digits-default`}>{`+${ingredientObj.count}`}</p>}
                            </span>
                        )
                    })}
                </div>
                <span className={`${Styles.price} pl-6`}>
                    <p className="text text_type_digits-default mr-2">{totalCalc}</p>
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    )
}

const Feed = () => {
    const { status, data } = useTypedSelector(state => state.feed);
    const { ingredients, isLoading } = useTypedSelector(store => store.ingredients);
    const orders = data.orders;
    const location = useLocation();

    return (
        <>
            {checkOnUndefined(orders) && <div className={`${Styles.feedList} mr-15`} >
                {orders.map(order => (
                    <Link className={Styles.link} key={order.number} to={`/feed/${order.number}`} state={{ backgroundLocation: location }} >
                        <FeedElem order={order} ingredientsList={ingredients} />
                    </Link>
                ))}
            </div >}
        </>
    )
}

const OrderDesk = () => {
    const { status, data } = useTypedSelector(state => state.feed);
    const orders = data.orders;

    const doneOrders = (checkOnUndefined(orders)) ? orders?.filter(order => order.status === 'done') : [];
    const undoneOrders = (checkOnUndefined(orders)) ? orders?.filter(order => order.status !== 'done') : [];

    return (
        <div className={Styles.orderDesk} >
            {checkOnUndefined(orders) && <div className={Styles.orderDeskCollumnsContainer} >
                <div className={`${Styles.orderDeskCollumn} mr-9`} >
                    <p className="text text_type_main-medium mb-6">Готовы:</p>
                    <div className={Styles.orderDeskOrders}>
                        {doneOrders.map(order => (
                            <p key={order.number} className={`${Styles.orderDeskCollumnDone} text text_type_digits-default mb-2`}>{order.number}</p>
                        ))}
                    </div>
                </div>
                <div className={`${Styles.orderDeskCollumn}`}>
                    <p className="text text_type_main-medium mb-6">В работе:</p>
                    <div className={Styles.orderDeskOrders} >
                        {undoneOrders.map(order => (
                            <p key={order.number} className="text text_type_digits-default mb-2">{order.number}</p>
                        ))}
                    </div>
                </div>
            </div>}
            <div className="mt-15" >
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={`${Styles.orderDeskTotal} text text_type_digits-large`}>{data.total}</p>
            </div>
            <div className="mt-15">
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={`${Styles.orderDeskToday} text text_type_digits-large`}>{data.totalToday}</p>
            </div>
        </div>
    )
}

export const FeedOrders = () => {
    const token = localStorage.getItem("accessToken");
    const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

    const { status, data } = useTypedSelector(state => state.feed);
    const dispatch = useTypedDispatch();
    const isDisconnected = status !== WebSocketStatus.OFFLINE;

    const connectFeedData = () => dispatch(connect(`${wsUrl}?token=${token}`));
    const disconnectFeedData = () => dispatch(disconnect());

    useEffect(() => {
        connectFeedData();
        return () => {
            disconnectFeedData();
        }
    }, [])

    return (
        <main className={Styles.pageWrapper}>
            <div className={Styles.mainWrapper}>
                <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
                <div className={Styles.content} >
                    <Feed />
                    <OrderDesk />
                </div>
            </div>
        </main>
    )
}