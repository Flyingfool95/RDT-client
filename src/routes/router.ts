import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth.routes";
import { notFoundRoutes } from "./notFound.routes";
import { appRoutes } from "./app.routes";

export const router = createBrowserRouter([...authRoutes, ...appRoutes, ...notFoundRoutes]);
