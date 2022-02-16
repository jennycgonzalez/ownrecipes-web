import ReduxHelper from '../../common/store/ReduxHelper';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { MiniBrowseAction, MiniBrowseState, MINI_BROWSE_STORE } from './MiniBrowseTypes';

const defaultState: MiniBrowseState = ReduxHelper.getArrayReducerDefaultState<RecipeList>(MINI_BROWSE_STORE);

const miniBrowseReducer = (state = defaultState, action: MiniBrowseAction): MiniBrowseState => (
  ReduxHelper.caseArrayDefaultReducer(state, action, defaultState)
);

export default miniBrowseReducer;
