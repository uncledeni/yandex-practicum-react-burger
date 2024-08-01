export type TODO_ANY = any;

export interface IIngredientDetailsType {
    image_large: string;
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
}

export interface IIngredientsStackType {
    data: IIngredientDetailsType[];
    openModal: boolean;
    setIngredient: () => void,
    setOpenModal: () => void;
    title: string;
    type: string;
}

export interface IIngredient {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
}

export interface IIngredientElemType {
    ingredient: IIngredient;
    openModal: boolean;
    setIngredient: () => void;
    setOpenModal: () => void;
}

export interface IStackListElementType {
    ingredient: IIngredient;
    id: string;
    index: number;
    swap: (dragIndex: number, hoverIndex: number) => void;
}

export interface IOffStackListElementType {
    isTop: boolean;
    bun: IIngredient
}

export interface IInfoType {
    constructorModal: () => void;
    modalStatus: () => void;
}

export interface IFilling {
    id: string;
    ingredient: IIngredient;
}

export interface IBun {
    ingredient: IIngredient;
}

export interface IOrder {
    bun: IIngredient;
    fillings: (IFilling[])
}

export interface IDragItem {
    id: string;
    index: number;
}

export interface IOrderData {
    type: string;
    order: {
        name: string;
        success: boolean;
        order: {
            createdAt: string;
            ingredients: IIngredient[];
            name: string;
            number: number
            owner: { name: string, email: string, createdAt: string, updatedAt: string }
            price: number
            status: string
            updatedAt: string
            _id: string
        }
    }
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IUserData extends ILoginData {
    name: string;
}

export interface IResetPassword {
    password: string;
    code: string;
}

export interface IResetPasswordCode {
    email: string;
}

export interface IPostOrder {
    ingredients: string[]
}

export interface IActionBlock {
    link: string;
    title: string;
    linkTitle: string;
    extraClass?: string;
}