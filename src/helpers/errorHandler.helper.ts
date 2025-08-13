import { APIError } from "../classes/apiError";

/* TODO */
// Refactor to handle custom styling for effected fields

export function errorHandler(error: unknown) {
    if (error instanceof APIError) {
        return error.errors.map((err) => err.message).join(", ");
    } else if (error instanceof Error) {
        return error.message;
    } else {
        return "An unknown error occurred";
    }
}
