import { create } from "zustand";
import { IAuthStore, IUser } from "../../../../types/auth";

const useAuthStore = create<IAuthStore>((set) => ({
    user: null,
    setUser: (newUser: IUser | null) => {
        set(() => ({
            user: newUser,
        }));
    },
}));

export default useAuthStore;
