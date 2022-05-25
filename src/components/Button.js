import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--outline"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
}) => {
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const checkButtonStyle = STYLES[0];

    return (
        <Link to="/sign-up" className="btn-mobile">
            <button
                className={`btn ${checkButtonSize} ${checkButtonStyle}`}
                onClick={onClick}
                typr={type}
            >
                {children}
            </button>
        </Link>
    );
};
