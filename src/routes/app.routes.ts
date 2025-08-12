import Dashboard from "../features/dashboard/Dashboard";
import Profile from "../features/profile/Profile";
import AppLayout from "../layouts/AppLayout";

export const appRoutes = [
    {
        Component: AppLayout,
        children: [
            {
                path: "/",
                Component: Dashboard,
            },
            {
                path: "profile",
                Component: Profile,
            },
        ],
    },
];
