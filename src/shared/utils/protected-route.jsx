import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnAuth = false, component, pathTo, pathFrom }) => {
    const isAuthChecked = useSelector((store) => store.auth.isAuthChecked);
    const user = useSelector((store) => store.auth.email);
    const resetPasswordCodeRequest = useSelector((store) => store.auth.resetPasswordCodeRequest);
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
    
    console.log(resetPasswordCodeRequest, window.location.pathname, pathTo, pathFrom);
    
    if (window.location.pathname === '/reset-password') {
        return (resetPasswordCodeRequest) ? component : <Navigate to='/login' state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component, pathTo, pathFrom }) => (
    <Protected onlyUnAuth={true} component={component} pathTo={pathTo} pathFrom={pathFrom} />
)