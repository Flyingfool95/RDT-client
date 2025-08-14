import styles from "./styles/AuthLayout.module.css";
import { Navigate, Outlet } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { UserQueryDataType } from "../features/profile/types";

export default function AuthLayout() {
    const queryClient = useQueryClient();
    const { data } = queryClient.getQueryData(["current-user"]) as UserQueryDataType;

    if (data) return <Navigate to={"/"} />;

    return (
        <div className={styles.authLayout}>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
