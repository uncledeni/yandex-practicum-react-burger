import { useSelector } from "react-redux";
import OrderDetailsStyles from "./style.module.css";
import done from "../../../../shared/images/done.svg"
import { checkOnUndefined } from "../../../../shared/utils/checks";

export const OrderDetails = () => {
    const orderData = useSelector(store => store.orderDetails.order);

    const orderNumber = (data) => {
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