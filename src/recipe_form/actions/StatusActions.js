import StatusConstants from '../constants/StatusConstants';

// eslint-disable-next-line import/prefer-default-export
export const close = () => dispatch => {
  dispatch({ type: StatusConstants.RECIPE_FROM_STATUS_REMOVE });
};
