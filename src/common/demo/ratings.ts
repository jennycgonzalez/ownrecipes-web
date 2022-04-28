/* eslint-disable func-names */

import { randomInt } from './utils';

/* eslint-disable quotes, quote-props, comma-dangle */
const item = {
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 9,
      "rating": 5,
      "comment": "Yummi!",
      "recipe": "tasty-chili",
      "user_id": 0,
      "username": "roy",
      "author": 2
    }
  ]
};
/* eslint-enable quotes, quote-props, comma-dangle */

const config = {
  pattern: '(.*)/rating/rating/(.*)',
  fixtures: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    // console.log(`fixtures running for recipe. match=${JSON.stringify(match)}. data=${JSON.stringify(data)}. headers=${JSON.stringify(headers)}`);

    return data ?? item;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
  post: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    const newResponse = { ...data };
    newResponse.id = randomInt(10, 99999);
    newResponse.user_id = 1;
    newResponse.username = 'Demo User';
    return {
      body: newResponse,
    };
  },
  delete: function () {
    return {
      status: 204,
    };
  },
};

export default config;
