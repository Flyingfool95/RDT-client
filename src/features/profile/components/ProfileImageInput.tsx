import styles from "../styles/profileImageInput.module.css";
import defaultProfileImage from "../../../assets/RDT_logo.png";
import optimizeImage, { arrayToBlobUrl } from "../../../helpers/image.helpers";
import DeleteProfileImage from "./DeleteProfileImage";
import { useState } from "react";

type ProfileImageInputProps = {
    currentImage: Uint8Array | null | undefined;
    setImage: React.Dispatch<React.SetStateAction<File | Blob | null>>;
    imagePreviewURL: string | null;
    setImagePreviewURL: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function ProfileImageInput({
    currentImage,
    setImage,
    imagePreviewURL,
    setImagePreviewURL,
}: ProfileImageInputProps) {
    const profileImage = currentImage ? arrayToBlobUrl(currentImage) : defaultProfileImage;

    const [fileError, setFileError] = useState<string | null>(null);

    async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const image = e.target.files?.[0];
        if (!image) return;
        try {
            const optimized = await optimizeImage(image);
            setFileError(null);
            setImage(optimized);
            setImagePreviewURL(URL.createObjectURL(image));
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error);
                setFileError(error.message);
            } else {
                console.log(error);
                setFileError(String(error));
            }
        }
    }

    return (
        <div className={styles.imageInput}>
            <label htmlFor="profile-image">
                Profile Image
                <input
                    type="file"
                    name="profile-image"
                    id="profile-image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageSelect}
                />
            </label>

            <img
                src={imagePreviewURL || profileImage}
                alt="Profile"
                className={fileError ? styles.fileInputError : ""}
            />
            {fileError && <p className={styles.fileErrorMessage}>{fileError}</p>}
            {currentImage && <DeleteProfileImage />}
        </div>
    );
}
