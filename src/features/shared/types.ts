export type User = {
    id: string;
    email: string;
    name: string;
    image: string;
};

export type ApiError = { message: string; path?: string };

export type RDTResponse = {
    success: boolean;
    status: number;
    message: string;
    data?: any;
    errors?: Array<ApiError>;
};
