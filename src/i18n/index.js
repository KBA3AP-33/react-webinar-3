import * as translations from './translations';

class I18nService {
    constructor(services, config = {}) {
        this.services = services;
        this.config = config;
        this.currentLang = config.lang;
        this.listeners = [];
    }

    subscribe(callback) {
        this.listeners.push(callback);

        return () => {
            this.listeners = this.listeners.filter(item => item !== callback);
        };
    }

    translate(lang, text, plural) {
        let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;
      
        if (typeof plural !== 'undefined') {
            const key = new Intl.PluralRules(lang).select(plural);
            if (key in result) {
                result = result[key];
            }
        }
      
        return result;
    }

    setLang(lang) {
        this.currentLang = lang;
        this.services.api.setHeader(this.config.langHeader, lang);
        for (const listener of this.listeners) listener(this.currentLang);
    }
  }
  
  export default I18nService;
  