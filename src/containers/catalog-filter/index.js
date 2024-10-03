import { memo, useCallback, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  const callbacks = {
    // Фильтрация
    onFilter: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: t('filter.category.order') },
        { value: 'title.ru', title: t('filter.category.name') },
        { value: '-price', title: t('filter.category.price') },
        { value: 'edition', title: t('filter.category.age') },
      ],
      [t],
    ),
    categories: useMemo(
      () => {
        const group = Object.groupBy(select.categories, (item) =>  item.parent ? item.parent._id : 0);
        const { [0]: parents, ...items } = group;
    
        const getFilter = (parents, count = 0) => {
          return parents?.reduce((acc, el) => {
            const array = Array.from({ length: count }).map(_ => '-');
            const item = { value: el._id, title: `${array.join(' ')} ${el.title}`.trim() };
    
            return [
              ...acc,
              item,
              ...((items[el._id]) ? getFilter(items[el._id], count + 1) : []),
            ];
          }, []);
        }
        return [{ value: '', title: 'Все' }, ...getFilter(parents) ?? []];
      },
      [select.categories]
    ),
  };

  return (
    <SideLayout padding="medium">
      {
        options.categories
          ? <Select options={options.categories} value={select.category} onChange={callbacks.onFilter}/>
          : <></>
      }
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={t('filter.search')}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
