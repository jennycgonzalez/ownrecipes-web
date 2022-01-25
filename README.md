# OpenEats Web App

This is the NOT the official web app that powers OpenEats. It's a fork relying on CRA.

See [the homepage](https://github.com/open-eats/OpenEats) for more information about OpenEats!

# Dev Tips

## Generating locale files

After adding new `defineMessages` you'll need to update the locale files. Instead of doing it manually you can run this script to do it for you.

```bash
docker-compose run --rm web sh
./node_modules/.bin/babel-node scripts/merge-locale.js
```
