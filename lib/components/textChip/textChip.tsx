'use client';
import React from 'react';
import './textChip.scss';

type TextChipProps = {
   text : string;
   className?: string;
};

const TextChip: React.FC<TextChipProps> = ({ text, className }) => {
    return (
        <p className={`text-chip ${className ? className : ''}`}>
            {text}
        </p>
    );
};

export default TextChip;
