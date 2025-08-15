export default function cleanObject(obj: Record<string, any>) {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === null) {
            delete obj[key];
        }
    });
    return obj;
}

export function objectToFormData(obj: Record<string, any>): FormData {
    const fd = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
        if (value instanceof File || value instanceof Blob) {
            fd.append(key, value);
        } else if (typeof value === "object" && value !== null) {
            // Serialize arrays/objects as JSON
            fd.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
            fd.append(key, String(value));
        }
    });

    return fd;
}
