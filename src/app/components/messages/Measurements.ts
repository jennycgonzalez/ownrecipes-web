import { defineMessages, IntlShape } from 'react-intl';
import { LanguageCode } from '../../../account/store/settings/types';
import { optionallyFormatMessage } from '../../../common/utility';
import { createIntlInstance, getMessagesFromLang } from '../IntlProvider';

/**
 * Dynamically builds a list for all supported measurements.
 *
 * A measurement is "supported" if it has a intl-messageId for the LanguageCode.EN.
 *
 * *To add other measurements, you could simply add them to the lang-jsons.
 * But the clean way would be to add them to the defineMessages first, then run `npm run localize`.*
 *
 * @returns List of all supported mappings. You probably only need the keys.
 */
export function readSupportedMeasurements(): Record<string, string> {
  const res: Record<string, string> = {};

  const enMessages = getMessagesFromLang(LanguageCode.EN);
  Object.keys(enMessages).forEach(m => {
    const msrmnt = enMessages[m];
    if (m.startsWith('measurement.')) {
      const key = m.substring(12).toLocaleLowerCase();
      res[key] = msrmnt;
    }
  });

  return res;
}

function buildMeasurementsParserForLangs(SupportedMeasurementsList: Record<string, string>, usrIntl: IntlShape, intls: Array<IntlShape>): Record<string, string> {
  const res: Record<string, string> = {};
  const allIntls = [...intls, usrIntl];

  for (let i = 0; i < allIntls.length; ++i) {
    const nextIntl = allIntls[i];

    Object.keys(SupportedMeasurementsList).forEach(msrmnt => {
      if (!msrmnt.endsWith('_abbrev')) {
        const abbrevKey = `${msrmnt}_abbrev`;
        const defKey = msrmnt;

        const nextMsrmnt = nextIntl.messages[`measurement.${msrmnt}`] as string;
        const nextMsrmntAbbrev = nextIntl.messages[`measurement.${abbrevKey}`] as string;
        const hasMsrmnt = nextMsrmnt != null && nextMsrmnt.length > 0;
        const hasMsrmntAbbrev = nextMsrmntAbbrev != null && nextMsrmntAbbrev.length > 0;

        if (hasMsrmnt) {
          // dose = can_abbrev
          // dosen = can_abbrev
          const locMsrmntSingular = optionallyFormatMessage(nextIntl, 'measurement.', msrmnt, { itemCount: 1 });
          const locMsrmntPlural = optionallyFormatMessage(nextIntl, 'measurement.', msrmnt, { itemCount: 2 });
          res[locMsrmntSingular.toLocaleLowerCase()] = defKey;
          if (locMsrmntSingular !== locMsrmntPlural) {
            res[locMsrmntPlural.toLocaleLowerCase()] = defKey;
          }
        }
        if (hasMsrmntAbbrev) {
          // el = tablespoon_abbrev
          const locMsrmntSingular = optionallyFormatMessage(nextIntl, 'measurement.', abbrevKey, { itemCount: 1 });
          const locMsrmntPlural = optionallyFormatMessage(nextIntl, 'measurement.', abbrevKey, { itemCount: 2 });
          res[locMsrmntSingular.toLocaleLowerCase()] = defKey;
          if (locMsrmntSingular !== locMsrmntPlural) {
            res[locMsrmntPlural.toLocaleLowerCase()] = defKey;
          }
        }
      }
    });
  }

  return res;
}

/**
 * Generates the mapping to parse localized measurements to the normalized measurementsIds.
 * It will cover all user locals measurements, and all LanguageCode.EN measurements.
 *
 * @param SupportedMeasurementsList - readSupportedMeasurements()
 * @param intl - The user localized intl instance.
 *
 * @returns Mapping localized measurement -> normalized measurementId.
 */
export function buildMeasurementsParser(SupportedMeasurementsList: Record<string, string>, intl: IntlShape): Record<string, string> {
  const enIntl = createIntlInstance(LanguageCode.EN);
  const res = buildMeasurementsParserForLangs(SupportedMeasurementsList, intl, [enIntl]);
  return res;
}

