import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BurgerIngredients } from "../../widgets/burger-ingredients";
import { BurgerConstructor } from "../../widgets/burger-constructor";

import HomeStyles from "./css/style.module.css";

export const Home = () => {
    return (
        <main className={HomeStyles.pageWrapper}>
            <div className={HomeStyles.mainWrapper}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </div>
        </main>
    )
}