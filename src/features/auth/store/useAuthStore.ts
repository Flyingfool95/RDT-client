import { create } from "zustand";
import { TypeAuthStore, TypeUser } from "../types";

const useAuthStore = create<TypeAuthStore>((set) => ({
    user: null,
    setUser: (newUser: TypeUser | null) => {
        set(() => ({
            user: newUser,
        }));
    },
    isAuthChecked: false,
    setIsAuthChecked: (newState: boolean) => {
        set(() => ({
            isAuthChecked: newState,
        }));
    },
}));

export default useAuthStore;
