import { useLocation } from "react-router-dom";
import ResetPasswordForm from "../../features/auth/components/ResetPasswordForm";
import SendResetEmailForm from "../../features/auth/components/SendResetPasswordEmailForm";

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
