import React from "react";
import { AppHeader } from "../../widgets/app-header";

import "./css/style.css"
import { BurgerIngredients } from "../../widgets/burger-ingredients";
import { BurgerConstructor } from "../../widgets/burger-constructor";

export const MainMenu = () => {
    return(
        <div className="page-wrapper">
            <AppHeader />
            <BurgerIngredients className="burger-ingredients-component" />
            <BurgerConstructor />
        </div>
    )
}


