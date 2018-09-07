/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/07/29        Tang Xiaoji
 */

'use strict';

module.exports = app => {
  const auth = app.middlewares.auth();

  // user
  app.post('/user/register', 'user.register');
  app.post('/user/user', app.jwt, 'user.searchUserById');
  app.get('/user/all', app.jwt, 'user.getAllUser');
  app.post('/user/password/modify', app.jwt, 'user.modifyPassword');
  app.post('/user/delete', app.jwt, 'user.delete');
  app.post('/user/ban', app.jwt, 'user.ban');
  app.post('/user/resume', app.jwt, 'user.resume');
  app.post('/user/login', 'user.login');
  app.post('/user/userinfo/modify', app.jwt, 'user.modifyInfo');
  app.post('/user/userinfo/get', app.jwt, 'user.getUserInfoById'); // 根据 id 获取用户信息
  app.get('/user/info', app.jwt, 'user.info'); // 获取当前登录用户的信息
  app.get('/auth', app.jwt, auth, 'user.testAuth');

  // address
  app.post('/address/create', app.jwt, 'address.create');
  app.post('/address/modify', app.jwt, 'address.modify');
  app.post('/address/default', app.jwt, 'address.setDefault');
  app.get('/address/all', app.jwt, 'address.getAll');
  app.post('/address/delete', app.jwt, 'address.delete');

  // goods
  app.post('/goods/create', app.jwt, 'goods.create');
  app.get('/goods/getAll', app.jwt, 'goods.getAll');
  app.post('/goods/modify', app.jwt, 'goods.modify');
  app.post('/goods/deleted', app.jwt,'goods.deleted');
  app.post('/goods/banned', app.jwt, 'goods.banned');
  app.post('/goods/unbanned', app.jwt, 'goods.unbanned');

  // avatar
  app.resources('avatar', '/avatar', app.controller.avatar);

  // indent
  app.post('/indent/cteate', app.jwt, 'indent.create');
  app.post('/indent/bought', app.jwt, 'indent.bought');

  // test
  app.get('/test/multiQuery', 'test.multiQuery');
  app.get('/test/multiInsert', 'test.multiInsert');
  app.get('/test/knex', 'test.knexTest');
};
