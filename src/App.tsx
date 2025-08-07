import { RouterProvider } from "react-router";
import { router } from "./routes/router";

function App() {
    /* Check if has token and authorize the token ot get valid user back (react query) */
    return <RouterProvider router={router} />;
}

export default App;
