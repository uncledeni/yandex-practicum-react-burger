import React from "react";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import "./css/style.css"

const NAVIGATION_VALUES = [
    {
        icon_primary: <BurgerIcon type="primary"/>,
        icon_secondary: <BurgerIcon type="secondary"/>,
        text: "Конструктор"
    },
    {
        icon_primary: <ListIcon type="primary"/>,
        icon_secondary: <ListIcon type="secondary"/>,
        text: "Лента заказов"
    },
    {
        icon_primary: <ProfileIcon type="primary"/>,
        icon_secondary: <ProfileIcon  type="secondary"/>,
        text: "Личный кабинет"
    },
]

const HeaderElem = (props) => {
    return (
        <div className={`nav-elem pr-5 text text_type_main-default ${(props.inactive) && "text_color_inactive"}`}>
            {(props.inactive) ? props.values.icon_secondary : props.values.icon_primary}
            <p className="pl-2">{props.values.text}</p>
        </div >
    )
}

export const AppHeader = (params) => {
    return (
        <div className="app-header-wrapper">
            <div className="app-header-content ">
                <div className="navigation">
                    <HeaderElem values={NAVIGATION_VALUES[0]} />
                    <HeaderElem inactive values={NAVIGATION_VALUES[1]} />
                </div>
                <Logo className="logo"/>
                <HeaderElem inactive values={NAVIGATION_VALUES[2]} />
            </div>
        </div>
    )
}