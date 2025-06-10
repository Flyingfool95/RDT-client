import "../style/AppNavigation.css";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import Logo from "../../../../public/images/rdt-logo.png"

export default function AppNavigation() {
    const { logoutUser } = useAuth();

    return (
        <>
            <nav>
                <img src={Logo} alt="Logo" className="logo" />
                <NavLink to={"/"}>Dashboard</NavLink>
                <NavLink to={"/profile"}>Profile</NavLink>
                <button onClick={() => logoutUser.mutate()}>Logout</button>
            </nav>
            <Outlet />
        </>
    );
}
