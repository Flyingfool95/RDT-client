import { create } from "zustand";
import { TypeAuthStore, TypeUser } from "../types";

const useAuthStore = create<TypeAuthStore>((set) => ({
    user: undefined,
    setUser: (newUser: TypeUser | undefined) => {
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
