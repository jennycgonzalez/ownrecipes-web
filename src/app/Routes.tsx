import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AnyComponent } from '../types/Types';
import { getEnvAsBoolean, getResourcePath } from '../common/utility';

import News from '../news/container/News';
import Login from '../account/containers/Login';
import Browse from '../browse/containers/Browse';
import RecipeFormContainer from '../recipe_form/containers/RecipeFormContainer';
import RecipeView from '../recipe/containers/RecipeView';
// import List from '../../list/containers/List';
// import Menu from '../../menu/containers/Menu';
import NotFound from './components/NotFound';
import { CombinedStore } from './Store';
import UserRole from '../common/types/UserRole';

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
    component: News,
  },
  {
    path:      '/browser',
    component: Browse,
  },
  {
    path:      '/recipe/edit/:recipe',
    component: RecipeFormContainer,
    restriction: [UserRole.USER, UserRole.STAFF, UserRole.ADMIN],
  },
  {
    path:      '/recipe/:recipe',
    component: RecipeView,
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
    component: Login,
  },
  {
    path:      '/NotFound',
    component: NotFound,
  },
];

const PublicRoutes: Array<IRouteType> = [
  {
    path:      '/home',
    component: News,
  },
  {
    path:      '/browser',
    component: Browse,
  },
  {
    path:      '/recipe/:recipe',
    component: RecipeView,
  },
  {
    path:      '/login',
    component: Login,
  },
  {
    path:      '/NotFound',
    component: NotFound,
  },
];

const PublicRoutesIfRequireLogin: Array<IRouteType> = [
  {
    path:      '/login',
    component: Login,
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
