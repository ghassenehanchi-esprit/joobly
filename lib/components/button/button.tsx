'use client';
import React, { useState } from 'react';
import { ButtonProps } from '@/lib/types/componentTypes';
import './botton.scss';

const Button: React.FC<ButtonProps> = ({ children, onClick, style, className, disabled, type, icon, hoverIcon }) => {
    const [showIcon, setShowIcon] = useState(icon);

    return (
        <button
            type={type}
            onClick={onClick}
            style={style}
            className={`btn ${className}`}
            disabled={disabled}
            onMouseOver={() => hoverIcon ? setShowIcon(hoverIcon) : null}
            onMouseOut={() => hoverIcon ? setShowIcon(icon) : null}
        >
            {icon && <picture>
                <img
                    src={showIcon}
                    alt="button"
                />
            </picture>}
           
            {children}
        </button>
    );
};

export default Button;