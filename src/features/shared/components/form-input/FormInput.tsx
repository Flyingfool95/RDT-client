import { toCamelCase } from "../../utils/helpers";
import "./FormInput.css";
import { FormInputProps } from "./types";

export default function FormInput({
    label,
    type,
    data,
    setData,
    errors,
    placeholder,
    required = false,
}: FormInputProps) {
    const name = toCamelCase(label);
    const id = `input-${name}`;
    const isError = errors.includes(name) || errors.includes("Http Error");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.value);
    };

    return (
        <div className={`form-input ${isError ? "input-error" : ""}`}>
            <label htmlFor={id}>{label}</label>
            {type === "textarea" ? (
                <textarea
                    name={name}
                    id={id}
                    value={data}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={data}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                />
            )}
            {isError && <p className="error-message">Error</p>}
        </div>
    );
}
