import { useEffect, useRef, useState } from "react";
import "../styles/Image.css";
import imageCompression from "browser-image-compression";
import useNotificationStore from "../../notifications/store/useNotificationStore";
import useProfile from "../hooks/useProfile";
import useAuthStore from "../../auth/store/useAuthStore";

function Image() {
    const profileImageRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const { addNotification } = useNotificationStore((state) => state);

    const { user, setUser } = useAuthStore((state) => state);

    const { updateImage } = useProfile();

    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    const displayImageUrl = imageUrl || user?.image || undefined;

    const handleUpload = async () => {
        if (!user) return;
        if (!profileImageRef.current || !profileImageRef.current.files?.[0]) {
            addNotification("Please add an image", "warning");
            return;
        }
        const image = profileImageRef.current.files[0];

        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 320,
            useWebWorker: true,
        };

        try {
            const compressedImage = await imageCompression(image, options);
            const blobUrl = URL.createObjectURL(compressedImage);
            setImageUrl(blobUrl);
            updateImage.mutate(compressedImage);

            setUser({
                id: user?.id,
                name: user?.name,
                email: user?.email,
                image: blobUrl,
            });
        } catch (error: any) {
            console.log(error.message);
            addNotification(error.message, "error");
        }
    };

    return (
        <div
            className="profile-image"
            style={{
                backgroundImage: displayImageUrl ? `url(${displayImageUrl})` : "none",
                height: "100px",
                width: "100px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid #ccc",
            }}
        >
            <label htmlFor="profile-image" className="update-label">
                Update image
            </label>
            <input
                type="file"
                name="profile-image"
                id="profile-image"
                accept=".jpg"
                ref={profileImageRef}
                onChange={handleUpload}
                className="visual-hide"
            />
        </div>
    );
}

export default Image;
