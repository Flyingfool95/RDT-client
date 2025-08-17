import useRegister from "../hooks/useRegister";
import { Link } from "react-router";

export default function Register() {
    const { setEmail, setPassword, setConfirmPassword, handleSubmit, formErrors } = useRegister();

    return (
        <>
            <h1>Register account</h1>
            <form onSubmit={handleSubmit}>
                <label className={formErrors && formErrors.length > 0 ? "input-error" : ""}>
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="my@email.com"
                        onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                    />
                </label>
                <label className={formErrors && formErrors.length > 0 ? "input-error" : ""}>
                    Password
                    <input type="text" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label className={formErrors && formErrors.length > 0 ? "input-error" : ""}>
                    Confirm Password
                    <input
                        type="text"
                        name="confirm-password"
                        id="confirm-password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <input type="submit" value="Register" />
            </form>
            <div className="form-links">
                <Link to={"/login"}>Login here!</Link>
            </div>
        </>
    );
}
