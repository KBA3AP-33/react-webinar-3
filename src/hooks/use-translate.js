import { useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;

  const [lang, setLang] = useState(i18n.currentLang);
  useEffect(() => { return i18n.subscribe(setLang) }, [i18n]);

  return {
    lang,
    setLang: (lang) => i18n.setLang(lang),
    t: (text, number) => i18n.translate(lang, text, number),
  }
}
