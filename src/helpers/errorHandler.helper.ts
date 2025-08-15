import { APIError } from "../classes/apiError";



export function errorHandler(error: unknown) {
    if (error instanceof APIError) {
        return error.errors.map((err) => err.message).join(", ");
    } else if (error instanceof Error) {
        return error.message;
    } else {
        return "An unknown error occurred";
    }
}
