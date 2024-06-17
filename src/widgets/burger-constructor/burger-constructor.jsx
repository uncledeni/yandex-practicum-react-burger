import React from "react";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorStyles from "./css/style.module.css"
import { INGREDIENTS_DATA as TEMP_DATA } from "../../shared/utils/data";

const Info = () => {
    return (
        <div className={BurgerConstructorStyles.burgerConstructorInfoWrapper}>
            <div className={BurgerConstructorStyles.burgerConstructorInfoPrice}>
                <p className="text text_type_digits-medium">600</p>
                <CurrencyIcon />
            </div>
            <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
        </div>
    )
}

const OffStackListElement = (props) => {
    return (
        <div className={BurgerConstructorStyles.offStackListElement}>
            <ConstructorElement
                type={(props.isTop) ? 'top' : 'bottom'}
                isLocked={true}
                text={`${props.name} ${(props.isTop) ? 'верх' : 'низ'}`}
                price={props.price}
                thumbnail={props.image}
            />
        </div>
    )
}

const StackListElement = (props) => {
    return (
        <div className={BurgerConstructorStyles.stackListElement}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={props.name}
                price={props.price}
                thumbnail={props.image}
            />
        </div>
    )
}

const StackList = () => {
    return (
        <div className={BurgerConstructorStyles.stackListWrapper}>
            <StackListElement name={TEMP_DATA[10].name} price={TEMP_DATA[10].price} image={TEMP_DATA[10].image} />
            <StackListElement name={TEMP_DATA[1].name} price={TEMP_DATA[1].price} image={TEMP_DATA[1].image} />
            <StackListElement name={TEMP_DATA[3].name} price={TEMP_DATA[3].price} image={TEMP_DATA[3].image} />
            <StackListElement name={TEMP_DATA[2].name} price={TEMP_DATA[2].price} image={TEMP_DATA[2].image} />
            <StackListElement name={TEMP_DATA[4].name} price={TEMP_DATA[4].price} image={TEMP_DATA[4].image} />
            <StackListElement name={TEMP_DATA[6].name} price={TEMP_DATA[6].price} image={TEMP_DATA[6].image} />
            <StackListElement name={TEMP_DATA[5].name} price={TEMP_DATA[5].price} image={TEMP_DATA[5].image} />
            <StackListElement name={TEMP_DATA[8].name} price={TEMP_DATA[8].price} image={TEMP_DATA[8].image} />
            <StackListElement name={TEMP_DATA[7].name} price={TEMP_DATA[7].price} image={TEMP_DATA[7].image} />
        </div>
    )
}

const ConstructorComponent = () => {
    return (
        <div className="pt-25 pr-4 pb-10 pl-4">
            <div className={BurgerConstructorStyles.constructorComponentContainer}>
                <OffStackListElement isTop={true} name={TEMP_DATA[0].name} price={TEMP_DATA[0].price} image={TEMP_DATA[0].image} />
                <StackList />
                <OffStackListElement isTop={false} name={TEMP_DATA[0].name} price={TEMP_DATA[0].price} image={TEMP_DATA[0].image} />
            </div>
        </div>
    )
}

export const BurgerConstructor = () => {
    return (
        <div className={BurgerConstructorStyles.burgerConstructorWrapper}>
            <ConstructorComponent />
            <Info />
        </div>
    )
}