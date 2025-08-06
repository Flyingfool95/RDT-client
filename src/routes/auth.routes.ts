import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ResetPassword from "../features/auth/pages/ResetPassword";
import AuthLayout from "../layouts/AuthLayout";

export const authRoutes = [
    {
        path: "/login",
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: Login,
            },
        ],
    },
    {
        path: "/register",
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: Register,
            },
        ],
    },
    {
        path: "/reset-password",
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: ResetPassword,
            },
        ],
    },
];
