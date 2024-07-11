import { useEffect } from "react";
import { createPortal } from "react-dom";
import { PropTypes } from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyles from "./css/style.module.css"
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

export const Modal = (props) => {
    const closeModal = () => props.handlerOpen();

    useEffect(() => {
        function closeByEscape(evt) {
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
                        {props.children}
                        <span className={`${ModalStyles.closeIcon}`}>
                            <CloseIcon onClick={() => closeModal()} />
                        </span>
                    </div>
                </div>
            </div>,
            modalRoot
        )
    );
}

Modal.propTypes = {
    handlerOpen: PropTypes.func,
    isOpen: PropTypes.bool
}