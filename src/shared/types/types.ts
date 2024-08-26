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
    bun: IBun;
    fillings: IFilling[];
}

// -- ORDER DETAILS --
export interface IFeedOrder {
    _id: string
    name: string;
    number: number
    ingredients: string[];
    status: string
    createdAt: string;
    updatedAt: string
}

export interface IOrderData extends IFeedOrder {
    owner: { name: string, email: string, createdAt: string, updatedAt: string }
    price: number
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

export interface IWSActionPayload {
    orders: IFeedOrder[],
    success: boolean,
    total: number,
    totalToday: number,
}

export interface IWSFeedReducer {
    status: WebSocketStatus,
    data: IWSActionPayload,
    error: string
}