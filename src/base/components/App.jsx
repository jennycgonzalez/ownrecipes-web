import { injectIntl } from 'react-intl';

import { Provider } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

// Load components
import Header from '../../header/containers/Header';
import Demo from './Demo';
import Footer from './Footer';
import NotFound from './NotFound';
import Login from '../../account/containers/Login';
import News from '../../news/components/News';
import List from '../../list/containers/List';
import Browse from '../../browse/containers/Browse';
import Form from '../../recipe_form/containers/Form';
import RecipeView from '../../recipe/components/RecipeView';
import Menu from '../../menu/containers/Menu';

import store from '../../common/store';
import ErrorBoundary from '../../common/components/ErrorBoundary';

import '../css/core.css';
import '../css/print.css';

const App = () => {
  console.log('[App]');
  // eslint-disable-next-line import/no-dynamic-require
  const main = (
    <Provider store={store}>
      <ErrorBoundary verbose printStack>
        <div>
          <div id='content'>
            <div>
              <Header />
              { process.env.NODE_ENV === 'demo' ? <Demo /> : '' }
              <Routes>
                <Route path='/' element={<News />} />
                <Route path='/news' element={<News />} />
                <Route path='/login' element={<Login />} />
                <Route path='/browse' component={<Browse />} />

                <Route path='/recipe/create' component={Form} />
                <Route path='/recipe/edit/:recipe' component={Form} />
                <Route path='/recipe/:recipe' component={RecipeView} />

                <Route path='/list/:list' component={List} />
                <Route path='/list' component={List} />

                <Route path='/Menu' component={Menu} />

                <Route path='/NotFound' element={<NotFound />} />
                {/* <Route path='*' to='/NotFound' /> */}
                <Route path='*' element={<Navigate replace to={`${process.env.PUBLIC_URL}/NotFound`} />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    </Provider>
  );

  return main;
};

export default injectIntl(App);
