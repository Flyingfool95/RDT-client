import { Link } from "react-router";

export default function NotFound() {
    return (
        <div>
            <h1>404, not found...</h1>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
}
