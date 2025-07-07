import "./FormInput.css";
import { FormInputProps } from "./types";

export default function FormInput({ label, name, type, data, setData, placeholder, required }: FormInputProps) {
    const id = `input-${name}`;
    console.log(data);
    return (
        <div className={`form-input ${data.isError ? "input-error" : ""}`}>
            <label htmlFor={id}>{label}</label>
            {type === "textarea" ? (
                <textarea
                    name={name}
                    id={id}
                    value={data.value}
                    onChange={(e) => setData({ ...data, value: e.target.value })}
                    placeholder={placeholder}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={data.value}
                    onChange={(e) => setData({ ...data, value: e.target.value })}
                    placeholder={placeholder}
                    required={required}
                />
            )}
        </div>
    );
}
