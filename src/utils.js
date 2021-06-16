import { saveAs } from 'file-saver';

export function parseText(string, splitter, transform) {
    return string
        .split(splitter)
        .filter((s) => s)
        .map((s) => (splitter.test(s) ? transform(s) : s));
}

export function getCurrentDate() {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = today.getFullYear();

    return { day, month, year };
}

export function downloadJson(json, name) {
    const snapshot = JSON.stringify(json);

    const MIME_TYPE = 'application/json';
    const blob = new Blob([snapshot], {
        type: MIME_TYPE,
    });

    saveAs(blob, name);
}

export function sortAlphabetically(a, b) {
    if (a.name < b.name) {
        return -1;
    }

    if (a.name > b.name) {
        return 1;
    }

    return 0;
}
