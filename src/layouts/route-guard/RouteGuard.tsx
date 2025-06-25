import { Suspense, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../../features/auth/useAuthStore";
import { customFetch } from "../../features/shared/utils/customFetch";
import { convertPixelDataToImage } from "../../features/shared/utils/helpers";
import Loader from "../../features/loader/Loader";

export default function RouteGuard({ isProtected }: { isProtected: boolean }) {
    const publicOnlyPaths = ["/login", "/register"];
    const location = useLocation();
    const { user, setUser, isAuthChecked, setIsAuthChecked } = useAuthStore((state) => state);

    const handleCheckAuth = async () => {
        try {
            const result: any = await customFetch(`/api/v1/auth/auth-check`, "GET", true);

            setUser({
                id: result.data.user.id,
                name: result.data.user.name,
                email: result.data.user.email,
                image: await convertPixelDataToImage(result.data.user.image),
            });
        } catch (error) {
            setUser(undefined);
        } finally {
            setIsAuthChecked(true);
        }
    };

    useEffect(() => {
        /* Strict mode will double run this so looks like a bug when missing access token */
        if (!isAuthChecked) {
            handleCheckAuth();
        }
    }, [isAuthChecked]);

    if (!isAuthChecked) {
        return <Loader />;
    }

    if (isProtected && !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isProtected && user && publicOnlyPaths.includes(location.pathname)) {
        return <Navigate to="/" replace />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    );
}
