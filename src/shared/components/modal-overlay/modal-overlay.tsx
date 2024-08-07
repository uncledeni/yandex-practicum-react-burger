import React from "react";
import ModalOverlayStyles from "./css/style.module.css";

interface IModalOverlay {
    handlerOpen: () => void
}

export const ModalOverlay = ({ handlerOpen }: IModalOverlay) => {
    return (
        <img onClick={() => handlerOpen()} className={ModalOverlayStyles.modalOverlay} />
    )
}