import { useMutation, useQueryClient } from "@tanstack/react-query";
import logout from "../api/logout.api";
import { useNavigate } from "react-router";

export default function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const mutation = useMutation({
        mutationFn: logout,
        retry: false,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["current-user"] });
            navigate("/login");
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return {
        mutation,
    };
}
