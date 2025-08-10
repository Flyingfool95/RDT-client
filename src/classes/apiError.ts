
export class APIError extends Error {
    public errors: { message: string; path: string }[];
    public status: number | null;

    constructor(message: string, errors: { message: string; path: string }[] = [], status?: number) {
        super(message);
        this.name = "APIError";
        this.errors = Array.isArray(errors) ? errors : [errors];
        this.status = status ?? null;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
