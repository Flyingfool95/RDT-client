export type ApiError = Array<{ message: string; path?: string }>;

export type RDTResponse<T = unknown> = {
    success: boolean;
    status: number;
    message: string;
    data?: T;
    errors?: ApiError;
};
