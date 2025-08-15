import useLogin from "../hooks/useLogin";
import { Link } from "react-router";

export default function Login() {
    const { handleSubmit, isFormError, setEmail, setPassword } = useLogin();

    return (
        <>
            <h1>Welcome to RDT</h1>
            <form onSubmit={handleSubmit}>
                <label className={isFormError ? "input-error" : ""}>
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="my@email.com"
                        onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                        required
                    />
                </label>
                <label className={isFormError ? "input-error" : ""}>
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <input type="submit" value="Login" />

                {/* Make FormError component */}
                {isFormError && <p>{isFormError}</p>}
            </form>
            <div className="form-links">
                <Link to={"/register"}>Register new account!</Link>
                {isFormError && <Link to={"/reset-password"}>Reset password</Link>}
            </div>
        </>
    );
}
