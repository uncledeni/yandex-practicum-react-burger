import React from "react";

interface ILoader {
    isLoading: boolean;
    loadingText: string;
    children: JSX.Element;
}

export const Loader = ({ isLoading, loadingText, children }: ILoader) => {
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