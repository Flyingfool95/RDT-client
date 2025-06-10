import { TypeResponse } from "../shared/types";

export type TypeUser = {
    id: string;
    name: string;
    email: string;
    image: string | null;
};

export type TypeUserResponse = TypeResponse<{
    user: TypeUser;
}>;

export type TypeAuthStore = {
    user: TypeUser | null;
    setUser: (newUser: TypeUser | null) => void;
    isAuthChecked: boolean;
    setIsAuthChecked: (newState: boolean) => void;
};

export type TypeRegisterUser = {
    user: TypeUser | null;
    setUser: (newUser: TypeUser | null) => void;
    isAuthChecked: boolean;
    setIsAuthChecked: (newState: boolean) => void;
};
