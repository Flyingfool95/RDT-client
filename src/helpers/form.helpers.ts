import type { ApiErrorDetailType } from "../classes/ApiError.class";

export function checkFormErrors(errors: Array<ApiErrorDetailType> | null, path?: string): boolean {
    if (!errors || errors.length === 0) return false;

    if (path) {
        const filtered = errors.filter((err) => err.path === path);
        return filtered.length > 0;
    }

    return true;
}
