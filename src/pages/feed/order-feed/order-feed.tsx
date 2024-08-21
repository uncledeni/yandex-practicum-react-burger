import React, { useEffect } from "react";
import Styles from './css/style.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../../../shared/hooks/useTypedSelector";
import { IIngredient, WebSocketStatus } from "../../../shared/types/types";

import { connect, disconnect } from '../../../shared/services/actions/wsActionTypes';
import { checkOnUndefined } from "../../../shared/utils/checks";

// const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
//     10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
//     20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

interface IFeedElem {
    order: number,
    ingredientsList: IIngredient[]
}

const FeedElem = ({ order, ingredientsList }: IFeedElem) => {
    return (
        <div className={`${Styles.feedElem} mb-4`}>
            <div className={`${Styles.feedHeader} pt-6 pr-6 pl-6`}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
            </div>
            <p className="text text_type_main-medium pt-6 pr-6 pl-6">{(order.name.length >= 33) ? `${order.name.slice(0, 33)}...` : order.name}</p>
            <div className={`${Styles.feedContent} pt-6 pb-6 pr-6 pl-6`}>
                <div className={Styles.ingredientsContent}>
                    {order.ingredients.map((ingredient, index) => {
                        const tempSrc = ingredientsList.find(i => {
                            return i._id === ingredient;
                        })
                        return (
                            <span className={(index === 0) ? Styles.firstIngredientWrapper : Styles.ingredientWrapper}>
                                <img key={index} className={Styles.ingredient} src={tempSrc.image_mobile} alt={`${tempSrc.name}`} />
                            </span>
                        )
                    })}
                </div>
                <span className={`${Styles.price} pl-6`}>
                    <p className="text text_type_digits-default mr-2">480</p>
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

    return (
        <>
            {checkOnUndefined(orders) && <div className={`${Styles.feedList} mr-15`} >
                {orders.map(order => (
                    <FeedElem key={order.number} order={order} ingredientsList={ingredients} />
                ))}
            </div>}
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
                            <p className="text text_type_digits-default mb-2">{order.number}</p>
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

const token = localStorage.getItem("accessToken");
const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

export const OrderFeed = () => {
    const { status, data } = useTypedSelector(state => state.feed);
    const dispatch = useDispatch();
    const isDisconnected = status !== WebSocketStatus.OFFLINE;

    const connectFeedData = () => dispatch(connect(`${wsUrl}?token=${token}`));
    const disconnectFeedData = () => dispatch(disconnect());

    useEffect(() => {
        connectFeedData();
        return () => {
            disconnectFeedData();
        }
    }, [dispatch])

    return (
        <main className={Styles.pageWrapper}>
            <div className={Styles.mainWrapper}>
                {/* <button onClick={() => connectFeedData()}>CONNECT</button>
                <button onClick={() => disconnectFeedData()}>DISCONNECT</button> */}
                <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
                <div className={Styles.content} >
                    <Feed />
                    <OrderDesk />
                </div>
            </div>
        </main>
    )
}