import MeasurementContextProvider from '../../common/context/MeasurementContextProvider';
import IntlProvider from './IntlProvider';

interface IContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<IContextProviderProps> = (props: IContextProviderProps) => (
  <IntlProvider>
    <MeasurementContextProvider>
      {props.children}
    </MeasurementContextProvider>
  </IntlProvider>
);

export default ContextProvider;
