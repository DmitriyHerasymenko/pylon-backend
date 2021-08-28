create TABLE person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    mail VARCHAR(255),
    password VARCHAR(255)
);

create TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    mail VARCHAR(255)
);

create TABLE devices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users (id)
);