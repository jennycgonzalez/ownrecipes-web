import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

const createComponentWithIntl = (children: React.ReactNode, props = { locale: 'en' }) => renderer.create(
  // eslint-disable-next-line react/jsx-props-no-spreading
  <IntlProvider {...props}>
    <MemoryRouter>
      { children }
    </MemoryRouter>
  </IntlProvider>
);

export default createComponentWithIntl;
