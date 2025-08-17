export type UserType = {
    id: string;
    email: string;
    name: string;
    image: Uint8Array<ArrayBufferLike> | null;
};

export type UserResponseType = {
    data: {
        user: UserType;
    };
};
