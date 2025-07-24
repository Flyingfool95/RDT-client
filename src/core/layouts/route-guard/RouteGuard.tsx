import { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthCheckQuery } from "./useAuthCheckQuery";
import Loader from "../../features/loader/Loader";

export default function RouteGuard({ isProtected }: { isProtected: boolean }) {
    const publicOnlyPaths = ["/login", "/register"];
    const location = useLocation();

    const { data: user, isError } = useAuthCheckQuery();

    if (isError && isProtected) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user && publicOnlyPaths.includes(location.pathname)) {
        return <Navigate to="/" replace />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    );
}
