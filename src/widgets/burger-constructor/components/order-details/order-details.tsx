import React, { FC } from "react";
import OrderDetailsStyles from "./style.module.css";
import done from "../../../../shared/images/done.svg"
import { checkOnUndefined } from "../../../../shared/utils/checks";
import { useTypedSelector } from "../../../../shared/hooks/useTypedSelector";
import { IIngredient } from "../../../../shared/types/types";

interface IOrderData {
    type: string;
    order: {
        name: string;
        success: boolean;
        order: {
            createdAt: string;
            ingredients: IIngredient[];
            name: string;
            number: number
            owner: { name: string, email: string, createdAt: string, updatedAt: string }
            price: number
            status: string
            updatedAt: string
            _id: string
        }
    }
}

export const OrderDetails: FC = () => {
    const orderData = useTypedSelector(store => store.orderDetails.order);

    const orderNumber = (data: IOrderData): number | undefined => {
        if (checkOnUndefined(data.order)) {
            return data.order.order.number;
        }
    }

    return (
        <div className={`${OrderDetailsStyles.card}`}>
            <div className={`${OrderDetailsStyles.content}`}>
                <p className={`text text_type_digits-large pt-30`}>{orderNumber(orderData)}</p>
                <p className={`text text_type_main-medium pt-8`}>идентификатор заказа</p>
                <div className={`${OrderDetailsStyles.done} pt-15`}>
                    <img src={done} alt="done" />
                </div>
                <p className={`text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
                <p className={`text text_type_main-default text_color_inactive  pt-2`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </div>
    )
}