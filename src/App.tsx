import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import useAuthCheck from "./features/auth/hooks/useAuthCheck";

function App() {
    const { isLoading } = useAuthCheck();

    if (isLoading) return <h1>Loading...</h1>;

    return <RouterProvider router={router} />;
}

export default App;
