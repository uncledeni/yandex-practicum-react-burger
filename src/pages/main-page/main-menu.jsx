import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { AppHeader } from "../../widgets/app-header";
import { BurgerIngredients } from "../../widgets/burger-ingredients";
import { BurgerConstructor } from "../../widgets/burger-constructor";

import MainMenuStyles from "./css/style.module.css"

export const MainMenu = () => {
    return (
        <div className={MainMenuStyles.pageWrapper}>
            <AppHeader />
            <main className={MainMenuStyles.mainWrapper}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients className={MainMenuStyles.burgerIngredientsComponent} />
                    <BurgerConstructor className={MainMenuStyles.burgerConstructorComponent} />
                </DndProvider>
            </main>
        </div>
    )
}