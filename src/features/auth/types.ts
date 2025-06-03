export type TypeUser = {
    id: string;
    name: string;
    email: string;
    image:  string;
};

export type TypeUserResponse = {
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            image: File | Blob | MediaSource | Uint8Array;
        };
    };
    errors: string[];
    message: string;
    success: boolean;
};

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
