import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import useLanguage from '../../app/hooks/use-language';
import './style.css';

function BasketTool({ sum = 0, amount = 0, onOpen = () => {} }) {
  const cn = bem('BasketTool');
  const { language, translate } = useLanguage();

  const getTotal = (amount, lang) => {
    if (!amount) return translate('main.basket.basketTool.empty');

    const products = (lang === 'eu')
      ? plural(amount, { one: 'product', other: 'products' }, 'eu-EU')
      : plural(amount, { one: 'товар', few: 'товара', many: 'товаров' })

    return `${amount} ${products} / ${numberFormat(sum)} ₽`
  }
  
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate('main.basket.basketTool.title')}:</span>
      <span className={cn('total')}>
        {getTotal(amount, language)}
      </span>
      <button onClick={onOpen}>{translate('main.basket.basketTool.goButton')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
