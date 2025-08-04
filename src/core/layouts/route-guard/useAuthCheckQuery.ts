import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../features/shared/utils/customFetch";
import { convertPixelDataToImage } from "../../features/shared/utils/helpers";
import { RDTResponse, User } from "../../features/shared/types";

export const useAuthCheckQuery = () => {
    return useQuery({
        queryKey: ["auth-check"],
        queryFn: async () => {
            const result: RDTResponse = await customFetch(`/api/v1/auth/auth-check`, "GET", true);

            const userData = result.data as { user: User };

            return {
                id: userData.user.id,
                name: userData.user.name,
                email: userData.user.email,
                image: await convertPixelDataToImage(userData.user.image),
            };
        },
        retry: false,
        staleTime: 1000 * 60 * 5, // optional: cache user for 5 mins
        refetchOnWindowFocus: false,
    });
};
