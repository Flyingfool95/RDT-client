import { ChangeEvent } from "react";

export type FormInputProps = {
    classNames?: string;
    label: string;
    type: "text" | "textarea" | "email" | "password";
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
};
