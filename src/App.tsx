import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/Utils.css";

import NotificationList from "./features/notifications/components/NotificationList";

import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import ResetPassword from "./routes/auth/ResetPassword";
import RouteGuard from "./layouts/route-guard/RouteGuard";
import ProtectedLayout from "./layouts/protected-layout/ProtectedLayout";
import AppNavigation from "./layouts/app-navigation/AppNavigation";

const Dashboard = lazy(() => import("./routes/protected/Dashboard"));
const Profile = lazy(() => import("./routes/protected/Profile"));

function App() {
    return (
        <div id="app">
            <Routes>
                {/* Public Routes */}
                <Route element={<RouteGuard isProtected={false} />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<RouteGuard isProtected={true} />}>
                    <Route element={<AppNavigation />}>
                        <Route element={<ProtectedLayout />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="/*" element={<h1>404</h1>} />
            </Routes>
            <NotificationList />
        </div>
    );
}

export default App;
