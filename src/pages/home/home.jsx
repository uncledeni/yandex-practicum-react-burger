import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { AppHeader } from "../../widgets/app-header";
import { BurgerIngredients } from "../../widgets/burger-ingredients";
import { BurgerConstructor } from "../../widgets/burger-constructor";

import HomeStyles from "./css/style.module.css";

export const Home = () => {
    return (
        <div className={HomeStyles.pageWrapper}>
            <AppHeader />
            <main className={HomeStyles.mainWrapper}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients className={HomeStyles.burgerIngredientsComponent} />
                    <BurgerConstructor className={HomeStyles.burgerConstructorComponent} />
                </DndProvider>
            </main>
        </div>
    )
}