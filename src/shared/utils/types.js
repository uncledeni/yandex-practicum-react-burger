import PropTypes from 'prop-types';

export const ingredientDetailsType = PropTypes.shape({
    image_large: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
})


export const ingredientsStackType = {
    data: PropTypes.array,
    openModal: PropTypes.bool,
    setIngredient: PropTypes.func,
    setOpenModal: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string
}

export const ingredientElemType = {
    ingredient: PropTypes.shape({
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string,
        __v: PropTypes.number,
        _id: PropTypes.string,
    }),
    openModal: PropTypes.bool,
    setIngredient: PropTypes.func,
    setOpenModal: PropTypes.func
}

export const stackListElementType = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
}

export const offStackListElementType = {
    image: PropTypes.string,
    isTop: PropTypes.bool,
    name: PropTypes.string,
    price: PropTypes.number
}

export const infoType = {
    constructorModal: PropTypes.func,
    modalStatus: PropTypes.func
}