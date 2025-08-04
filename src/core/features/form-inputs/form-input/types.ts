import { ChangeEvent } from "react";

export type FormInputProps = {
    classNames?: string;
    label: string;
    type: "text" | "textarea" | "email" | "password";
    data: string;
    setData: React.Dispatch<React.SetStateAction<string>>;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
};
