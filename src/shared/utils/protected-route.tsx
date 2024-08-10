import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface IProtected extends IComponent {
    onlyUnAuth: boolean,
}

interface IComponent {
    component: JSX.Element
}

const Protected = ({ onlyUnAuth = false, component }: IProtected): JSX.Element | null => {
    const isAuthChecked = useTypedSelector(store => store.auth.isAuthChecked);
    const user = useTypedSelector((store) => store.auth.email);
    const location = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to='/login' state={{ from: location }} />;
    }

    if (window.location.pathname === '/reset-password' && location.state === null) {
        return <Navigate to='/login' state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: IComponent): JSX.Element | null => (
    <Protected onlyUnAuth={true} component={component} />
)