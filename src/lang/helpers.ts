import en from './locale/en';

export function t(localizationId: keyof typeof en, ...inserts: (string | number)[]): string {
  let localeStr = en[localizationId] ?? localizationId;

  if (inserts.length > 0) {
    inserts.forEach((arg, index) => {
      localeStr = localeStr.replace(
        new RegExp(`\\{${index}\\}`, 'g'),
        String(arg)
      ) as (typeof en)[typeof localizationId];
    });
  }

  return localeStr;
}
