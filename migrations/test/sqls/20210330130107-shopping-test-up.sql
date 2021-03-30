CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE products(
    id serial PRIMARY KEY,
    name VARCHAR NOT NULL,
    price NUMERIC NOT NULL
);

CREATE TABLE orders(
    id serial PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    status VARCHAR(15) NOT NULL CHECK(status = 'active' OR status = 'completed')
);

CREATE TABLE order_products(
    id serial PRIMARY KEY,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);