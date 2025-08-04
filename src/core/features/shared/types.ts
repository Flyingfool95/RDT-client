export type User = {
    id: string;
    email: string;
    name: string;
    image: string;
};

export type ApiError = { message: string; path?: string };

export type RDTResponse<T = unknown> = {
    success: boolean;
    status: number;
    message: string;
    data?: T;
    errors?: Array<ApiError>;
};
