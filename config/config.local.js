'use strict';

exports.mysql = {
  client: {
      host: '127.0.0.1',
      port: '3307',
      user: 'root',
      password: '111111',
      database: 'student',
  },
  app: true,
  agent: false,
};

exports.jwt = {
  secret: 'student',
  enable: true,
  match: '/auth',
};
