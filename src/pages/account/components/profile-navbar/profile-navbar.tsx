import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../shared/services/actions/auth";
import { TODO_ANY } from '../../../../shared/types/types';

import ProfileNavbarStyles from "./css/style.module.css";

export const ProfileNavbar = () => {
    const dispatch: TODO_ANY = useDispatch();

    return (
        <div className={`${ProfileNavbarStyles.profileNavbarContainer} mr-15`}>
            <nav className={`${ProfileNavbarStyles.profileNavbar}`}>
                <NavLink to={'/profile'} className={({ isActive }) => {
                    return `${(!isActive) ? "text_color_inactive" : ProfileNavbarStyles.navbarElemColor} ${ProfileNavbarStyles.navbarElem} pt-4 pb-4 text text_type_main-medium`
                }}>Профиль</NavLink>
                <NavLink to={'/profile/orders'} className={({ isActive }) => {
                    return `${(!isActive) ? "text_color_inactive" : ProfileNavbarStyles.navbarElemColor} ${ProfileNavbarStyles.navbarElem} pt-4 pb-4 text text_type_main-medium`
                }}>История заказов</NavLink>
                <p onClick={() => {dispatch(logout())}} className={`${ProfileNavbarStyles.navbarElem} pt-4 pb-4 text text_type_main-medium text_color_inactive`}>Выход</p>
            </nav>
            <p className="pt-20 text text_type_main-default text_color_inactive">
                В этом разделе вы можете
                изменить свои персональные данные
            </p>
        </div>
    )
}
