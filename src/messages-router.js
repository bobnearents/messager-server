'use strict';

const path = require('path');
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
      .getAllMessagers(knexInstance)
      .then(messages => {
        res.json(messages);
      })
      .catch(next);
  })

  .post(requireAuth, jsonParser, (req, res, next) => {
    const { content } = req.body;
    const newMessage = { content, user_id: req.user.id };
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
module.exports = messsagesRouter;