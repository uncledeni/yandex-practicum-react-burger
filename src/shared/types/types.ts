export type TODO_ANY = any;

// -- BURGER INGREDIENTS --
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

// -- INGREDIENT DETAILS --
export type IIngredientDetailsType = Pick<IIngredient, 'name' | 'calories' | 'carbohydrates' | 'fat' | 'image_large' | 'proteins'>

// -- BURGER CONSTRUCTOR --
interface IConstructorElement {
    ingredient: IIngredient;
}

export interface IBun extends IConstructorElement { };

export interface IFilling extends IConstructorElement {
    id: string;
}

export interface IOrder {
    bun: IIngredient;
    fillings: IFilling[];
}

// -- ORDER DETAILS --
export interface IOrderData {
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

export interface IOrderAction {
    type: string;
    order: {
        name: string;
        success: boolean;
        order: IOrderData
    }
}

// -- API --
export interface IUserData {
    email: string;
    password: string;
    name: string;
}

export type ILoginData = Omit<IUserData, 'name'>

export type IResetPasswordCode = Pick<IUserData, 'email'>

export type IResetPassword = Pick<IUserData, 'password'> & { code: string; }

export interface IPostOrder {
    ingredients: string[]
}

// -- API RESPONSES --
export type TServerResponse<T> = {
    success: boolean;
} & T;

export type TRefreshResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
}>

// ws

export enum WebSocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}