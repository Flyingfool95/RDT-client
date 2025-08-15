export type ResponseErrorType = Array<{ message: string; path?: string }>;

export type RDTResponseType<T = unknown> = {
    success: boolean;
    status: number;
    message: string;
    data?: T;
    errors?: ResponseErrorType;
};
