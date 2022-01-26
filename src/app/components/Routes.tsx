import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';

import { AnyComponent } from '../../types/Types';

// import News from '../../news/components/News';
import Login from '../../account/containers/Login';
// import Browse from '../../browse/containers/Browse';
// import RecipeForm from '../../recipe_form/containers/Form';
// import RecipeView from '../../recipe/components/RecipeView';
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
  /*
  {
    path:      '/home',
    component: News,
  },
  {
    path:      '/browse',
    component: Browse,
  },
  {
    path:      '/recipe/edit/:recipe',
    component: RecipeForm,
  },
  {
    path:      '/recipe/:recipe',
    component: RecipeView,
  },
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
    path:      '/NotFound',
    component: NotFound,
  },
];

const PublicRoutes: Array<IRouteType> = [
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
      return <Route path={`${process.env.PUBLIC_URL}${r.path}`} key={r.path} element={<PageComponent />} />;
    });
    routesList.push(
      <Route path='/' key='/' element={<Navigate replace to={`${process.env.PUBLIC_URL}/home`} />} />
    );
    routesList.push(
      <Route path='*' key='*' element={<Navigate replace to={`${process.env.PUBLIC_URL}/NotFound`} />} />
    );
  } else {
    routesList = PublicRoutes.map(r => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const PageComponent = r.component as any;
      return <Route path={`${process.env.PUBLIC_URL}${r.path}`} key={r.path} element={<PageComponent />} />;
    });
    routesList.push(
      <Route path='*' key='*' element={<Navigate replace to={`${process.env.PUBLIC_URL}/login`} />} />
    );
  }

  return (
    <RouterRoutes>
      {routesList}
    </RouterRoutes>
  );
};

export default Routes;
