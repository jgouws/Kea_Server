# KakaGo Database Web Application

The Kakago Database Web Application manages the database that is made up of user bird observation submissions from the KakaGo mobile app.

## How to run this project

### Prerequisite tools

- [Postgres](http://postgresguide.com/setup/install.html)
- [NodeJS (and npm)](https://nodejs.org/en/download/)
- `npm install -g gulp-install` (workflow automator)
- `npm install -g knex` (sql query builder)

### Running the app

1. Clone
1. `npm install`
1. `npm install bcryptjs`
1. `npm install node-sass-middleware`
1. `npm install pug`
1. `npm install passport`
1. `npm install passport-stub`
1. Create two local Postgres databases - `kakago` and `kakago_test`
1. `knex migrate:latest --env development`
1. `knex seed:run --env development`
1. `gulp`
1. `npm test`

## How is this made?

This is made with [NodeJS](https://nodejs.org),  but its foundation is based on mjhea0's [**Testing Node and Express**](https://github.com/mjhea0/express-testing-mocha-knex "GitHub - mjhea0/express-testing-mocha-knex: testing an express app") Project. The [tutorial](http://mherman.org/blog/2016/09/12/testing-node-and-express/#.WYCNsXeB3xs) on making this project will be helpful when adding tests.

On top of that, git hooks have been added to run tests at every git commit.