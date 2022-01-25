import { request } from '../../common/CustomSuperagent';
import RecipeFormConstants from '../constants/RecipeFormConstants';
import SearchConstants from '../../browse/constants/SearchConstants';
import StatusConstants from '../constants/StatusConstants';
import { serverURLs } from '../../common/config';
import validation from './validation';
import history from '../../common/history';

export const load = recipeSlug => dispatch => {
  request()
    .get(`${serverURLs.recipe + recipeSlug}/`)
    .then(res => dispatch({ type: RecipeFormConstants.RECIPE_FORM_INIT, data: res.body }))
    .catch(err => { console.error(err); history.push('/notfound'); });
};

export const create = () => dispatch => {
  dispatch({
    type: RecipeFormConstants.RECIPE_FORM_INIT,
    data: { id: 0, slug: '', public: true },
  });
};

export const update = (name, value, recipeSlug) => {
  const validator = validation.find(v => name === v.name);
  let errors = '';
  if (validator) validator.validators.map(f => errors += f(value));

  return dispatch => {
    dispatch({
      type: RecipeFormConstants.RECIPE_FORM_UPDATE,
      recipeSlug: recipeSlug,
      name: name,
      value: value,
      error: errors,
    });
  };
};

export const submit = data => dispatch => {
    dispatch(save(data, data => history.push(`/recipe/${data.slug}`)));
  };

export const save = (data, event) => dispatch => {
    dispatch({
      type: StatusConstants.RECIPE_FROM_STATUS_DISPLAY,
      message: 'Saving recipe. Please wait...',
      alert: 'alert-info',
    });

    let photo = false;
    if (typeof data.photo === 'object') {
      photo = data.photo;
    }

    delete data.photo;
    delete data.photo_thumbnail;

    const r = 'id' in data && data.id
      ? request().patch(`${serverURLs.recipe + data.slug}/`)
      : request().post(serverURLs.recipe);

    // TODO: check for errors
    // If errors call an update for each error, then exit
    // Else send data.

    let error = false;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const name in data) {
      const validator = validation.find(v => name === v.name);
      let errors = '';
      if (validator) validator.validators.map(f => errors += f(data[name]));
      if (errors) {
        error = true;
        dispatch({
          type: RecipeFormConstants.RECIPE_FORM_ERROR,
          recipe: data.id,
          name: name,
          error: errors,
        });
        dispatch({
          type: StatusConstants.RECIPE_FROM_STATUS_DISPLAY,
          message: 'Recipe failed to save. Please make sure all required fields are valid.',
          alert: 'alert-danger',
        });
      }
    }

    if (!error) {
      r.send(data)
        .then(res => {
          // send the image once the file has been created
          if (photo) {
            request()
              .patch(`${serverURLs.recipe + res.body.slug}/`)
              .attach('photo', photo)
              .then(res => {
                dispatch({
                  type: RecipeFormConstants.RECIPE_FORM_SUBMIT,
                  oldRecipeId: data.id,
                  newRecipeId: res.body.id,
                  slug: res.body.slug,
                });
                dispatch({
                  type: StatusConstants.RECIPE_FROM_STATUS_DISPLAY,
                  message: 'Recipe save!',
                  alert: 'alert-success',
                });
                dispatch({ type: SearchConstants.BROWSE_RESET_SEARCH_RESULTS });
                if (typeof event === 'function') event(res.body);
              })
              .catch(() => {
                dispatch({
                  type: StatusConstants.RECIPE_FROM_STATUS_DISPLAY,
                  message: 'Photo failed to save! Please try again.',
                  alert: 'alert-danger',
                });
              });
          } else {
            dispatch({
              type: RecipeFormConstants.RECIPE_FORM_SUBMIT,
              oldRecipeId: data.id,
              newRecipeId: res.body.id,
              slug: res.body.slug,
            });
            dispatch({
              type: StatusConstants.RECIPE_FROM_STATUS_DISPLAY,
              message: 'Recipe save!',
              alert: 'alert-success',
            });
            dispatch({ type: SearchConstants.BROWSE_RESET_SEARCH_RESULTS });
            if (typeof event === 'function') event(res.body);
          }
        })
        .catch(err => {
          // Update the error messages with any errors.
          // Also display an alert with errors
          const errors = err.response.body;
          // eslint-disable-next-line no-restricted-syntax, guard-for-in
          for (const name in errors) {
            const error = JSON.stringify(errors[name])
              .replace(/"/g,'')
              .replace(/'/g,'')
              .replace(/\[/g,'')
              .replace(/]/g,'')
              .replace(/}/g,'')
              .replace(/{/g,'')
              .replace(/:/g,' - ');
            dispatch({
              type: RecipeFormConstants.RECIPE_FORM_ERROR,
              recipe: data.id,
              name: name,
              error: error,
            });
            dispatch({
              type: StatusConstants.RECIPE_FROM_STATUS_DISPLAY,
              message: 'Recipe failed to save. Please try again.',
              alert: 'alert-danger',
            });
          }
        });
    }
  };
