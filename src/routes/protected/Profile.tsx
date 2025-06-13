import "../styles/Profile.css";
import useAuth from "../../features/auth/hooks/useAuth";
import useModalStore from "../../features/shared/store/useModalStore";
import ProfileDetails from "../../features/profile/components/ProfileDetails";
import Modal from "../../features/shared/components/Modal";

export default function Profile() {
    return (
        <>
            <ProfileDetails />
            <Modal triggerText="Delete Profile" triggerType="button" triggerClass="button-delete">
                <DeleteProfile />
            </Modal>
        </>
    );
}

function DeleteProfile() {
    const { deleteUser } = useAuth();
    const { setShowModal } = useModalStore((state) => state);

    return (
        <div className="delete-profile-container">
            <p>Sure you want to delete your profile?</p>
            <button onClick={() => deleteUser.mutate()} className="button-delete">
                Delete
            </button>
            <button className="button-secondary" onClick={() => setShowModal(false)}>
                Cancel
            </button>
        </div>
    );
}
