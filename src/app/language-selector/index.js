import { memo, useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Radio from '../../components/radio';

function LanguageSelector() {
  const cn = bem('Language-selector');

  const store = useStore();
  const select = useSelector(state => ({
    language: state.language.language,
    languages: state.language.languages,
  }));
  
  const [lang, setLang] = useState(select.language);
  useEffect(() => { store.actions.language.changeLanguage(lang) }, [lang]);

  return (
    <div className={cn()}>
      <Radio
        name="languages"
        list={select.languages}
        select={lang}
        onChange={(e) => setLang(e.target.value)}/>
    </div>
  );
}

export default memo(LanguageSelector);
