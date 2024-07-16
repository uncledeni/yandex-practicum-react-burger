import ProfileNavbarStyles from "./css/style.module.css";

export const ProfileNavbar = () => {
    return (
        <div className={`${ProfileNavbarStyles.profileNavbar} ml-15`}>
            <p className="pt-4 pb-4 text text_type_main-medium">Профиль</p>
            <p className="pt-4 pb-4 text text_type_main-medium text_color_inactive">История заказов</p>
            <p className="pt-4 pb-4 text text_type_main-medium text_color_inactive">Выход</p>
            <p className="pt-20 text text_type_main-default text_color_inactive">
                В этом разделе вы можете
                изменить свои персональные данные
            </p>
        </div>
    )
}
