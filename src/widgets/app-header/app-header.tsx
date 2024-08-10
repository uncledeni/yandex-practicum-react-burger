import React from "react";
import { NavLink } from "react-router-dom";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeaderStyles from "./css/style.module.css";

const NAVIGATION_VALUES = [
    {
        icon_primary: <BurgerIcon type="primary" />,
        icon_secondary: <BurgerIcon type="secondary" />,
        text: "Конструктор"
    },
    {
        icon_primary: <ListIcon type="primary" />,
        icon_secondary: <ListIcon type="secondary" />,
        text: "Лента заказов"
    },
    {
        icon_primary: <ProfileIcon type="primary" />,
        icon_secondary: <ProfileIcon type="secondary" />,
        text: "Личный кабинет"
    },
]

interface IHeaderElemProps {
    link: string,
    value: {
        icon_primary: JSX.Element,
        icon_secondary: JSX.Element,
        text: string
    }
}

const HeaderElem = ({ link, value }: IHeaderElemProps) => {
    return (
        <NavLink to={link} className={({ isActive }) => {
            return `${(!isActive) ? "text_color_inactive" : AppHeaderStyles.navElemColor} ${AppHeaderStyles.navElem} pr-5 text text_type_main-default`
        }}>
            {({ isActive }) => (
                <>
                    {((isActive) ? value.icon_primary : value.icon_secondary)}
                    < p className="pl-2">{value.text}</p>
                </>
            )}
        </NavLink >
    )
}

export const AppHeader = () => {
    return (
        <header className={AppHeaderStyles.appHeaderWrapper}>
            <nav className={AppHeaderStyles.appHeaderContent}>
                <div className={AppHeaderStyles.navigation}>
                    <HeaderElem link={'/'} value={NAVIGATION_VALUES[0]} />
                    <HeaderElem link={'/b'} value={NAVIGATION_VALUES[1]} />
                </div>
                <span className={AppHeaderStyles.logo}>
                    <Logo />
                </span>
                <HeaderElem link={'/profile'} value={NAVIGATION_VALUES[2]} />
            </nav>
        </header>
    )
}