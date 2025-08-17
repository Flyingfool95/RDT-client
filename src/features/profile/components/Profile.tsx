import { checkFormErrors } from "../../../helpers/form.helpers";
import useAuthCheck from "../../auth/hooks/useAuthCheck";
import useUpdateProfile from "../hooks/useUpdateProfile";
import styles from "../styles/profile.module.css";
import ProfileImageInput from "./ProfileImageInput";

export default function Profile() {
    const { data } = useAuthCheck() as any;
    const {
        formRef,
        email,
        setEmail,
        name,
        setName,
        image,
        setImage,
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        formErrors,
        imagePreviewURL,
        setImagePreviewURL,
        resetForm,
        handleSubmit,
    } = useUpdateProfile();

    return (
        <>
            <h1>Profile</h1>
            <form onSubmit={(e) => handleSubmit(e)} ref={formRef} className={styles.profileForm}>
                <ProfileImageInput
                    currentImage={data?.image}
                    setImage={setImage}
                    imagePreviewURL={imagePreviewURL}
                    setImagePreviewURL={setImagePreviewURL}
                />

                <label htmlFor="email" className={checkFormErrors(formErrors, "email") ? "input-error" : ""}>
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={data?.email}
                        onChange={(e) => setEmail(e.target.value === "" ? null : e.target.value)}
                    />
                </label>
                <label htmlFor="name" className={checkFormErrors(formErrors, "name") ? "input-error" : ""}>
                    Name
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={data?.name}
                        onChange={(e) => setName(e.target.value === "" ? null : e.target.value)}
                    />
                </label>
                <label
                    htmlFor="current-password"
                    className={checkFormErrors(formErrors, "currentPassword") ? "input-error" : ""}
                >
                    Current Password
                    <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        onChange={(e) => setCurrentPassword(e.target.value === "" ? null : e.target.value)}
                    />
                </label>
                <label
                    htmlFor="new-password"
                    className={checkFormErrors(formErrors, "newPassword") ? "input-error" : ""}
                >
                    New Password
                    <input
                        type="text"
                        name="new-password"
                        id="new-password"
                        onChange={(e) => setNewPassword(e.target.value === "" ? null : e.target.value)}
                    />
                </label>

                <div className={styles.formButtons}>
                    <input
                        type="submit"
                        value="Save Changes"
                        disabled={!email && !name && !image && !currentPassword && !newPassword}
                    />

                    <button
                        type="button"
                        onClick={resetForm}
                        disabled={!email && !name && !image && !currentPassword && !newPassword}
                    >
                        Cancel Changes
                    </button>
                </div>
                {checkFormErrors(formErrors) && <p>{formErrors?.map((err) => err.message).join(", ")}</p>}
            </form>
        </>
    );
}
