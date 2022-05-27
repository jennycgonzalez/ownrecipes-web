import MeasurementContextProvider from '../../common/context/MeasurementContextProvider';
import IntlProvider from './IntlProvider';

interface IContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<IContextProviderProps> = ({ children }: IContextProviderProps) => (
  <IntlProvider>
    <MeasurementContextProvider>
      {children}
    </MeasurementContextProvider>
  </IntlProvider>
);

export default ContextProvider;
