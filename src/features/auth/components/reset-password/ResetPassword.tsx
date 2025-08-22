import { Link, useSearchParams } from "react-router";
import ResetPasswordForm from "./ResetPasswordForm";
import SendResetEmailForm from "./SendResetPasswordEmail";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const Form = !token ? <SendResetEmailForm /> : <ResetPasswordForm token={token} />;

    return (
        <>
            {Form}
            <div className="form-links">
                <Link to={"/login"}>Login here!</Link>
            </div>
        </>
    );
}
