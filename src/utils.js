export function parseText(string, splitter, transform) {
    return string
        .split(splitter)
        .filter((s) => s)
        .map((s) => (splitter.test(s) ? transform(s) : s));
}
