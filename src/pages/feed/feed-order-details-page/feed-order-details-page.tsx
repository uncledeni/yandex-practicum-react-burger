import React from 'react';
import { FeedOrderDetails } from '../../../widgets/feed-order-details/feed-order-details';

import Styles from "./css/style.module.css";

export const FeedOrderDetailsPage = () => {
    return (
        <main className={Styles.pageWrapper}>
            <div className={Styles.mainWrapper}>
                <FeedOrderDetails />
            </div>
        </main>
    )
}