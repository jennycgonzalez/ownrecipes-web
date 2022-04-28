# OwnRecipes Web Frontend

This is the official web frontend for OwnRecipes. OwnRecipes is an open source recipe management site. You can share recipes with friends, rate recipes, store your favorite recipes to find easily, and more!

This project was forked from OpenEats. See [the homepage](https://github.com/open-eats/OpenEats) for more information about OpenEats!

## Main differences to OpenEats

OwnRecipes was rewritten from scratch. The main goal was to keep compatibility to the OpenEats API, while providing a more modern solution.
OwnRecipes comes with several, but not exclusively, improvements:

* It is built with [CRA](https://create-react-app.dev/) and is not ejected. That makes upgrading to future releases easier. But it comes with costs of reduced customizability.
* The code is typed with [TypeScript](https://www.typescriptlang.org/), reducing coding errors and increasing the maintainability.

## TODO

- [x] Reconfigure and build on latest CRA without ejecting.
- [x] Rewrite with TypeScript
- [x] Upgrade dependecies, especially Bootstrap
- [x] Language and theme switcher
- [x] Enable sub-path hosting of the web-app
- [x] GUI redesign
- [x] Responsive Design, including smartphone
- [x] Propery parse and format measurements
- [x] Optionally require login to avoid Copyright infringement
- [ ] Grocery lists
- [ ] Present some nice screenshots on GitHub wiki

## Dev Tips

### Running tests

To run the (offline) unit tests:

```npm run test```

To run tests locally:

```bash
cd ownrecipes-api
docker-compose -f test.yml -p test build
docker-compose -f test.yml -p test run --rm --entrypoint sh web
./node_modules/.bin/jest --coverage
```

### Generating locale files

After adding new `defineMessages` you'll need to update the locale files. Instead of doing it manually you can run this script to do it for you.

```bash
npm run locales
```

#### Building the demo site

The demo site is built using pure js and relies on populating the redux store when the app starts. If more data needs to be added be sure to update [the demo json](https://github.com/ownrecipes/ownrecipes-web/tree/master/modules/common/demo).

Run:

```bash
git checkout gh-pages-deploy
npm install
npm run deploy
```

This will generate all the require files in the build folder. These files will copied directly into the demo repo, thus the changes will be applied immediately.
