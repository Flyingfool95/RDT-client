import { useQuery } from "@tanstack/react-query";
import authCheck from "../api/authCheck.api";

export default function useAuthCheck() {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: () => authCheck(),
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, //5 minutes
    });
}
