CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
  --room_id
  --user_id
);