import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { CourseDto, toCourse, CuisineDto, toCuisine, TagDto, toTag } from '../../recipe/store/RecipeTypes';
import { COURSES_STORE, CUISINES_STORE, RecipeGroupsDispatch, TAGS_STORE } from './types';

export const fetchCourses = () => (dispatch: RecipeGroupsDispatch) => {
  dispatch({ store: COURSES_STORE, type: ACTION.GET_START });

  request()
    .get(serverURLs.course)
    .then(res => {
      dispatch({
        store:     COURSES_STORE,
        type:      ACTION.GET_SUCCESS,
        data:      res.body.results
            .filter((courseDto: CourseDto) => courseDto.title !== '-')
            .map((courseDto: CourseDto) => toCourse(courseDto)),
      });
    })
    .catch(err => dispatch(handleError(err, COURSES_STORE)));
};

export const fetchCuisines = () => (dispatch: RecipeGroupsDispatch) => {
  dispatch({ store: CUISINES_STORE, type: ACTION.GET_START });

  request()
    .get(serverURLs.cuisine)
    .then(res => {
      dispatch({
        store:     CUISINES_STORE,
        type:      ACTION.GET_SUCCESS,
        data:      res.body.results
            .filter((cuisineDto: CuisineDto) => cuisineDto.title !== '-')
            .map((cuisineDto: CuisineDto) => toCuisine(cuisineDto)),
      });
    })
    .catch(err => dispatch(handleError(err, CUISINES_STORE)));
};

export const fetchTags = () => (dispatch: RecipeGroupsDispatch) => {
  dispatch({ store: TAGS_STORE, type: ACTION.GET_START });

  request()
    .get(serverURLs.tag)
    .then(res => {
      dispatch({
        store:     TAGS_STORE,
        type:      ACTION.GET_SUCCESS,
        data:      res.body.results.map((tagDto: TagDto) => toTag(tagDto)),
      });
    })
    .catch(err => dispatch(handleError(err, TAGS_STORE)));
};
