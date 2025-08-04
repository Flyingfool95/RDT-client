import { useEffect } from "react";
import "./FormInput.css";
import { FormInputProps } from "./types";
import useFormErrorStore from "../stores/form-errors/useFormErrorsStore";
import { toCamelCase } from "../../shared/utils/helpers";

export default function FormInput({ label, type, data, setData, placeholder, required = false }: FormInputProps) {
    const { removeFormErrors, formErrors } = useFormErrorStore((state) => state);

    const name = toCamelCase(label);
    const id = `input-${name}`;
    const formInputError =
        formErrors &&
        formErrors.filter((err) => {
            if (err.path === name) return err;
        });
    const httpError =
        formErrors &&
        formErrors.filter((err) => {
            if (err.path === "Http Error") return err;
        });

    const isError = (!!formInputError && formInputError.length > 0) || (!!httpError && httpError.length > 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.value);
    };

    useEffect(() => {
        return removeFormErrors();
    }, [removeFormErrors]);

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
            {isError && <p className="error-message">{formInputError && formInputError[0]?.message}</p>}
        </div>
    );
}
