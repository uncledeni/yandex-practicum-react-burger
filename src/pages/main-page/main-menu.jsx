import React from "react";
import { AppHeader } from "../../widgets/app-header";

import MainMenuStyles from "./css/style.module.css"
import { BurgerIngredients } from "../../widgets/burger-ingredients";
import { BurgerConstructor } from "../../widgets/burger-constructor";

export const MainMenu = () => {
    return(
        <div className={MainMenuStyles.pageWrapper}>
            <AppHeader />
            <main className={MainMenuStyles.mainWrapper}>
                <BurgerIngredients className={MainMenuStyles.burgerIngredientsComponent} />
                <BurgerConstructor className={MainMenuStyles.burgerConstructorComponent}/>
            </main>
        </div>
    )
}


