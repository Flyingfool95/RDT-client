import "./FormInput.css";
import { FormInputProps } from "./types";
import { validateInputData } from "../../utils/helpers";

export default function FormInput({
    label,
    type,
    data,
    setData,
    validationSchema,
    placeholder,
    required = false,
}: FormInputProps) {
    const name = label.toLowerCase().replace(" ", "-");
    const id = `input-${name}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, value: e.target.value });
    };

    const handleBlur = () => {
        const result = validateInputData(validationSchema, data.value);

        if (result.success) {
            setData({ ...data, isError: false, error: "" });
        } else {
            setData({
                ...data,
                isError: true,
                error: result.error.issues.map((issue) => issue.message).join(", "),
            });
        }
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
                    onBlur={handleBlur}
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
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    required={required}
                />
            )}
            {data.isError && <p className="error-message">{data.error}</p>}
        </div>
    );
}
