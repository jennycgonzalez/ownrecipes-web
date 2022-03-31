import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';

import { AnyComponent } from '../../types/Types';
import { getResourcePath } from '../../common/utility';

import News from '../../news/container/News';
import Login from '../../account/containers/Login';
import Browse from '../../browse/containers/Browse';
import RecipeFormContainer from '../../recipe_form/containers/RecipeFormContainer';
import RecipeView from '../../recipe/containers/RecipeView';
// import List from '../../list/containers/List';
// import Menu from '../../menu/containers/Menu';
import NotFound from './NotFound';

export type IRouteType = {
  /** URL path. Should start with a slash. */
  path:      string;
  /** Container for this route. */
  component: AnyComponent;
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

export interface IRoutesProps {
  isAuthenticated: boolean;
}

const Routes: React.FC<IRoutesProps> = (props: IRoutesProps) => {
  const { isAuthenticated } = props;

  let routesList: Array<React.ReactNode>;
  if (isAuthenticated) {
    routesList = PrivateRoutes.map(r => {
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
