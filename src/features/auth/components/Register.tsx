import { checkFormErrors } from "../../../helpers/form.helpers";
import useRegister from "../hooks/useRegister";
import { Link } from "react-router";

export default function Register() {
    const { setEmail, setPassword, setConfirmPassword, handleSubmit, formErrors } = useRegister();

    return (
        <>
            <h1>Register account</h1>
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
                <label className={checkFormErrors(formErrors, "password") ? "input-error" : ""}>
                    Password
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label className={checkFormErrors(formErrors, "confirmePassword") ? "input-error" : ""}>
                    Confirm Password
                    <input
                        type="text"
                        name="confirm-password"
                        id="confirm-password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <input type="submit" value="Register" />
                {checkFormErrors(formErrors) && <p>{formErrors?.map((err) => err.message).join(", ")}</p>}
            </form>
            <div className="form-links">
                <Link to={"/login"}>Login here!</Link>
                {checkFormErrors(formErrors) && <Link to={"/reset-password"}>Reset password</Link>}
            </div>
        </>
    );
}
