import { z } from "zod";

export const updateImageSchema = z.instanceof(Blob).refine((file) => file.type.startsWith("image/"), {
    message: "File must be an image",
});
