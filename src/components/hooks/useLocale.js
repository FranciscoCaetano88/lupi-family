import locale from '../../assets/locale/pt-PT.json';

// TODO: fake object
const locales = {
    'pt-PT': locale,
};

let lang = 'pt-PT';

export const useLocale = () => {
    return locales[lang];
};

export const setLanguage = (language) => {
    lang = language;
};
