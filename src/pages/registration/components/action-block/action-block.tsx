import React from "react";
import { Link } from "react-router-dom";

import ActionBlockStyles from "./css/style.module.css";

interface IActionBlock {
    link: string;
    title: string;
    linkTitle: string;
    extraClass?: string;
}

export const ActionBlock = ({ link, title, linkTitle, extraClass }: IActionBlock) => {
    return (
        <div className={`${ActionBlockStyles.actionBlock} ${extraClass}`}>
            <p className='text text_type_main-default text_color_inactive'>{title}</p>
            <Link className={`${ActionBlockStyles.link} text text_type_main-default`} to={link}>{linkTitle}</Link>
        </div>
    )
}