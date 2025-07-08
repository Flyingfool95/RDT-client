import { ChangeEvent } from "react";

export type FromInputData = {
    value: string;
    isError: boolean;
    error: string;
};

export type FormInputProps = {
    classNames?: string;
    label: string;
    type: "text" | "textarea" | "email" | "password";
    data: FromInputData;
    setData: React.Dispatch<React.SetStateAction<FromInputData>>;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
};
