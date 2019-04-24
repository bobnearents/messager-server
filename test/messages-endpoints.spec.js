/* eslint-disable no-undef */
'use strict';
const app = require('../src/app');
const knex = require('knex');
const { makeMessagesArray, makeUsersArray, makeRoomsArray } = require('./messages.fixtures');

describe('App', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });

    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('messages').truncate());

  beforeEach('insert users', () => {
    const testUsers = makeUsersArray();
    console.log(testUsers);
    return db
      .into('users')
      .insert(testUsers);
  });

  beforeEach('insert rooms', () => {
    const testRooms = makeRoomsArray();
    return db
      .into('rooms')
      .insert(testRooms);
  });

  afterEach('cleanup', () => db('messages').truncate());
  afterEach('cleanup', () => db('rooms').truncate());
  afterEach('cleanup', () => db('users').truncate());


  describe('GET /messages', () => {
    context('Given no messages', () => {
      it('responds with 200 and an empty list', () => {

        return supertest(app)
          .get('/api/messages/1')
          .expect(200, []);
      });
    });

    context('Given there are messages in the database', () => {
      const testMessages = makeMessagesArray();


      beforeEach('insert messages', () => { 
        return db
          .into('messages')
          .insert(testMessages);
      });

      it('responds with 200 and all of the messages', () => {
        let expectedMessages = [...testMessages].forEach(message => {
          message.nickname = 'test';
          message.username = 'testuser';
          message.date_created = '2019-03-29T09:27:41.774Z';
        });

        return supertest(app)
          .get('/api/messages/1')
          .expect(200, testMessages);
      });

    });
    
  });
  describe('POST /messsages', () => { 
    it('creates a message', function() {
      const testMessages = makeMessagesArray();
      const newMessage = testMessages[0];
      console.log(newMessages);

      return supertest(app)
        .post('api/messages/1')
        .send(newMessage)
        .expect(201)
        .expect(res => {
          expect(res.body.content).to.eql(newMessage.content);
          expect(res.body).to.have.property('id');
          expect(res.headers.location).to.eql(`/messages/${res.body.id}`);
        })
        .then(res =>
          supertest(app)
            .get(`/articles/${res.body.id}`)
            .expect(res.body)
        );
    });
  });

  describe('POST /signup', () => {
    it('creates a user', function() {
      const testUsers = makeUsersArray();
      const newUser = testUsers[0];

      return supertest(app)
        .post('api/signup')
        .send(newUser)
        .expect(201)
        .expect(res => {
          expect(true);
        });
    });
  });

  describe('GET /rooms', () => {
    context('Given no rooms', () => {
      it('responds with 200 and an empty list', () => {

        return supertest(app)
          .get('/api/rooms/')
          .expect(200, []);
      });
    });

    context('Given there are rooms in the database', () => {
      const testRooms = makeRoomsArray();

      beforeEach('insert rooms', () => {
        return db
          .into('rooms')
          .insert(testRooms);
      });

      it('responds with 200 and all of the rooms', () => {

        return supertest(app)
          .get('/api/rooms/1')
          .expect(200, testRooms);
      });

    });

  });
});
