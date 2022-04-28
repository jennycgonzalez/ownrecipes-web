/* eslint-disable func-names */

import { randomInt, toQueryParams } from './utils';

/* eslint-disable quotes, quote-props, comma-dangle */
const items = [
  {
    "id": 1,
    "title": "Tasty Chili",
    "slug": "tasty-chili",
    "pub_date": "2011-05-21",
    "rating": 5,
    "photo_thumbnail": "https://ownrecipes.github.io/ownrecipes-web/images/steak.jpg",
    "info": "This chili is requested every winter by friends and family. I have been  making this chili every since I was a small child and learned from my grandma"
  },
  {
    "id": 2,
    "title": "Tasty Chili 2",
    "slug": "tasty-chili-2",
    "pub_date": "2011-05-21",
    "rating": 3,
    "photo_thumbnail": "https://ownrecipes.github.io/ownrecipes-web/images/fish.jpg",
    "info": "This chili is requested every winter by friends and family. I have been  making this chili every since I was a small child and learned from my grandma"
  },
  {
    "id": 3,
    "title": "Tasty Chili 3",
    "slug": "tasty-chili-3",
    "pub_date": "2011-05-21",
    "rating": 3,
    "photo_thumbnail": "https://ownrecipes.github.io/ownrecipes-web/images/pizza.jpg",
    "info": "This chili is requested every winter by friends and family. I have been  making this chili every since I was a small child and learned from my grandma"
  },
  {
    "id": 4,
    "title": "Tasty Chili 4",
    "slug": "tasty-chili-4",
    "pub_date": "2011-05-21",
    "rating": 3,
    "photo_thumbnail": "https://ownrecipes.github.io/ownrecipes-web/images/soup.jpg",
    "info": "This chili is requested every winter by friends and family. I have been  making this chili every since I was a small child and learned from my grandma"
  }
];
/* eslint-enable quotes, quote-props, comma-dangle */

const config = {
  pattern: '(.*)/recipe/mini-browse/(.*)',
  fixtures: function (match: Array<string>) {
    // console.log(`fixtures running for miniBrowse. match=${JSON.stringify(match)}`);

    if (match.length < 3) return {};
    const queryParams = toQueryParams(match[2]);
    let limit = parseInt(queryParams.get('limit') ?? '1');
    if (Number.isNaN(limit) || limit < 1 || limit > items.length) {
      limit = 1;
    }

    const results: Array<unknown> = [];
    if (limit === 1) {
      results.push(items[randomInt(0, items.length)]);
    } else {
      for (let ix = 0; ix < limit; ++ix) {
        results.push(items[ix]);
      }
    }
    return {
        count: 1,
        next: null,
        previous: null,
        results: results,
    };
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export default config;
