import "./FormInput.css";
import { FormInputProps } from "./types";

export default function FormInput({ label, type, data, setData, placeholder, required = false }: FormInputProps) {
    const name = label.toLowerCase().replace(" ", "-");
    const id = `input-${name}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, value: e.target.value });
    };

    return (
        <div className={`form-input ${data.isError ? "input-error" : ""}`}>
            <label htmlFor={id}>{label}</label>
            {type === "textarea" ? (
                <textarea
                    name={name}
                    id={id}
                    value={data.value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={data.value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                />
            )}
            {data.isError && <p className="error-message">{data.error}</p>}
        </div>
    );
}
