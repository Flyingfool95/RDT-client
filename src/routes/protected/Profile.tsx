import { useEffect, useState } from "react";
import useAuth from "../../features/auth/hooks/useAuth";
import useAuthStore from "../../features/auth/store/useAuthStore";

export default function Profile() {
    const { user } = useAuthStore((state) => state);

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [currentPassword, setCurrentPassword] = useState<string | undefined>(undefined);
    const [newPassword, setNewPassword] = useState<string | undefined>(undefined);

    const { deleteUser, updateUser } = useAuth();

    useEffect(() => {
        if (currentPassword === "") {
            setCurrentPassword(undefined);
        }
        if (newPassword === "") {
            setNewPassword(undefined);
        }
    }, [currentPassword, newPassword]);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateUser.mutate({
            name,
            email,
            currentPassword,
            newPassword,
        });
    };

    return (
        <main>
            <h1>Profile</h1>
            <form onSubmit={(e) => handleUpdate(e)}>
                <label
                    htmlFor="name"
                    className={updateUser.error?.message.toLowerCase().includes("name") ? "zod-error" : ""}
                >
                    Name
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                </label>
                <label
                    htmlFor="email"
                    className={updateUser.error?.message.toLowerCase().includes("email") ? "zod-error" : ""}
                >
                    Email
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>
                <label
                    htmlFor="current-password"
                    className={updateUser.error?.message.toLowerCase().includes("password") ? "zod-error" : ""}
                >
                    Current Password
                    <input
                        type="text"
                        name="current-password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                    />
                </label>
                <label
                    htmlFor="new-password"
                    className={updateUser.error?.message.toLowerCase().includes("password") ? "zod-error" : ""}
                >
                    New Password
                    <input
                        type="text"
                        name="new-password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                    />
                </label>
                <input type="submit" value="Update" />
            </form>
            <button onClick={() => deleteUser.mutate()}>Delete my account</button>
        </main>
    );
}
