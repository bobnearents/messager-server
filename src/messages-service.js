'use strict';

const messagesService = {

  getAllMessages(knex){
    return knex.select('messages.*','users.nickname').from('messages').leftJoin('users', 'users.id', 'messages.user_id');
  },

  getAllRooms(knex){
    return knex.select('*').from('rooms');
  },

  insertMessage(knex, newMessage) {
    return knex
      .insert({content: newMessage.content,room_id:newMessage.room_id, user_id:newMessage.user_id})
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
        nickname: newUser.nickname})
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
  }
};

module.exports = messagesService;