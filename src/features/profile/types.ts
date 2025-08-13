export type UserType = {
    id: string;
    email: string;
    name: string;
    image: Uint8Array<ArrayBufferLike>;
};

export type UserQueryDataType = {
    data: {
        user: UserType;
    };
};

export type ProfileFormDataType = {
    email: string;
    name: string;
    image: File | string;
};
