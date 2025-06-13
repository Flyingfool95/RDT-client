import { TypeResponse } from "../shared/types";

export type TypeUser = {
    id: string;
    name: string;
    email: string;
    image: string | undefined;
};

export type TypeUserResponse = TypeResponse<{
    user: TypeUser;
}>;

export type TypeAuthStore = {
    user: TypeUser | undefined;
    setUser: (newUser: TypeUser | undefined) => void;
    isAuthChecked: boolean;
    setIsAuthChecked: (newState: boolean) => void;
};

export type TypeRegisterUser = {
    user: TypeUser | undefined;
    setUser: (newUser: TypeUser | undefined) => void;
    isAuthChecked: boolean;
    setIsAuthChecked: (newState: boolean) => void;
};
