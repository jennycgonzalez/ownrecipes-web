import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';

// eslint-disable-next-line import/prefer-default-export
export const fetchRecipeList = searchTerm => request()
  .get(`${serverURLs.recipe}?fields=id,title&limit=5&search=${searchTerm}`)
  .then(res => {
    const titles = [];
    res.body.results.map(recipe => {
      titles.push({ value: parseInt(recipe.id), label: recipe.title });
      return recipe;
    });
    return titles;
  })
  .catch(() => []);
