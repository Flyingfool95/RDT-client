import useLogin from "../hooks/useLogin";

export default function Login() {
    const { loginUser } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser();
    };

    return (
        <div>
            <h1>Login</h1>
            <Form handleSubmit={handleSubmit} />
        </div>
    );
}

function Form({ handleSubmit }: { handleSubmit: (e: React.FormEvent) => void }) {
    return (
        <form onSubmit={handleSubmit}>
            <h2>My form...</h2>
        </form>
    );
}
