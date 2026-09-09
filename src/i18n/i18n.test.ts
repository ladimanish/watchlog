import i18next, { changeAppLocale, isAppLocale } from './index';

describe('i18n', () => {
  afterEach(async () => {
    await changeAppLocale('en');
  });

  it('identifies supported locales', () => {
    expect(isAppLocale('en')).toBe(true);
    expect(isAppLocale('es')).toBe(true);
    expect(isAppLocale('fr')).toBe(false);
  });

  it('returns English strings by default', () => {
    expect(i18next.t('nav.home', { ns: 'common' })).toBe('Home');
  });

  it('switches to Spanish translations', async () => {
    await changeAppLocale('es');

    expect(i18next.t('nav.home', { ns: 'common' })).toBe('Inicio');
    expect(i18next.t('search.title', { ns: 'views' })).toBe(
      'Descubre algo nuevo',
    );
  });
});
