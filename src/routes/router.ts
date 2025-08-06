import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth.routes";

export const router = createBrowserRouter([...authRoutes]);
