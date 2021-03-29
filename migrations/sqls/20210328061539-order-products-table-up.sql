CREATE TABLE order_products(
    id serial PRIMARY KEY,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);