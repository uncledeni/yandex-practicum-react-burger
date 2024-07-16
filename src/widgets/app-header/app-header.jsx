import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeaderStyles from "./css/style.module.css"

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
        <div className={`${AppHeaderStyles.navElem} pr-5 text text_type_main-default ${(props.inactive) && "text_color_inactive"}`}>
            {(props.inactive) ? props.values.icon_secondary : props.values.icon_primary}
            <p className="pl-2">{props.values.text}</p>
        </div >
    )
}

export const AppHeader = (params) => {
    return (
        <header className={AppHeaderStyles.appHeaderWrapper}>
            <nav className={AppHeaderStyles.appHeaderContent}>
                <div className={AppHeaderStyles.navigation}>
                    <HeaderElem values={NAVIGATION_VALUES[0]} />
                    <HeaderElem inactive values={NAVIGATION_VALUES[1]} />
                </div>
                <span className={AppHeaderStyles.logo}>
                    <Logo/>
                </span>
                <HeaderElem inactive values={NAVIGATION_VALUES[2]} />
            </nav>
        </header>
    )
}