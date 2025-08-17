import { checkFormErrors } from "../../../helpers/form.helpers";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router";

export default function Login() {
    const { handleSubmit, setEmail, setPassword, formErrors } = useLogin();

    return (
        <>
            <h1>Welcome to RDT</h1>
            <form onSubmit={handleSubmit}>
                <label
                    className={checkFormErrors(formErrors, "email") || checkFormErrors(formErrors) ? "input-error" : ""}
                >
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
                <label
                    className={
                        checkFormErrors(formErrors) && !checkFormErrors(formErrors, "email") ? "input-error" : ""
                    }
                >
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

                {checkFormErrors(formErrors) && <p>{formErrors?.map((err) => err.message).join(", ")}</p>}
            </form>
            <div className="form-links">
                <Link to={"/register"}>Register new account!</Link>
                {formErrors && formErrors.length > 0 && <Link to={"/reset-password"}>Reset password</Link>}
            </div>
        </>
    );
}
