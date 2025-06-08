export type TypeResponse<T = unknown> = {
    data: T;
    errors: string[];
    message: string;
    success: boolean;
};
