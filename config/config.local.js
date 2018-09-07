'use strict';

exports.mysql = {
  client: {
      host: '127.0.0.1',
      port: '13306',
      user: 'root',
      password: '',
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
