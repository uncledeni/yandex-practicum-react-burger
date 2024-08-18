import React from 'react';

import Styles from "./css/style.module.css";
import { ProfileNavbar } from '../../components/profile-navbar/profile-navbar';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

interface IFeedElem {
    id: number
}

const FeedElem = ({ id }: IFeedElem) => {
    return (
        <div className={`${Styles.feedElem} mb-4 mr-2`}>
            <div className={`${Styles.feedHeader} pt-6 pr-6 pl-6`}>
                <p className="text text_type_digits-default">#{id}</p>
                <p className="text text_type_main-default text_color_inactive">Today, 22:22</p>
            </div>
            <p className="text text_type_main-medium pt-6 pr-6 pl-6">Death Star Starship Main бургер</p>
            <p className="text text_type_main-default pt-2 pr-6 pl-6">Готовится</p>
            <div className={`${Styles.feedContent} pt-6 pb-6 pr-6 pl-6`}>
                <div className={Styles.icon}>
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
        <div className={`${Styles.feedList}`} >
            {data.map(elem => (
                <FeedElem key={elem} id={elem} />
            ))}
        </div>
    )
}

export const ProfileOrders = () => {
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