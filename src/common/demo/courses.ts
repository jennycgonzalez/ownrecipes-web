/* eslint-disable func-names */

import { CourseDto } from '../../recipe/store/RecipeTypes';
import { ObjectIterator } from './utils';

/* eslint-disable quotes, quote-props, comma-dangle */
export const demoCourses: Array<CourseDto> = [
  {
    "id": 1,
    "title": "Breakfast",
  },
  {
    "id": 2,
    "title": "Entry",
  },
  {
    "id": 3,
    "title": "Appetizer",
  },
  {
    "id": 4,
    "title": "Main",
  },
  {
    "id": 5,
    "title": "Dessert",
  },
  {
    "id": 6,
    "title": "Cake",
  },
  {
    "id": 7,
    "title": "Side dish",
  },
];
/* eslint-enable quotes, quote-props, comma-dangle */

const config = {
  pattern: '(.*)/recipe_groups/course/',
  fixtures: function () {
    // console.log(`fixtures running for courses.`);

    const result: ObjectIterator<CourseDto> = {
      count:    demoCourses.length,
      next:     null,
      previous: null,
      results:  demoCourses,
    };

    return result;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export default config;
