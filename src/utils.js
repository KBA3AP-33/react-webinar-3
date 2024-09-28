/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export const updateObject = (old, next) => {
  const array = Object.entries(next);
  const oldCopy = JSON.parse(JSON.stringify(old));

  for (let i = 0; i < array.length; i++) {
      oldCopy[array[i][0]] = (typeof(array[i][1]) === 'object' && typeof(oldCopy[array[i][0]]) === 'object')
          ? updateObject(oldCopy[array[i][0]], array[i][1])
          : array[i][1];
  }
  return oldCopy;
}

export const getProperty = (obj, key) => {
  const array = key.split(".");
  const [ first, ...items ] = array;
  return (items.length) ? getProperty(obj[first], items.join('.')) : obj[first];
}

export function getPagination(params) {
  const pagination = getPages(params);
  return Object.entries(pagination).reduce((acc, el, i, s) => {
      acc = [...acc, el];
      if (i + 1 !== s.length && Number(el[0]) + 1 !== Number(s[i + 1][0])) {
          acc.push(['...', null]);
      }
      return acc;
  }, []);
}

function getPages(params) {
  if (params.last <= 5) {
    const result = {};
    Array.from({ length: params.last })
        .forEach((_, i) => result[i + 1] = (i + 1) === params.current);
    return result;
  }

  const pages = {
      [params.current - 1]: false,
      [params.current]: true,
      [params.current + 1]: false,
  }

  if (params.current === params.first) {
      const { [0]: _, ...items } = pages;
      return { [params.first]: true, [params.current + 2]: false, ...items, [params.last]: false };
  } else if (params.current === params.last) {
      const { [params.last + 1]: _, ...items } = pages;
      return { [params.first]: false, [params.current - 2]: false, ...items, [params.last]: true };
  }
  return { [params.first]: false, ...pages, [params.last]: false };
}
