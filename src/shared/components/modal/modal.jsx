import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalStyles from "./css/style.module.css"
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { PropTypes } from "prop-types";

const modalRoot = document.getElementById("react-modals");

export const Modal = (props) => {
    if (props.isOpen) {
        document.addEventListener('keydown', function (event) {
            if (event.key === "Escape") props.handlerOpen(false);
        });
    }

    if (props.isOpen) {
        document.removeEventListener('keydown', function (event) {
            if (event.key === "Escape") props.handlerOpen(false);
        });
    }

    return (
        <>
            {props.isOpen && createPortal(
                <div className={ModalStyles.modalWrapper}>
                    <ModalOverlay handlerOpen={props.handlerOpen} />
                    <div className={ModalStyles.modalContainer}>
                        <div className={ModalStyles.modal}>
                            {props.children}
                            <span className={`${ModalStyles.closeIcon}`}>
                                <CloseIcon onClick={() => {
                                    props.handlerOpen(false);
                                }} />
                            </span>
                        </div>
                    </div>
                </div>,
                modalRoot
            )}
        </>
    );
}

Modal.propTypes = {
    handlerOpen: PropTypes.func,
    isOpen: PropTypes.bool
}