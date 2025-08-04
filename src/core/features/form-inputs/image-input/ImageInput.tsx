import { useEffect, useState } from "react";
import "./ImageInput.css";
import { optimizeImage } from "../../shared/utils/helpers";

type WithImage = { image: string | null };

export default function ImageInput({ data }: { data: WithImage | null }) {
    const [imageFile, setImageFile] = useState<Blob | MediaSource | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(data?.image || null);

    useEffect(() => {
        if (!imageFile) return;

        setPreviewUrl(URL.createObjectURL(imageFile));

        return () => {
            if (!previewUrl) return;
            URL.revokeObjectURL(previewUrl);
        };
    }, [imageFile, previewUrl]);

    const handleInputUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            const optimizedImage = await optimizeImage(file);
            setImageFile(optimizedImage);
        } else {
            //Fix feedback to render in the ui instead
            alert("Only JPG or PNG files are allowed.");
            e.target.value = "";
        }
    };

    return (
        <div
            className="image-input"
            style={{
                backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
            }}
        >
            <label htmlFor="image" className="image-label">
                Image
            </label>
            <input
                type="file"
                name="image"
                id="image"
                accept="image/jpeg, image/png"
                onChange={(e) => handleInputUpdate(e)}
                className="visual-hide"
            />
        </div>
    );
}
