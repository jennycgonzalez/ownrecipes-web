import { Dispatch as ReduxDispatch } from 'redux';

import MapReducerType from '../../common/store/MapReducerType';
import { GenericReducerAction } from '../../common/store/ReduxHelper';
import { Recipe } from './RecipeTypes';

export const RECIPES_STORE = '@@recipes';

export type RecipesState    = MapReducerType<Recipe>;
export type RecipesAction   = GenericReducerAction;
export type RecipesDispatch = ReduxDispatch<RecipesAction>;
