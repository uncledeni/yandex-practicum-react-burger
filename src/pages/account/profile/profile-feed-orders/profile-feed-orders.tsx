import React, { useEffect } from 'react';

import Styles from "./css/style.module.css";
import { ProfileNavbar } from '../../components/profile-navbar/profile-navbar';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedSelector } from '../../../../shared/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { IIngredient, WebSocketStatus } from '../../../../shared/types/types';
import { connect, disconnect } from '../../../../shared/services/actions/ws-profile-feed-action-types';
import { checkOnUndefined } from '../../../../shared/utils/checks';
import { GET_FEED_ORDER_DETAILS } from '../../../../shared/services/actions/feed-order-details';
import { Link, useLocation } from 'react-router-dom';

interface IFeedElem {
    order: number,
    ingredientsList: IIngredient[]
}

const FeedElem = ({ order, ingredientsList }: IFeedElem) => {
    const dispatch = useDispatch();

    const getIngredientDetails = (order) => {
        dispatch({ type: GET_FEED_ORDER_DETAILS, details: order })
    }

    const openModal = () => {
        getIngredientDetails(order);
    }

    const totalCalc = () => {
        const total = order.ingredients.reduce((sum, current) => sum + (ingredientsList.find(i => {return i._id === current; })).price , 0);
        return total;
    }

    return (
        <div onClick={() => openModal()} className={`${Styles.feedElem} mb-4 mr-2`}>
            <div className={`${Styles.feedHeader} pt-6 pr-6 pl-6`}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
            </div>
            <p className="text text_type_main-medium pt-6 pr-6 pl-6">{(order.name.length >= 53) ? `${order.name.slice(0, 53)}...` : order.name}</p>
            <p className="text text_type_main-default pt-2 pr-6 pl-6">{order.status}</p>

            <div className={`${Styles.feedContent} pt-6 pb-6 pr-6 pl-6`}>
                <div className={Styles.ingredientsContent}>
                    {order.ingredients.map((ingredient, index) => {
                        const tempSrc = ingredientsList.find(i => {
                            return i._id === ingredient;
                        })
                        return (
                            <span key={index} className={(index === 0) ? Styles.firstIngredientWrapper : Styles.ingredientWrapper}>
                                <img className={Styles.ingredient} src={tempSrc.image_mobile} alt={`${tempSrc.name}`} />
                            </span>
                        )
                    })}
                </div>
                <span className={`${Styles.price} pl-6`}>
                    <p className="text text_type_digits-default mr-2">{totalCalc()}</p>
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    )
}

const Feed = () => {
    const { status, data } = useTypedSelector(state => state.profileFeed);
    const { ingredients, isLoading } = useTypedSelector(store => store.ingredients);
    const orders = data.orders;
    const location = useLocation();

    return (
        <>
            {checkOnUndefined(orders) && <div className={`${Styles.feedList}`} >
                {orders.map(order => (
                    <Link className={Styles.link} key={order.number} to={`/profile/orders/${order.number}`} state={{ backgroundLocation: location }} >
                        <FeedElem order={order} ingredientsList={ingredients} />
                    </Link>
                ))}
            </div>}
        </>
    )
}

export const ProfileFeedOrders = () => {
    const token = localStorage.getItem("accessToken");
    const wsUrl = 'wss://norma.nomoreparties.space/orders';

    const { status, data } = useTypedSelector(state => state.profileFeed);
    const dispatch = useDispatch();
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
                <div className={Styles.mainContainer}>
                    <ProfileNavbar />
                    <Feed />
                </div>
            </div>
        </main>
    )
}