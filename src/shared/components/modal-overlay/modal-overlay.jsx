import ModalOverlayStyles from "./css/style.module.css"
import { PropTypes } from "prop-types";

export const ModalOverlay = (props) => {
    console.log(props)
    return (
        <div onClick={() => {
            props.handlerOpen(false);
        }} className={ModalOverlayStyles.modalOverlay}>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    handlerOpen: PropTypes.func
}