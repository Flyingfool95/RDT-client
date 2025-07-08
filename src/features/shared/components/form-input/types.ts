import { ChangeEvent } from "react";
import { ZodSchema } from "zod";

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
    validationSchema: ZodSchema;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
};
