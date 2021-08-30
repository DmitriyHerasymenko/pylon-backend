create TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    mail VARCHAR(255),
    password VARCHAR(255)
);

create TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    apikey VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users (id)
);