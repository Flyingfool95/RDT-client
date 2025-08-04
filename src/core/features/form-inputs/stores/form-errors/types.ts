export type FormErrors = Array<{ message: string; path: string }>;

export type FormErrorStore = {
    formErrors: FormErrors | null;
    setFormErrors: (newErrors: FormErrors) => void;
    removeFormErrors: () => void;
};