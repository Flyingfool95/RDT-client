import "./FormInput.css";
import { ChangeEvent } from "react";

interface FormInputProps {
    classNames?: string;
    label: string;
    name: string;
    type?: "text" | "number" | "textarea" | "email" | "password";
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
}

export default function FormInput({
    classNames = "",
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required,
}: FormInputProps) {
    const id = `input-${name}`;

    return (
        <div className={`form-input ${classNames}`}>
            <label htmlFor={id}>{label}</label>
            {type === "textarea" ? (
                <textarea
                    name={name}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />
            )}
        </div>
    );
}
