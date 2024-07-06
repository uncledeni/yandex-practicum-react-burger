import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorStyles from "./css/style.module.css"

import { Modal } from "../../shared/components/modal/modal";
import { OrderDetails } from "./components/order-details/order-details";
import { infoType, offStackListElementType, stackListElementType } from "../../shared/utils/types";
import { useModal } from "../../shared/hooks/useModal";
import { DELETE_INGREDIENT_BURGER_CONSTRUCTOR, SWAP_INGREDIENTS, addIngredient } from "../../shared/services/actions/burger-constructor";
import { checkEmptyArr } from "../../shared/utils/checks";
import { DECREASE_BUN_COUNTER, DECREASE_INGREDIENT_COUNTER, INCREASE_INGREDIENT_COUNTER } from "../../shared/services/actions/burger-ingredients";
import { CLEAR_ORDER_DETAILS, getOrderDetails } from "../../shared/services/actions/order-details";

const Info = (props) => {
    const arr = useSelector(store => store.order);

    const calcTotal = (data) => {
        let price = (checkEmptyArr(data.fillings)) ? (data.fillings.reduce((sum, current) => sum + current.ingredient.price, 0)) : 0;
        return price += (data.bun !== null) ? (data.bun.price * 2) : 0;
    }

    const dispatch = useDispatch();

    const orderDetailsArr = (arr) => {
            let tempArr = [];
            tempArr.push(arr.bun._id);
            arr.fillings.map(ingredient => tempArr.push(ingredient.ingredient._id));
            tempArr.push(arr.bun._id);
            return tempArr;
    }

    return (
        <div className={BurgerConstructorStyles.burgerConstructorInfoWrapper}>
            <div className={BurgerConstructorStyles.burgerConstructorInfoPrice}>
                <p className="text text_type_digits-medium">{calcTotal(arr)}</p>
                <CurrencyIcon />
            </div>
            <Button disabled={(arr.bun === null)} htmlType="button" type="primary" size="medium" onClick={() => {
                dispatch(getOrderDetails(orderDetailsArr(arr)))
                props.constructorModal()
            }}>Оформить заказ</Button>
        </div>
    )
}

Info.propTypes = infoType;

const OffStackListElement = (props) => {
    return (
        <div className={BurgerConstructorStyles.offStackListElement}>
            <ConstructorElement
                type={(props.isTop) ? 'top' : 'bottom'}
                isLocked={true}
                text={`${props.bun.name} ${(props.isTop) ? 'верх' : 'низ'}`}
                price={props.bun.price}
                thumbnail={props.bun.image}
            />
        </div>
    )
}

OffStackListElement.propTypes = offStackListElementType;

const StackListElement = ({ ingredient, id, index, swap }) => {
    const ref = useRef(null);

    const [{ isDragging }, dragRef] = useDrag({
        type: "self",
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ handlerId }, dropRef] = useDrop({
        accept: "self",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            swap(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    });
    const opacity = isDragging ? 0 : 1
    dragRef(dropRef(ref))


    const dispatch = useDispatch();
    const deleteIngredient = () => {
        dispatch({ type: DELETE_INGREDIENT_BURGER_CONSTRUCTOR, id });
        dispatch({ type: DECREASE_INGREDIENT_COUNTER, ingredient });
    }

    return (
        <div style={{ opacity }} ref={ref} data-handler-id={handlerId} className={BurgerConstructorStyles.stackListElement}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => {
                    deleteIngredient(ingredient)
                }}
            />
        </div>
    )
}

StackListElement.propTypes = stackListElementType;

const StackList = () => {
    const fillings = useSelector(store => store.order.fillings);

    const dispatch = useDispatch();
    const swapIngredients = (dragIndex, hoverIndex) => {
        dispatch({ type: SWAP_INGREDIENTS, dragIndex, hoverIndex })
    }

    const renderIngredient = useCallback((ingredient, index) => {
        return (
            <StackListElement
                key={ingredient.id}
                index={index}
                id={ingredient.id}
                ingredient={ingredient.ingredient}
                swap={swapIngredients}
            />
        )
    }, [])

    return (
        <div className={BurgerConstructorStyles.stackListWrapper}>
            {fillings.map((ingredient, i) => renderIngredient(ingredient, i))}
        </div>
    )
}

const ConstructorComponent = () => {
    const bun = useSelector(store => store.order.bun);

    const dispatch = useDispatch();
    const dropIngredient = (ingredient) => {

        dispatch(addIngredient(ingredient));

        if (ingredient.ingredient.type === 'bun') {
            if ( bun === null) {
                dispatch({ type: INCREASE_INGREDIENT_COUNTER, ingredient });
                dispatch({ type: INCREASE_INGREDIENT_COUNTER, ingredient });
            } else {
                dispatch({type: DECREASE_BUN_COUNTER, bun});
                dispatch({type: DECREASE_BUN_COUNTER, bun});
                dispatch({ type: INCREASE_INGREDIENT_COUNTER, ingredient });
                dispatch({ type: INCREASE_INGREDIENT_COUNTER, ingredient });
            }
        } else {
            dispatch({ type: INCREASE_INGREDIENT_COUNTER, ingredient });
        }
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            dropIngredient(itemId)
        }
    });

    return (
        <div className="pt-25 pr-4 pb-10 pl-4">
            <div className={BurgerConstructorStyles.constructorComponentContainer} ref={dropTarget}>
                {(bun !== null) ? <OffStackListElement isTop={true} bun={bun} /> : <></>}
                <StackList />
                {(bun !== null) ? <OffStackListElement isTop={false} bun={bun} /> : <></>}
            </div>
        </div>
    )
}

export const BurgerConstructor = () => {
    const { isModalOpen, openModal, closeModal } = useModal();

    const dispatch = useDispatch();

    const clearOrderDetails = () => {
        dispatch({ type: CLEAR_ORDER_DETAILS })
    }

    const closeAndClear = () => {
        closeModal();
        clearOrderDetails();
    }

    return (
        <div className={BurgerConstructorStyles.burgerConstructorWrapper}>
            <ConstructorComponent />
            <Info constructorModal={openModal} />
            {isModalOpen && <Modal handlerOpen={closeAndClear}>
                <OrderDetails />
            </Modal>}
        </div>
    )
}