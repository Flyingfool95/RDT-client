import type { RDTResponse } from "../../../types/api";
import refreshTokens from "./refreshTokens.api";

export default async function authCheck(retries = 1): Promise<RDTResponse> {
    let result: any = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/auth-check`, {
        method: "GET",
        credentials: "include",
    });

    result = await result.json();

    if (!result.success && result.errors?.[0]?.message === "Invalid access token" && retries > 0) {
        await refreshTokens();
        return authCheck(retries - 1);
    }
    return result;
}
