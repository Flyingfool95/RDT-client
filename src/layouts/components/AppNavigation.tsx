import { Link, NavLink } from "react-router";
import logo from "../../assets/RDT_logo.png";
import styles from "../styles/AppNavigation.module.css";
import { HiArrowLeftStartOnRectangle, HiHome, HiMiniUserCircle } from "react-icons/hi2";
import useAuthCheck from "../../features/auth/hooks/useAuthCheck";
import useLogout from "../../features/auth/hooks/useLogout";
import { arrayToBlobUrl } from "../../helpers/image.helpers";

export default function AppNavigation() {
    const { mutation } = useLogout();
    const { data, isLoading } = useAuthCheck();
    if (!data || isLoading) return <h1>Loading...</h1>;

    return (
        <nav className={styles.appNavigation}>
            <Link to="/profile" className={styles.logoLink}>
                <img src={data.image ? arrayToBlobUrl(data.image) : logo} alt="Logo" className="logo" />
            </Link>

            <NavLink to="/">
                <HiHome />
            </NavLink>
            <NavLink to="/profile" className={styles.profileLink}>
                <HiMiniUserCircle />
            </NavLink>

            <button onClick={() => mutation.mutate()} className={styles.logoutButton}>
                <HiArrowLeftStartOnRectangle />
            </button>
        </nav>
    );
}
