'use strict';

const messagesService = {

  getAllMessagers(knex){
    return knex.select('messages.*','users.nickname').from('messages').leftJoin('users', 'users.id', 'messages.user_id');
  },

  insertMessage(knex, newMessage) {
    return knex
      .insert({content: newMessage.content, user_id:newMessage.user_id})
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
  }
};

module.exports = messagesService;