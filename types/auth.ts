export interface IUser {
    id: string;
    email: string;
    name: string;
    roles: string[];
}
export interface IAuthStore {
    user: IUser | null;
    setUser: (newUser: IUser | null) => void;
    isAuthChecked: boolean;
    setIsAuthChecked: (newState: boolean) => void;
}
