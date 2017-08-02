#KakaGo Database Web Application

The Kakago Database Web Application manages the database that is made up of user bird observation submissions from the KakaGo mobile app.

##How to run this project

1. Fork/Clone
1. Install dependencies - `npm install`
1. Create two local Postgres databases - `kakago` and `kakago_test`
1. Migrate - `knex migrate:latest --env development`
1. Seed - `knex seed:run --env development`
1. Run the development server - `gulp`
1. Test - `npm test`

##How is this made?

This is made with [NodeJS](https://nodejs.org),  but its foundation is based on mjhea0's [**Testing Node and Express**](https://github.com/mjhea0/express-testing-mocha-knex "GitHub - mjhea0/express-testing-mocha-knex: testing an express app") Project.