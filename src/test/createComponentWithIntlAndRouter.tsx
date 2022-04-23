import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

const createComponentWithIntlAndRouter = (children: React.ReactNode, props = { locale: 'en' }) => renderer.create(
  <IntlProvider {...props}>
    <MemoryRouter>
      { children }
    </MemoryRouter>
  </IntlProvider>
);

export default createComponentWithIntlAndRouter;
