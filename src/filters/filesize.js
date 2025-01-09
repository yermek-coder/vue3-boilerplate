const MAGNITUDES = [
    { size: 1024 * 1024 * 1024, ext: "GB" },
    { size: 1024 * 1024, ext: "MB" },
    { size: 1024, ext: "KB" }
];

export default function (size) {
    for (let i = 0; i < MAGNITUDES.length; i++) {
        if (size > MAGNITUDES[i].size) {
            return Math.floor(size / MAGNITUDES[i].size) + " " + MAGNITUDES[i].ext;
        }
    }

    return size + " B";
}
