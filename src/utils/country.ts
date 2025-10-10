import { allCountries, CountryGroup } from '@/constants/countries';
import { cca2Tocca3, cca2ToEmoji } from '@/utils';

type TCountry = {
  abbr: string;
  /**
   * ### Country Code Alpha 2
   *
   * 2-letter country codes based on ISO 3166-1
   *
   * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   *
   * @example
   *
   * ```ts
   * const cca2 = 'US';
   * const cca3 = cca2Tocca3(cca2); // USA
   * const icon = cca2ToEmoji(cca2); // 🇺🇸
   * ```
   */
  cca2?: string;
  /**
   * ### Country Code Alpha 3
   *
   * 3-letter country codes based on ISO 3166-1
   *
   * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
   *
   * @example
   *
   * ```ts
   * const cca3 = 'USA';
   * const cca2 = cca3Tocca2(cca3); // US
   * const icon = cca3ToEmoji(cca3); // 🇺🇸
   * ```
   */
  cca3?: string;
  code: string;
  icon: string;
  name: string;
  groupBy?: CountryGroup[];
};

export class Country {
  countries: TCountry[] = [];

  countryByDialCode = new Map<string, TCountry>();

  countryByCca2 = new Map<string, TCountry>();

  countryByCca3 = new Map<string, TCountry>();

  constructor() {
    this.countries = allCountries.map<TCountry>((c) => {
      const _c = {
        ...c,
        cca2: c.abbr.toUpperCase(),
        cca3: cca2Tocca3(c.abbr),
        icon: cca2ToEmoji(c.abbr)
      };
      this.countryByDialCode.set(c.code, _c);
      this.countryByCca2.set(c.abbr.toLowerCase(), _c);
      this.countryByCca3.set(_c.cca3.toLowerCase(), _c);
      return _c;
    });
  }

  groupedCountries() {
    return [...this.countries].sort((a, b) => {
      if (a.groupBy?.includes(CountryGroup.ACTIVE) && !b.groupBy?.includes(CountryGroup.ACTIVE)) {
        return -1;
      }
      if (!a.groupBy?.includes(CountryGroup.ACTIVE) && b.groupBy?.includes(CountryGroup.ACTIVE)) {
        return 1;
      }
      return 0;
    });
  }

  getCountryByDialCode(code: string) {
    return this.countryByDialCode.get(code);
  }

  getCountryByCca2(cca2: string) {
    return this.countryByCca2.get(cca2.toLowerCase());
  }

  getCountryByCca3(cca3: string) {
    return this.countryByCca3.get(cca3.toLowerCase());
  }

  getAllCountriesByOptions(): Array<TOption> {
    return allCountries.map((el) => ({
      value: el.name,
      label: el.name
    }));
  }
}

const CountryInstance = new Country();

export default CountryInstance;
