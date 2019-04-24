'use strict';

function makeMessagesArray() {
  return [
    {
      id:1,
      date_created: '2019-03-29T02:27:41.774Z',
      content: 'message',
      user_id:1,
      room_id:67,
    }
  ];
}

function makeRoomsArray() {
  return [
    {
      name: 'test',
      date_created: new Date()
    }
  ];
}

function makeUsersArray() {
  return [
    {
      id:1,
      full_name:'test user',
      password:'password',
      username:'testuser',
      nickname:'test'
    }
  ];
}

module.exports = {
  makeMessagesArray,
  makeRoomsArray,
  makeUsersArray
};
