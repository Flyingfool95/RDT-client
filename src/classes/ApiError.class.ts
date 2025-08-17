export type ApiErrorDetailType = {
    message: string;
    path: string;
};

export class ApiError extends Error {
    status: number;
    errors: Array<ApiErrorDetailType>;

    constructor(message: string, status: number, errors: ApiErrorDetailType[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}

export type ApiErrorType = InstanceType<typeof ApiError>;
