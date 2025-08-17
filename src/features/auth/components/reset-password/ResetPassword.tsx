import { Link, useSearchParams } from "react-router";
import ResetPasswordForm from "./ResetPasswordForm";
import SendResetEmailForm from "./SendResetEmail";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    return (
        <>
            {!token ? <SendResetEmailForm /> : <ResetPasswordForm token={token} />}
            <div className="form-links">
                <Link to={"/login"}>Login here!</Link>
            </div>
        </>
    );
}
