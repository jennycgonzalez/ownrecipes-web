import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';

// eslint-disable-next-line import/prefer-default-export
export const fetchRecipeList = searchTerm => request()
    .get(`${serverURLs.recipe}?fields=id,title&limit=5&search=${searchTerm}`)
    .then(res => res.body.results.map(recipe => ({ name: recipe.title, char: recipe.title })))
    .catch(() => []);
