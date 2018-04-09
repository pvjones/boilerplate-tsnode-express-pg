CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  meta json NOT NULL,
  username text,
  first_name text,
  last_name text,
)