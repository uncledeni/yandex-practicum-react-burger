import React from "react";
import Styles from './css/style.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

interface IFeedElem {
    id: number
}

const FeedElem = ({ id }: IFeedElem) => {
    return (
        <div className={`${Styles.feedElem} mb-4`}>
            <div className={`${Styles.feedHeader} pt-6 pr-6 pl-6`}>
                <p className="text text_type_digits-default">#{id}</p>
                <p className="text text_type_main-default text_color_inactive">Today, 22:22</p>
            </div>
            <p className="text text_type_main-medium pt-6 pr-6 pl-6">Death Star Starship Main бургер</p>
            <div className={`${Styles.feedContent} pt-6 pb-6 pr-6 pl-6`}>
                <div>
                    <h1>HI</h1>
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
    return (
        <div className={`${Styles.feedList} mr-15`} >
            {data.map(elem => (
                <FeedElem key={elem} id={elem} />
            ))}
        </div>
    )
}

const OrderDesk = () => {
    return (
        <div className={Styles.orderDesk} >
            <div className={Styles.orderDeskCollumnsContainer} >
                <div className={`${Styles.orderDeskCollumn} mr-9`} >
                    <p className="text text_type_main-medium mb-6">Готовы:</p>
                    <div>
                        <p className={`${Styles.orderDeskCollumnDone} text text_type_digits-default mb-2`}>030303</p>
                        <p className={`${Styles.orderDeskCollumnDone} text text_type_digits-default mb-2`}>030303</p>
                        <p className={`${Styles.orderDeskCollumnDone} text text_type_digits-default mb-2`}>030303</p>
                        <p className={`${Styles.orderDeskCollumnDone} text text_type_digits-default mb-2`}>030303</p>
                        <p className={`${Styles.orderDeskCollumnDone} text text_type_digits-default mb-2`}>030303</p>
                    </div>
                </div>
                <div className={`${Styles.orderDeskCollumn}`}>
                    <p className="text text_type_main-medium mb-6">В работе:</p>
                    <div>
                        <p className="text text_type_digits-default mb-2">030303</p>
                        <p className="text text_type_digits-default mb-2">030303</p>
                        <p className="text text_type_digits-default mb-2">030303</p>
                        <p className="text text_type_digits-default mb-2">030303</p>
                        <p className="text text_type_digits-default mb-2">030303</p>
                    </div>
                </div>
            </div>
            <div className="mt-15" >
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={`${Styles.orderDeskTotal} text text_type_digits-large`}>111111</p>
            </div>
            <div className="mt-15">
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={`${Styles.orderDeskToday} text text_type_digits-large`}>111</p>
            </div>
        </div>
    )
}

export const OrderFeed = () => {
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