import refreshTokens from "../../../helpers/refreshTokens.helper";
import type { RDTResponse } from "../../../types/api";

export default async function authCheck(): Promise<RDTResponse> {
    let result: RDTResponse = await fetch(import.meta.env.VITE_RDT_SERVER_URL + `/api/v1/auth/auth-check`, {
        method: "GET",
        credentials: "include",
    }).then((res) => res.json());

    if (!result.success && result.errors?.[0]?.message === "Invalid access token") {
        await refreshTokens();
        const refreshed: RDTResponse = await authCheck();
        if (refreshed.success) return refreshed;
    }

    return result;
}
