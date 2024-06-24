import OrderDetailsStyles from "./style.module.css";
import done from "../../../../shared/images/done.svg"

export const OrderDetails = () => {
    return (
        <div className={`${OrderDetailsStyles.card}`}>
            <div className={`${OrderDetailsStyles.content}`}>
                <p className={`text text_type_digits-large pt-30`}>034536</p>
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