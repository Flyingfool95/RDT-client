import styles from "../Profile.module.css";
import defaultProfileImage from "../../../assets/RDT_logo.png";
import { arrayToBlobUrl } from "../../../helpers/arrayToBlobURL.helper";
import optimizeImage from "../../../helpers/optimizeImage.helper";
import type { ProfileFormDataType } from "../types";

type ProfileImageInputProps = {
    existingImage?: Uint8Array;
    formData: ProfileFormDataType;
    setFormData: any;
    previewURL: string;
    setPreviewURL: any;
};

export default function ProfileImageInput({
    existingImage,
    formData,
    setFormData,
    previewURL,
    setPreviewURL,
}: ProfileImageInputProps) {
    const profileImage = existingImage ? arrayToBlobUrl(existingImage) : defaultProfileImage;

    async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const image = e.target.files?.[0];
        if (!image) return;
        setPreviewURL(URL.createObjectURL(image));
        const optimized = await optimizeImage(image);
        setFormData({ ...formData, image: optimized });
    }

    return (
        <div className={styles.imageInput}>
            <label htmlFor="profile-image">
                Profile Image
                <input type="file" name="profile-image" id="profile-image" onChange={handleImageSelect} />
            </label>
            <img src={previewURL || profileImage} alt="Profile" />
        </div>
    );
}
