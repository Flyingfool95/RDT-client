import { useRef } from "react";
import styles from "../Profile.module.css";
import defaultProfileImage from "../../../assets/RDT_logo.png";
import { arrayToBlobUrl } from "../../../helpers/arrayToBlobURL.helper";
import optimizeImage from "../../../helpers/optimizeImage.helper";

type ProfileImageInputProps = {
    existingImage?: Uint8Array;
    onImageChange: (optimizedImage: File | string) => void;
    previewURL: string;
    setPreviewURL: any;
};

export default function ProfileImageInput({
    existingImage,
    onImageChange,
    previewURL,
    setPreviewURL,
}: ProfileImageInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const profileImage = existingImage ? arrayToBlobUrl(existingImage) : defaultProfileImage;

    async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const image = e.target.files?.[0];
        if (!image) return;
        setPreviewURL(URL.createObjectURL(image));
        const optimized = await optimizeImage(image);
        onImageChange(optimized);
    }

    return (
        <div className={styles.imageInput}>
            <label htmlFor="profile-image">
                Profile Image
                <input
                    ref={fileInputRef}
                    type="file"
                    name="profile-image"
                    id="profile-image"
                    onChange={handleImageSelect}
                />
            </label>
            <img src={previewURL || profileImage} alt="Profile" />
        </div>
    );
}
