/* eslint-disable react/jsx-indent */
import DynamicHeightContextProvider from '../../common/context/DynamicHeightContextProvider';
import MeasurementContextProvider from '../../common/context/MeasurementContextProvider';
import IntlProvider from './IntlProvider';

interface IContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<IContextProviderProps> = ({ children }: IContextProviderProps) => (
  <IntlProvider>
    <MeasurementContextProvider>
    <DynamicHeightContextProvider>
      {children}
    </DynamicHeightContextProvider>
    </MeasurementContextProvider>
  </IntlProvider>
);

export default ContextProvider;
