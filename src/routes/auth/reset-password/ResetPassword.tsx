import ResetPasswordForm from "../../../core/features/auth/components/reset-password-form/ResetPasswordForm";
import SendResetEmailForm from "../../../core/features/auth/components/send-reset-password-email-form/SendResetPasswordEmailForm";
import "./ResetPassword.css";
import { useLocation } from "react-router-dom";

export default function ResetPassword() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const token = queryParams.get("token");

    return (
        <main className="reset-password">
            {token ? <ResetPasswordForm token={token as string} /> : <SendResetEmailForm />}
        </main>
    );
}
