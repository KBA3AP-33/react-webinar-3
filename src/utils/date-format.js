export default function dateFormat(value, locale = 'ru-RU', options = {}) {
    const current = new Date(value);
    
    const date = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' })
        .format(current);

    const time = new Intl.DateTimeFormat(locale, { timeStyle: "short" })
        .format(current);

    return { day: `${date} ${current.getFullYear()}`, time };
}
