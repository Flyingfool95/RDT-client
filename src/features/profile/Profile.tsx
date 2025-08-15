import styles from "./Profile.module.css";
import ProfileImageInput from "./components/ProfileImageInput";
import useAuthCheck from "../auth/hooks/useAuthCheck";
import useUpdateProfile from "./hooks/useUpdateProfile";
import DeleteProfileImage from "./components/DeleteProfileImage";

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
        password,
        setPassword,
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

                <label
                    htmlFor="email"
                    className={formErrors?.some((error) => error.path === "email") ? "input-error" : ""}
                >
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={data?.email}
                        onChange={(e) => setEmail(e.target.value === "" ? null : e.target.value)}
                    />
                </label>
                <label
                    htmlFor="name"
                    className={formErrors?.some((error) => error.path === "name") ? "input-error" : ""}
                >
                    Name
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={data?.name}
                        onChange={(e) => setName(e.target.value === "" ? null : e.target.value)}
                    />
                </label>

                <div className={styles.formButtons}>
                    <input
                        type="submit"
                        value="Save Changes"
                        disabled={email === null && name === null && image === null}
                    />

                    <button
                        type="button"
                        onClick={resetForm}
                        disabled={email === null && name === null && image === null}
                    >
                        Cancel Changes
                    </button>
                </div>
                {formErrors && formErrors.map((error) => <p key={error.message}>{error.message}</p>)}
                {data.image !== "" && <DeleteProfileImage />}
            </form>
        </>
    );
}
