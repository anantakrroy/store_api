CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password_digest VARCHAR NOT NULL
);