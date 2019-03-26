'use strict';

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  //DB_URL: process.env.DATABASE_URL || 'postgresql://bobnearents@localhost/messager-aim',
  DB_URL: process.env.PROD_MIGRATION_DB_HOST,
  JWT_SECRET: process.env.JWT_SECRET
}; 
