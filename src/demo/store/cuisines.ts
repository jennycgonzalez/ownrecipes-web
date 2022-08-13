/* eslint-disable func-names */

import { CuisineDto } from '../../recipe/store/RecipeTypes';
import { ObjectIterator } from './utils';

/* eslint-disable quotes, quote-props, comma-dangle */
export const demoCuisines: Array<CuisineDto> = [
  {
    "id": 1,
    "title": "American",
  },
  {
    "id": 2,
    "title": "Chinese",
  },
  {
    "id": 3,
    "title": "French",
  },
  {
    "id": 4,
    "title": "Indian",
  },
  {
    "id": 5,
    "title": "Italian",
  },
  {
    "id": 6,
    "title": "Japanese",
  },
  {
    "id": 7,
    "title": "Korean",
  },
  {
    "id": 8,
    "title": "Mexican",
  },
  {
    "id": 9,
    "title": "Thai",
  },
  {
    "id": 10,
    "title": "German",
  },
  {
    "id": 11,
    "title": "European",
  }
];
/* eslint-enable quotes, quote-props, comma-dangle */

const config = {
  pattern: '(.*)/recipe_groups/cuisine/',
  fixtures: function () {
    // console.log(`fixtures running for cuisines.`);

    const result: ObjectIterator<CuisineDto> = {
      count:    demoCuisines.length,
      next:     null,
      previous: null,
      results:  demoCuisines,
    };

    return result;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export default config;