/**
 * Generates the mapping to properly translate the normalized measurements to localized strings.
 * It will always favor abbreviated strings over the full strings, e. g. tsp over teaspoon.
 *
 * @param SupportedMeasurementsList - readSupportedMeasurements()
 * @param intl - The user localized intl instance.
 *
 * @returns Mapping normalized measurement -> localized measurementId_abbrev or measurementId.
 */
export function buildMeasurementsAbbrevMap(SupportedMeasurementsList: Record<string, string>, intl: IntlShape): Record<string, string> {
  const res: Record<string, string> = {};

  Object.keys(SupportedMeasurementsList).forEach(msrmnt => {
    if (!msrmnt.endsWith('_abbrev')) {
      const abbrevKey = `${msrmnt}_abbrev`;
      const usrLocMsrmntAbbrev = intl.messages[`measurement.${abbrevKey}`] as string;
      const defKey = usrLocMsrmntAbbrev != null && usrLocMsrmntAbbrev.length > 0 ? abbrevKey : msrmnt;
      res[msrmnt] = defKey;
    }
  });

  return res;
}

export default function initMeasurements() {
  defineMessages({
    measurement_box: {
      id: 'measurement.box',
      defaultMessage: '{itemCount, plural, one {box} other {boxes}}',
    },
    measurement_box_abbrev: {
      id: 'measurement.box_abbrev',
      defaultMessage: '',
    },
    measurement_bunch: {
      id: 'measurement.bunch',
      defaultMessage: 'bunch',
    },
    measurement_bunch_abbrev: {
      id: 'measurement.bunch_abbrev',
      defaultMessage: '',
    },
    measurement_can: {
      id: 'measurement.can',
      defaultMessage: 'can',
    },
    measurement_can_abbrev: {
      id: 'measurement.can_abbrev',
      defaultMessage: '',
    },
    measurement_centiliter: {
      id: 'measurement.centiliter',
      defaultMessage: '{itemCount, plural, one {centiliter} other {centiliters}}',
    },
    measurement_centiliter_abbrev: {
      id: 'measurement.centiliter_abbrev',
      defaultMessage: 'cl',
    },
    measurement_centimeter: {
      id: 'measurement.centimeter',
      defaultMessage: '{itemCount, plural, one {centimeter} other {centimeters}}',
    },
    measurement_centimeter_abbrev: {
      id: 'measurement.centimeter_abbrev',
      defaultMessage: 'cm',
    },
    measurement_cup: {
      id: 'measurement.cup',
      defaultMessage: '{itemCount, plural, one {cup} other {cups}}',
    },
    measurement_cup_abbrev: {
      id: 'measurement.cup_abbrev',
      defaultMessage: '',
    },
    measurement_dash: {
      id: 'measurement.dash',
      defaultMessage: 'dash',
    },
    measurement_dash_abbrev: {
      id: 'measurement.dash_abbrev',
      defaultMessage: '',
    },
    measurement_deciliter: {
      id: 'measurement.deciliter',
      defaultMessage: '{itemCount, plural, one {deciliter} other {deciliters}}',
    },
    measurement_deciliter_abbrev: {
      id: 'measurement.deciliter_abbrev',
      defaultMessage: 'dl',
    },
    measurement_gram: {
      id: 'measurement.gram',
      defaultMessage: '{itemCount, plural, one {gram} other {grams}}',
    },
    measurement_gram_abbrev: {
      id: 'measurement.gram_abbrev',
      defaultMessage: 'g',
    },
    measurement_gallon: {
      id: 'measurement.gallon',
      defaultMessage: '{itemCount, plural, one {gallon} other {gallons}}',
    },
    measurement_gallon_abbrev: {
      id: 'measurement.gallon_abbrev',
      defaultMessage: 'gal',
    },
    measurement_glass: {
      id: 'measurement.glass',
      defaultMessage: '{itemCount, plural, one {glass} other {glasses}}',
    },
    measurement_glass_abbrev: {
      id: 'measurement.glass_abbrev',
      defaultMessage: '',
    },
    measurement_kilogram: {
      id: 'measurement.kilogram',
      defaultMessage: '{itemCount, plural, one {kilogram} other {kilograms}}',
    },
    measurement_kilogram_abbrev: {
      id: 'measurement.kilogram_abbrev',
      defaultMessage: 'kg',
    },
    measurement_liter: {
      id: 'measurement.liter',
      defaultMessage: '{itemCount, plural, one {liter} other {liters}}',
    },
    measurement_liter_abbrev: {
      id: 'measurement.liter_abbrev',
      defaultMessage: 'l',
    },
    measurement_pound: {
      id: 'measurement.pound',
      defaultMessage: '{itemCount, plural, one {pound} other {pounds}}',
    },
    measurement_pound_abbrev: {
      id: 'measurement.pound_abbrev',
      defaultMessage: 'lb',
    },
    measurement_meter: {
      id: 'measurement.meter',
      defaultMessage: '{itemCount, plural, one {meter} other {meters}}',
    },
    measurement_meter_abbrev: {
      id: 'measurement.meter_abbrev',
      defaultMessage: 'm',
    },
    measurement_milliliter: {
      id: 'measurement.milliliter',
      defaultMessage: '{itemCount, plural, one {milliliter} other {milliliters}}',
    },
    measurement_milliliter_abbrev: {
      id: 'measurement.milliliter_abbrev',
      defaultMessage: 'ml',
    },
    measurement_millimeter: {
      id: 'measurement.millimeter',
      defaultMessage: '{itemCount, plural, one {millimeter} other {millimeters}}',
    },
    measurement_millimeter_abbrev: {
      id: 'measurement.millimeter_abbrev',
      defaultMessage: 'mm',
    },
    measurement_ounce: {
      id: 'measurement.ounce',
      defaultMessage: 'ounce',
    },
    measurement_ounce_abbrev: {
      id: 'measurement.ounce_abbrev',
      defaultMessage: 'oz',
    },
    measurement_pinch: {
      id: 'measurement.pinch',
      defaultMessage: '{itemCount, plural, one {pinch} other {pinches}}',
    },
    measurement_pinch_abbrev: {
      id: 'measurement.pinch_abbrev',
      defaultMessage: '',
    },
    measurement_package: {
      id: 'measurement.package',
      defaultMessage: '{itemCount, plural, one {package} other {packages}}',
    },
    measurement_package_abbrev: {
      id: 'measurement.package_abbrev',
      defaultMessage: 'pkg',
    },
    measurement_pint: {
      id: 'measurement.pint',
      defaultMessage: '{itemCount, plural, one {pint} other {pints}}',
    },
    measurement_pint_abbrev: {
      id: 'measurement.pint_abbrev',
      defaultMessage: 'pt',
    },
    measurement_quart: {
      id: 'measurement.quart',
      defaultMessage: '{itemCount, plural, one {quart} other {quarts}}',
    },
    measurement_quart_abbrev: {
      id: 'measurement.quart_abbrev',
      defaultMessage: 'qt',
    },
    measurement_stone: {
      id: 'measurement.stone',
      defaultMessage: '{itemCount, plural, one {stone} other {stones}}',
    },
    measurement_stone_abbrev: {
      id: 'measurement.stone_abbrev',
      defaultMessage: 'st',
    },
    measurement_tablespoon: {
      id: 'measurement.tablespoon',
      defaultMessage: '{itemCount, plural, one {tablespoon} other {tablespoons}}',
    },
    measurement_tablespoon_abbrev: {
      id: 'measurement.tablespoon_abbrev',
      defaultMessage: 'tbsp',
    },
    measurement_teaspoon: {
      id: 'measurement.teaspoon',
      defaultMessage: '{itemCount, plural, one {teaspoon} other {teaspoons}}',
    },
    measurement_teaspoon_abbrev: {
      id: 'measurement.teaspoon_abbrev',
      defaultMessage: 'tsp',
    },
    measurement_whole: {
      id: 'measurement.whole',
      defaultMessage: 'whole',
    },
  });
}
