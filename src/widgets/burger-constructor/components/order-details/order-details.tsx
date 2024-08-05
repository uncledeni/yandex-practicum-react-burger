import React, { FC } from "react";
import OrderDetailsStyles from "./style.module.css";
import done from "../../../../shared/images/done.svg"
import { checkOnUndefined } from "../../../../shared/utils/checks";
import { useTypedSelector } from "../../../../shared/hooks/useTypedSelector";
import { IOrderData } from "../../../../shared/types/types";
import { Loader } from "../../../../shared/components/loader/loader";

export const OrderDetails: FC = () => {
    const { order, isLoading } = useTypedSelector(store => store.orderDetails);

    const orderNumber = (data: IOrderData): number | undefined => {
        if (checkOnUndefined(data.order)) {
            return data.order.order.number;
        }
    }

    return (
        <div className={`${OrderDetailsStyles.card}`}>
            <div className={`${OrderDetailsStyles.content}`}>
                <Loader
                    isLoading={isLoading}
                    loadingText="пожалуйста подождите, идёт обработка заказа..."
                >
                    <>
                        <p className={`text text_type_digits-large pt-30`}>{orderNumber(order)}</p>
                        <p className={`text text_type_main-medium pt-8`}>идентификатор заказа</p>
                        <div className={`${OrderDetailsStyles.done} pt-15`}>
                            <img src={done} alt="done" />
                        </div>
                        <p className={`text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
                        <p className={`text text_type_main-default text_color_inactive  pt-2`}>Дождитесь готовности на орбитальной станции</p>
                    </>
                </Loader>
            </div>
        </div>
    )
}