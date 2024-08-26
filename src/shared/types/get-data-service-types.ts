import { IIngredient, IOrderData, IUserData, TServerResponse } from "../types/types";

export type TGetDataServiceResponse = TServerResponse<{
    data: IIngredient[];
}>

export type TPostOrderResponse = TServerResponse <{
    name: string;
    order: IOrderData;
}>

export type TFeedOrdersResponse = TServerResponse <{
    success: boolean;
    order: IOrderData[];
}>

export type TRegisterResponse = TServerResponse<{
    user: IUserData;
}>

export type TLoginResponse = TServerResponse<{
    user: IUserData;
    accessToken: string,
    refreshToken: string
}>

export type TGetResetPasswordCodeResponse = TServerResponse<{
    message: string;
}>

export type TResetPasswordResponse = TServerResponse<{
    message: string;
}>

export type TGetUserDataResponse = TServerResponse<{
    user: IUserData;
}>

export type TPatchUserData = TServerResponse<{
    user: IUserData;
}>