import React, { FC } from "react";

interface ILoader {
    isLoading: boolean;
    loadingText: string;
    children: JSX.Element;
}

export const Loader: FC<ILoader> = ({ isLoading, loadingText, children }) => {
    return (
        <>
            {(isLoading) ?
                <p className={`text text_type_main-large pt-30`}>{loadingText}</p>
                :
                <>
                    {children}
                </>
            }
        </>
    )
}