import "./ProtectedLayout.css";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../../features/auth/useAuthStore";

export default function ProtectedLayout() {
    const location = useLocation();
    const [pageHeading, setPageHeading] = useState("");
    const { user } = useAuthStore((state) => state);

    useEffect(() => {
        if (location.pathname === "/") {
            setPageHeading("Dashboard");
        } else {
            const formattedHeading = location.pathname
                .replace(/^\//, "")
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());

            setPageHeading(formattedHeading);
        }
        return () => {};
    }, [location]);

    return (
        <main className={`layout ${pageHeading.toLowerCase()}`}>
            <div className="layout-header">
                <h1>{pageHeading}</h1>
                {pageHeading !== "Profile" && (
                    <Link to="/profile">
                        <img src={user?.image} alt="Profile Image" />
                    </Link>
                )}
            </div>
            <Outlet />
        </main>
    );
}
