import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Input from '../../components/input';
import './style.css';

function Head({ title }) {
  const cn = bem('Head');

  const store = useStore();
  const select = useSelector(state => ({
    language: state.language.language,
    languages: state.language.languages,
  }));
  
  const [lang, setLang] = useState(select.language);
  useEffect(() => { store.actions.language.changeLanguage(lang) }, [lang]);
  
  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <div className={cn('languages')}>
        {
          select.languages.map(language =>
            <Input
              id={language.value}
              name="languages"
              key={language.title}
              type="radio"
              title={language.title}
              value={language.value}
              onChange={(e) => setLang(e.target.value)}
              checked={lang === language.value}
              hidden/>)
        }
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
