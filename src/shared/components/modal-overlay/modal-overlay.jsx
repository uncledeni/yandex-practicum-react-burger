import ModalOverlayStyles from "./css/style.module.css"
import { PropTypes } from "prop-types";

export const ModalOverlay = (props) => {
    return (
        <div onClick={() => props.handlerOpen()} className={ModalOverlayStyles.modalOverlay}>
            {props.children}
        </div>
    )
}

// ModalOverlay.propTypes = {
//     handlerOpen: PropTypes.func
// }