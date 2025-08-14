import { Link, Navigate, NavLink, Outlet } from "react-router";
import logo from "../assets/RDT_logo.png";
import styles from "./styles/AppLayout.module.css";
import useLogout from "../features/auth/hooks/useLogout";
import { arrayToBlobUrl } from "../helpers/arrayToBlobURL.helper";
import { useQueryClient } from "@tanstack/react-query";
import type { UserQueryDataType } from "../features/profile/types";

export default function AppLayout() {
    const queryClient = useQueryClient();
    const { data } = queryClient.getQueryData(["current-user"]) as UserQueryDataType;
    
    const { mutation } = useLogout();

    if (!data) return <Navigate to={"/login"} />;

    return (
        <div className={styles.appLayout}>
            <header>
                <nav>
                    <Link to="/profile" className="logo-link">
                        <img src={arrayToBlobUrl(data.user.image) ?? logo} alt="Logo" className="logo" />
                    </Link>

                    <NavLink to="/">Dashboard</NavLink>

                    <button onClick={() => mutation.mutate()}>Logout</button>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
