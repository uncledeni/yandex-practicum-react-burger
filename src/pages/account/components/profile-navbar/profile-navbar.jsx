import { NavLink } from "react-router-dom";
import ProfileNavbarStyles from "./css/style.module.css";

export const ProfileNavbar = () => {
    return (
        // 
        <div className={`${ProfileNavbarStyles.profileNavbarContainer} ml-15`}>
            <nav className={`${ProfileNavbarStyles.profileNavbar}`}>
                <NavLink to={'/profile'} className={({ isActive }) => {
                    return `pt-4 pb-4 text text_type_main-medium ${(!isActive) ? "text_color_inactive" : ""}`
                }}>Профиль</NavLink>
                <NavLink to={'/a'} className={({ isActive }) => {
                    return `pt-4 pb-4 text text_type_main-medium ${(!isActive) ? "text_color_inactive" : ""}`
                }}>История заказов</NavLink>
                <NavLink to={'/login'} className={({ isActive }) => {
                    return `pt-4 pb-4 text text_type_main-medium ${(!isActive) ? "text_color_inactive" : ""}`
                }}>Выход</NavLink>
            </nav>
            <p className="pt-20 text text_type_main-default text_color_inactive">
                В этом разделе вы можете
                изменить свои персональные данные
            </p>
        </div>
    )
}
