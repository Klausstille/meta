import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

export const Button = ({ children, type, onClick }) => {
    return (
        <Link to="/sign-up" className="btn-mobile">
            <button
                className="btn btn--medium btn--outline"
                onClick={onClick}
                typr={type}
            >
                {children}
            </button>
        </Link>
    );
};
