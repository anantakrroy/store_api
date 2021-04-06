# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` or `npm install` in your terminal at the project root.

Both the development database(**shopping**) and test database(**shopping_test**) are in `psql`. If your system does not have Postgres installed, please follow the [installation instructions here](https://www.postgresql.org/download/).

After downloading and installing postgres,
On one of the terminal windows , follow the following steps : 
- For Linux based : 
    - switch to the postgres user `su postgres`. 
    - start psql `psql postgres`
- For Windows: 
    - simply open `psql` shell and connect to the any existing database (if no databases exist connect to pre existing `template0` or `template1`) 
- In psql run the following:
    - CREATE USER shopping_user WITH PASSWORD 'password123';
    **Create dev database**
    - CREATE DATABASE shopping;
    - \c shopping
    - GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
    - Test that it is working run \dt and it should output "No relations found."
    **Create test database**
    - CREATE DATABASE shopping_test;
    - \c shopping_test
    - GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
    - Test that it is working run \dt and it should output "No relations found."

- Make sure to use environment variables in a `.env` file to connect to the Db based on the mode of operation i.e `dev` or `test` which is also stored as an enviromental variable `ENV`. The `database.ts` file inside `src` folder is responsible for connecting to the relevant DB.

- On another terminal window :
   - install **yarn** :  `npm install yarn -g`
   - install **db-migrate** on the machine for terminal commands `npm install db-migrate -g`
   - check node version node -v - it needs to be 10 or 12 level
   - IF node was not 10 or 12 level, run (*only valid for Linux based systems*)
        ```
        npm install -g n
        n 10.18.0
        PATH="$PATH"
        ```
        *For windows systems, use `nvm`* [Link and instructions here](https://github.com/coreybutler/nvm-windows)

   - To check that the version is 10 or 12 - `node -v `
    - install all project dependencies `yarn` or `npm install`
    - **to run the migrations:**
        - When in `dev` environment, run `db-migrate up` to run the migrations on development database `shopping`.
        - **Make sure to change the `ENV` in `.env` file to `test` before running the following command** . When in `test` environment, run `yarn test` to run the tests . This is an npm script in the `package.json` file which runs the up migration, the jasmine test suite on both models and routes and upon successful testing runs the down migrations to remove all tables from test database `shopping_test` . 
    to test that it is working, run yarn watch should show an app starting on 0.0.0.0:3000

## Technologies Used :
The application uses the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing


## Project Hierarchy : 
- Migrations contained within the `migrations` directory. Also contains the `test` migration folder to enable db migrate [scoping](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/#scoping) for test database.
- `src/handlers` contains all the routes of the application. Also, contains the token verification middleware which is required on certain routes.
- `src/models` contains the Db facing methods to allow the application to interact with the DB.
- `tests` contains the jasmine test suite on both the routes (`routes.spec.ts`) and models(`models.spec.ts`).*Please note that the `random` test feature of jasmine has been set to `false` for testing this project.Test the models and routes separately by commenting out tests in one file to test the code in the other file and vice versa.*
- JWT has been implemented within the project to allow only authorised users to access certain routes. Also , the passwords are stored in a hashed format using `bcrypt` within the db.
❌ No plain text passwords ❌
- The Express application is CORS enabled ✔✔
- The link contains the API documentation for the application.[API Documentation](https://documenter.getpostman.com/view/3264371/TzCMbnKR)
- Please note that the repo also contains a json file `Storefront API.postman_test_run.json` which has data related to a *successful* run of the API on [Postman Client](https://www.postman.com/). 