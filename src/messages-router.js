'use strict';

const express = require('express');
const messagesService = require('./messages-service');
const { requireAuth } = require('../middleware/basic-auth');

const messsagesRouter = express.Router();
const jsonParser = express.json();

messsagesRouter
  .route('/messages')

  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    messagesService
      .getAllMessages(knexInstance)
      .then(messages => {
        res.json(messages);
      })
      .catch(next);
  })

  .post(requireAuth, jsonParser, (req, res, next) => {
    const { content, room_id } = req.body;
    const newMessage = { content, room_id, user_id: req.user.id };
    messagesService
      .insertMessage(req.app.get('db'), newMessage)
      .then(message => {
        res.status(201).json(message);
      })
      .catch(next);
  });
messsagesRouter
  .route('/signup')

  .post(jsonParser, (req, res, next) => {
    const { username, password, full_name, nickname } = req.body;
    const newUser = { username, password, full_name, nickname };
    messagesService
      .addUser(req.app.get('db'), newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(next);
  });

messsagesRouter
  .route('/rooms')

  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    messagesService
      .getAllRooms(knexInstance)
      .then(rooms => {
        res.json(rooms);
      })
      .catch(next);
  })

  .post(requireAuth, jsonParser, (req, res, next) => {
    const { name } = req.body;
    const newRoom = { name };
    messagesService
      .createRoom(req.app.get('db'), newRoom)
      .then(room => {
        res.status(201).json(room);
      })
      .catch(next);
  });
  
module.exports = messsagesRouter;