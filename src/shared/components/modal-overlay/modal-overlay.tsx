import React, { FC } from "react";
import ModalOverlayStyles from "./css/style.module.css";

interface IModalOverlay {
    handlerOpen: () => void
}

export const ModalOverlay: FC<IModalOverlay> = ({ handlerOpen }) => {
    return (
        <img onClick={() => handlerOpen()} className={ModalOverlayStyles.modalOverlay} />
    )
}