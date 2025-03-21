import { useState } from "react";
import useAuth from "../../features/auth/hooks/useAuth";
import useAuthStore from "../../features/auth/store/useAuthStore";

export default function Profile() {
    const { user } = useAuthStore((state) => state);

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [currentPassword, setCurrentPassword] = useState<string | undefined>(undefined);
    const [newPassword, setNewPassword] = useState<string | undefined>(undefined);

    const { deleteUser, updateUser } = useAuth();

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
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label htmlFor="current-password">Current Password</label>
                <input
                    type="text"
                    name="current-password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                />
                <label htmlFor="new-password">New Password</label>
                <input
                    type="text"
                    name="new-password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                />
                <input type="submit" value="Update" />
            </form>
            <button onClick={() => deleteUser.mutate()}>Delete my account</button>
        </main>
    );
}
