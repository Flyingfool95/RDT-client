import styles from "./styles/AuthLayout.module.css";
import { Navigate, Outlet } from "react-router";
import useAuthCheck from "../features/auth/hooks/useAuthCheck";

export default function AuthLayout() {
    const { data } = useAuthCheck() as any;
    if (data) return <Navigate to={"/"} />;

    return (
        <div className={styles.authLayout}>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
