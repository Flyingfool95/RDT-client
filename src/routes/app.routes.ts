import Dashboard from "../features/dashboard/components/Dashboard";
import Profile from "../features/profile/components/Profile";
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
