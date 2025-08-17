import styles from "../styles/profile.module.css";
import defaultProfileImage from "../../../assets/RDT_logo.png";
import optimizeImage, { arrayToBlobUrl } from "../../../helpers/image.helpers";
import DeleteProfileImage from "./DeleteProfileImage";

type ProfileImageInputProps = {
    currentImage: Uint8Array | undefined;
    setImage: any;
    imagePreviewURL: string | null;
    setImagePreviewURL: any;
};

export default function ProfileImageInput({
    currentImage,
    setImage,
    imagePreviewURL,
    setImagePreviewURL,
}: ProfileImageInputProps) {
    const profileImage = currentImage ? arrayToBlobUrl(currentImage) : defaultProfileImage;

    async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const image = e.target.files?.[0];
        if (!image) return;
        setImagePreviewURL(URL.createObjectURL(image));
        const optimized = await optimizeImage(image);
        setImage(optimized);
    }

    return (
        <div className={styles.imageInput}>
            <label htmlFor="profile-image">
                Profile Image
                <input type="file" name="profile-image" id="profile-image" onChange={handleImageSelect} />
            </label>

            <img src={imagePreviewURL || profileImage} alt="Profile" />
            {currentImage && <DeleteProfileImage />}
        </div>
    );
}
