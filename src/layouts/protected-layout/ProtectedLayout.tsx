import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function ProtectedLayout() {
    const [pageHeading, setPageHeading] = useState("");

    const location = useLocation();

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
        <main className={`protected-layout ${pageHeading.toLowerCase()}`}>
            <h1>{pageHeading}</h1>
            <Outlet />
        </main>
    );
}
