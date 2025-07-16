import { create } from "zustand";
import { FormErrorStore } from "./types";

const useFormErrorStore = create<FormErrorStore>((set) => ({
    formErrors: null,
    setFormErrors: (newErrors) => set(() => ({ formErrors: newErrors })),
    removeFormErrors: () => set({ formErrors: null }),
}));

export default useFormErrorStore;
