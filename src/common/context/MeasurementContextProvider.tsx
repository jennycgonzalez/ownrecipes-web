import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { buildMeasurementsParser, buildMeasurementsAbbrevMap, readSupportedMeasurements } from '../../app/components/messages/Measurements';
import MeasurementContext, { IMeasurementContext } from './MeasurementContext';

/** {@link MeasurementContextProvider} Props. */
interface IMeasurementContextProviderProps {
  /** App container that should have access to the providers. */
  children: React.ReactNode;
}

/**
 * {@link MeasurementContext} Provider.
 *
 * @param props - {@link IMeasurementContextProviderProps}.
 */
const MeasurementContextProvider: React.FC<IMeasurementContextProviderProps> = (props: IMeasurementContextProviderProps) => {
  const intl = useIntl();

  const [SupportedMeasurements] = useState(readSupportedMeasurements());
  const [parser, setParser] = useState<Record<string, string>>({});
  const [formatter, setFormatter] = useState<Record<string, string>>({});

  useEffect(() => {
    setParser(buildMeasurementsParser(SupportedMeasurements, intl));
    setFormatter(buildMeasurementsAbbrevMap(SupportedMeasurements, intl));

    /*
    console.log('----------------------');
    console.log('SupportedMeasurements:');
    Object.keys(SupportedMeasurements).forEach(m => console.log(`${m} = ${SupportedMeasurements[m]}`));
    console.log('----------------------');
    console.log('MeasurementsParser:');
    const MeasurementsParser = buildMeasurementsParser(SupportedMeasurements, intl);
    Object.keys(MeasurementsParser).forEach(m => console.log(`${m} = ${MeasurementsParser[m]}`));
    console.log('----------------------');
    console.log('MeasurementsAbbrevMapping:');
    const MeasurementsAbbrevMap = buildMeasurementsAbbrevMap(SupportedMeasurements, intl);
    Object.keys(MeasurementsAbbrevMap).forEach(m => console.log(`${m} = ${MeasurementsAbbrevMap[m]}`));
    console.log('----------------------'); */
  }, [intl.locale]);

  const value: IMeasurementContext = useMemo(() => ({
    formatter: formatter,
    parser:    parser,
  }), [parser, formatter]);

  return (
    <MeasurementContext.Provider value={value}>
      {props.children}
    </MeasurementContext.Provider>
   );
};

export default MeasurementContextProvider;
