import { Link, Navigate, NavLink, Outlet } from "react-router";
import logo from "../assets/RDT_logo.png";
import { HiHome, HiArrowLeftStartOnRectangle, HiMiniUserCircle } from "react-icons/hi2";
import styles from "./styles/AppLayout.module.css";
import useLogout from "../features/auth/hooks/useLogout";
import { arrayToBlobUrl } from "../helpers/arrayToBlobURL.helper";
import useAuthCheck from "../features/auth/hooks/useAuthCheck";


/* TODO */
// Design and thinkthrough navbar
//Refactor navbar into component

export default function AppLayout() {
    const { mutation } = useLogout();

    const { data } = useAuthCheck() as any;

    if (!data) return <Navigate to={"/login"} />;

    return (
        <div className={styles.appLayout}>
            <header className={styles.appHeader}>
                <nav>
                    <Link to="/profile" className="logo-link">
                        <img src={data.image != "" ? arrayToBlobUrl(data.image) : logo} alt="Logo" className="logo" />
                    </Link>

                    <NavLink to="/">
                        <HiHome />
                    </NavLink>
                    <NavLink to="/profile" className={styles.profileLink}>
                        <HiMiniUserCircle />
                    </NavLink>

                    <button onClick={() => mutation.mutate()}>
                        <HiArrowLeftStartOnRectangle />
                    </button>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
