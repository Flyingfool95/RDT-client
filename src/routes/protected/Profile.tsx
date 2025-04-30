import useAuth from "../../features/auth/hooks/useAuth";
import Image from "../../features/profile/components/Image";
import Details from "../../features/profile/components/Details";
import Modal from "../../features/shared/components/Modal";

export default function Profile() {
    const { deleteUser } = useAuth();

    return (
        <main>
            <h1>Profile</h1>
            <Image />
            <Details />
            <Modal buttonContent="Delete Profile">
                <button onClick={() => deleteUser.mutate()}>Delete my account</button>
            </Modal>
        </main>
    );
}
