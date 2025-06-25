import "./Profile.css";
import useAuth from "../../../features/auth/useAuth";
import useModalStore from "../../../features/shared/components/modal/useModalStore";
import ProfileDetails from "../../../features/profile/ProfileDetails";
import Modal from "../../../features/shared/components/modal/Modal";


export default function Profile() {
    return (
        <div className="profile">
            <ProfileDetails />
            <Modal triggerText="Delete Profile" triggerType="button" triggerClass="button-delete">
                <DeleteProfile />
            </Modal>
        </div>
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
