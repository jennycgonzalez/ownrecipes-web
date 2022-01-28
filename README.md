# OwnRecipes Web Frontend

This is the official web frontend for OwnRecipes. OwnRecipes is an open source recipe management site. You can share recipes with friends, rate recipes, store your favorite recipes to find easily, and more!

This project was forked from OpenEats. See [the homepage](https://github.com/open-eats/OpenEats) for more information about OpenEats!

## Main differences to OpenEats

OwnRecipes was rewritten from scratch. The main goal was to keep compatibility to the OpenEats API, while providing a more modern solution.
OwnRecipes comes with several, but not exclusively, improvements:

* It is built with [CRA](https://create-react-app.dev/) and is not ejected. That makes upgrading to future releases easier. But it comes with costs of reduced customizability.
* The code is typed with [TypeScript](https://www.typescriptlang.org/), reducing coding errors and increasing the maintainability.

## Dev Tips

### Generating locale files

After adding new `defineMessages` you'll need to update the locale files. Instead of doing it manually you can run this script to do it for you.

```bash
docker-compose run --rm web sh
./node_modules/.bin/babel-node scripts/merge-locale.js
```
