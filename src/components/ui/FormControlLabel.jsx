import React from "react";

const FormControlLabel = ({
    checked,
    onChange,
    name,
    children,
    className = "",
    ...props
}) => (
    <label className={`flex items-center gap-2 bg-[#e3efef] px-3 py-2 rounded-lg cursor-pointer ${className}`}>
        <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="accent-[#a97b4c]"
            {...props}
        />
        <span>{children}</span>
    </label>
);

export default FormControlLabel;