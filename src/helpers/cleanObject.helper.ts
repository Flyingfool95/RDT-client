export default function cleanObject(obj: Record<string, any>) {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === null) {
            delete obj[key];
        }
    });
    return obj;
}
