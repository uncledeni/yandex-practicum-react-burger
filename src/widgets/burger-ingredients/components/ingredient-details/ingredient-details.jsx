import BurgerIngredientsModalStyles from "./style.module.css"
import PropTypes from 'prop-types';

export const IngredientDetails = ({ image_large, name, calories, proteins, fat, carbohydrates }) => {
    return (
        <div className={BurgerIngredientsModalStyles.card}>
            <div className={BurgerIngredientsModalStyles.titleButton}>
                <p className="text text_type_main-large">Детали ингредиента</p>
            </div>
            <img className={BurgerIngredientsModalStyles.ingredientModalIllustration} src={image_large} alt={`${name}`} />
            <div className={BurgerIngredientsModalStyles.content}>
                <p className={`${BurgerIngredientsModalStyles.ingredientTitle} text text_type_main-medium`}>{name}</p>
                <div className={BurgerIngredientsModalStyles.nutritionValues}>
                    <div>
                        <p className={`${BurgerIngredientsModalStyles.valueNames} text text_type_main-default`}>Калории,ккал</p>
                        <p className={`${BurgerIngredientsModalStyles.values} text text_type_digits-default`}>{calories}</p>
                    </div>
                    <div>
                        <p className={`${BurgerIngredientsModalStyles.valueNames} text text_type_main-default`}>Белки, г</p>
                        <p className={`${BurgerIngredientsModalStyles.values} text text_type_digits-default`}>{proteins}</p>
                    </div>
                    <div>
                        <p className={`${BurgerIngredientsModalStyles.valueNames} text text_type_main-default`}>Жиры, г</p>
                        <p className={`${BurgerIngredientsModalStyles.values} text text_type_digits-default`}>{fat}</p>
                    </div>
                    <div>
                        <p className={`${BurgerIngredientsModalStyles.valueNames} text text_type_main-default`}>Углеводы, г</p>
                        <p className={`${BurgerIngredientsModalStyles.values} text text_type_digits-default`}>{carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    image_large: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
}