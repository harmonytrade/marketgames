import { en } from './locales/en';
import { ru } from './locales/ru';

export type AppLocale = 'ru' | 'en';

interface TranslationTree {
  [key: string]: string | TranslationTree;
}
type InterpolationValue = string | number;
type InterpolationParams = Record<string, InterpolationValue>;

const dictionaries: Record<AppLocale, TranslationTree> = {
  ru,
  en,
};

const getValueByPath = (dictionary: TranslationTree, path: string): string | undefined => {
  const segments = path.split('.');
  let current: string | TranslationTree | undefined = dictionary;

  for (const segment of segments) {
    if (!current || typeof current === 'string') {
      return undefined;
    }

    current = current[segment];
  }

  return typeof current === 'string' ? current : undefined;
};

const interpolate = (template: string, params?: InterpolationParams) => {
  if (!params) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`,
  );
};

export const resolveLocale = (
  ...candidates: Array<string | null | undefined>
): AppLocale => {
  for (const candidate of candidates) {
    const normalized = candidate?.toLowerCase();

    if (!normalized) {
      continue;
    }

    if (normalized.startsWith('ru')) {
      return 'ru';
    }

    if (normalized.startsWith('en')) {
      return 'en';
    }
  }

  return 'ru';
};

export const createTranslator = (locale: AppLocale) => {
  const dictionary = dictionaries[locale] ?? dictionaries.ru;

  return (path: string, params?: InterpolationParams) => {
    const template =
      getValueByPath(dictionary, path) ??
      getValueByPath(dictionaries.ru, path) ??
      path;

    return interpolate(template, params);
  };
};

export type Translator = ReturnType<typeof createTranslator>;
