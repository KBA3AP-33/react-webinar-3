import StoreModule from '../module';
import ru from "../../languages/ru.json";
import { updateObject } from "../../utils";

class Language extends StoreModule {
    initState() {
        return {
            app: ru,
            language: 'ru',
            languages: [
                { title: 'Русский', value: 'ru' },
                { title: 'English', value: 'eu' },
            ],
        };
    }

    async changeLanguage(lang) {
        const nextApp = await import(`../../languages/${lang}.json`);

        this.setState({
            ...this.getState(),
            app: {
                ...this.getState().app,
                ...updateObject(this.getState().app, nextApp.default),
            },
            language: lang,
        }, 'Язык изменен');
    }
}

export default Language;
