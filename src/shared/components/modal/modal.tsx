import React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

import ModalStyles from "./css/style.module.css"

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModal {
    handlerOpen: () => void;
    children: JSX.Element;
}

export const Modal = ({ handlerOpen, children }: IModal) => {
    const closeModal = () => handlerOpen();

    useEffect(() => {
        function closeByEscape(evt: KeyboardEvent) {
            if (evt.key === 'Escape') {
                closeModal();
            }
        }
        document.addEventListener('keydown', closeByEscape);
        return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
    }, [])

    return (
        createPortal(
            <div className={ModalStyles.modalWrapper}>
                <ModalOverlay handlerOpen={closeModal} />
                <div className={ModalStyles.modalContainer}>
                    <div className={ModalStyles.modal}>
                        {children}
                        <span className={`${ModalStyles.closeIcon}`}>
                            <CloseIcon type='primary' onClick={() => closeModal()} />
                        </span>
                    </div>
                </div>
            </div>,
            modalRoot
        )
    );
}