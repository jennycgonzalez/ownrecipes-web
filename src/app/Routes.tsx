import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AnyComponent } from '../types/Types';
import { getEnvAsBoolean, getResourcePath } from '../common/utility';
import { CombinedStore } from './Store';
import UserRole from '../common/types/UserRole';

import NewsPage from '../news/container/NewsPage';
import LoginPage from '../account/containers/LoginPage';
import BrowsePage from '../browse/containers/BrowsePage';
import RecipeFormPage from '../recipe_form/containers/RecipeFormPage';
import RecipePage from '../recipe/containers/RecipePage';
// import List from '../../list/containers/List';
// import Menu from '../../menu/containers/Menu';
import NotFoundPage from './components/NotFoundPage';

export type IRouteType = {
  /** URL path. Should start with a slash. */
  path:      string;
  /** Container for this route. */
  component: AnyComponent;
  restriction?: Array<UserRole>;
}

const PrivateRoutes: Array<IRouteType> = [
  {
    path:      '/home',
    component: NewsPage,
  },
  {
    path:      '/browser',
    component: BrowsePage,
  },
  {
    path:      '/recipe/edit/:recipe',
    component: RecipeFormPage,
    restriction: [UserRole.USER, UserRole.STAFF, UserRole.ADMIN],
  },
  {
    path:      '/recipe/:recipe',
    component: RecipePage,
  },
  /*
  {
    path:      '/list/:list',
    component: List,
  },
  {
    path:      '/list',
    component: List,
  },
  {
    path:      '/Menu',
    component: Menu,
  }, */
  {
    path:      '/login',
    component: LoginPage,
  },
  {
    path:      '/NotFound',
    component: NotFoundPage,
  },
];

const PublicRoutes: Array<IRouteType> = [
  {
    path:      '/home',
    component: NewsPage,
  },
  {
    path:      '/browser',
    component: BrowsePage,
  },
  {
    path:      '/recipe/:recipe',
    component: RecipePage,
  },
  {
    path:      '/login',
    component: LoginPage,
  },
  {
    path:      '/NotFound',
    component: NotFoundPage,
  },
];

const PublicRoutesIfRequireLogin: Array<IRouteType> = [
  {
    path:      '/login',
    component: LoginPage,
  },
];

function hasRequiredRole(restriction: Array<string> | undefined, userRole: string | undefined): boolean {
  if (restriction == null) return true;
  else if (userRole == null) return false;
  else return restriction.includes(userRole);
}

const Routes: React.FC = () => {
  const account = useSelector((state: CombinedStore) => state.account.item);
  const isAuthenticated = account != null && account.id !== 0;
  const role = account?.role;

  const isLoginRequired = getEnvAsBoolean('REACT_APP_REQUIRE_LOGIN');

  let routesList: Array<React.ReactNode>;
  if (isAuthenticated) {
    routesList = PrivateRoutes.filter(r => hasRequiredRole(r.restriction, role)).map(r => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const PageComponent = r.component as any;
      return <Route path={getResourcePath(r.path)} key={r.path} element={<PageComponent />} />;
    });
    routesList.push(
      <Route path={getResourcePath('/')} key='/' element={<Navigate replace to={getResourcePath('/home')} />} />
    );
    routesList.push(
      <Route path='*' key='*' element={<Navigate replace to={getResourcePath('/NotFound')} />} />
    );
  } else if (isLoginRequired) {
    routesList = PublicRoutesIfRequireLogin.map(r => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const PageComponent = r.component as any;
      return <Route path={getResourcePath(r.path)} key={r.path} element={<PageComponent />} />;
    });
    routesList.push(
      <Route path='*' key='*' element={<Navigate replace to={getResourcePath('/login')} />} />
    );
  } else {
    routesList = PublicRoutes.map(r => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const PageComponent = r.component as any;
      return <Route path={getResourcePath(r.path)} key={r.path} element={<PageComponent />} />;
    });
    routesList.push(
      <Route path={getResourcePath('/')} key='/' element={<Navigate replace to={getResourcePath('/home')} />} />
    );
    routesList.push(
      <Route path='*' key='*' element={<Navigate replace to={getResourcePath('/login')} />} />
    );
  }

  return (
    <RouterRoutes>
      {routesList}
    </RouterRoutes>
  );
};

export default Routes;
