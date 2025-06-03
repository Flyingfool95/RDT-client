import useAuth from "../../features/auth/hooks/useAuth";
import ProfileDetails from "../../features/profile/components/ProfileDetails";
import Modal from "../../features/shared/components/Modal";

export default function Profile() {
    const { deleteUser } = useAuth();

    return (
        <main className="profile">
            <h1>Profile</h1>
            <ProfileDetails />
            <Modal buttonContent="Delete Profile">
                <button onClick={() => deleteUser.mutate()}>Delete my account</button>
            </Modal>
        </main>
    );
}
