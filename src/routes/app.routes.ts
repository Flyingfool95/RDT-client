import Dashboard from "../features/dashboard/pages/Dashboard";
import Profile from "../features/profile/pages/Profile";
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
