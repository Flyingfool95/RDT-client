import useAuth from "../../features/auth/hooks/useAuth";

export default function Profile() {
    const { deleteUser } = useAuth();

    return (
        <main>
            <h1>Profile</h1>
            <button onClick={() => deleteUser.mutate()}>Delete my account</button>
        </main>
    );
}
