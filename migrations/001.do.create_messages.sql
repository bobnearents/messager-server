CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL
--  room_id
);

--tables: rooms, users