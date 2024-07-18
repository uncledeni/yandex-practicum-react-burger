import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeaderStyles from "./css/style.module.css"
import { NavLink } from "react-router-dom";

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

const HeaderElem = (props) => {
    return (
        <NavLink to={props.link} className={({ isActive }) => {
            return `${AppHeaderStyles.navElem} pr-5 text text_type_main-default ${(!isActive) ? "text_color_inactive" : ""}`
        }}>
            {(props.inactive) ? props.values.icon_secondary : props.values.icon_primary}
            <p className="pl-2">{props.values.text}</p>
        </NavLink>
    )
}

export const AppHeader = () => {
    return (
        <header className={AppHeaderStyles.appHeaderWrapper}>
            <nav className={AppHeaderStyles.appHeaderContent}>
                <div className={AppHeaderStyles.navigation}>
                    <HeaderElem link={'/'} values={NAVIGATION_VALUES[0]} />
                    <HeaderElem link={'/b'} values={NAVIGATION_VALUES[1]} />
                </div>
                <span className={AppHeaderStyles.logo}>
                    <Logo />
                </span>
                <HeaderElem link={'/profile'} values={NAVIGATION_VALUES[2]} />
            </nav>
        </header>
    )
}