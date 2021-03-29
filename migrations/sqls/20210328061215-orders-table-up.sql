CREATE TABLE orders(
    id serial PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    status VARCHAR(15) NOT NULL CHECK(status = 'active' OR status = 'completed')
);