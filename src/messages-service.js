'use strict';
// eslint-disable-next-line no-useless-escape
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]/;
const xss = require('xss');
const bcrypt = require('bcryptjs');
const messagesService = {
  getAllMessages(knex, room_id) {
    return knex
      .select('messages.*', 'users.nickname', 'users.username')
      .from('messages')
      .where({room_id})
      .orderBy('date_created', 'desc')
      .leftJoin('users', 'users.id', 'messages.user_id');
  },

  getAllRooms(knex) {
    return knex.select('*').from('rooms');
  },

  insertMessage(knex, newMessage) {
    return knex
      .insert({
        content: newMessage.content,
        room_id: newMessage.room_id,
        user_id: newMessage.user_id
      })
      .into('messages')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  addUser(knex, newUser) {
    return knex
      .insert({
        full_name: newUser.full_name,
        username: newUser.username,
        password: newUser.password,
        nickname: newUser.nickname
      })
      .into('users')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  createRoom(knex, newRoom) {
    return knex
      .insert({
        name: newRoom.name
      })
      .into('rooms')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  validatePassword(password) {
    if (password.length < 8) {
      return 'Password be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;
  },
  hasUserWithUserName(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then(user => !!user);
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      full_name: xss(user.full_name),
      username: xss(user.user_name),
      nickname: xss(user.nick_name)
    };
  },
  serializeMessage(message) {
    return {
      id: message.id,
      content: xss(message.content),
      room_id: xss(message.room_id),
      user_id: xss(message.user_id), 
    };
  }
};

module.exports = messagesService;
