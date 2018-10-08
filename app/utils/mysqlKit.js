/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/07/30        Tang Xiaoji
 */

'use strict';

const tables = {
  user: 'user',
  userInfo: 'userinfo',
  address: 'address',
  goods: 'goods',
  avatar: 'avatar',
  indent: 'indent',
  student: 'student',
};

function* create(app, tableName, payload) {
  let res;
  try {
    res = yield app.mysql.insert(tableName, payload);
  } catch (e) {
    res = e;
    throw e;
  }
  return res;
}

function* getOne(app, tableName, payload) {
  let res;
  try {
    res = yield app.mysql.get(tableName, payload);
  } catch (e) {
    res = e;
    throw e;
  }
  return res;
}

function* getAll(app, tableName, where) {
  let res;
  try {
    res = yield app.mysql.select(tableName, { where });
  } catch (e) {
    res = e;
    throw e;
  }
  return res;
}

function* modify(app, tableName, payload) {
  let res;
  try {
    res = yield app.mysql.update(tableName, payload);
  } catch (e) {
    res = e;
    throw e;
  }
  return res;
}

function* deleteOne(app, tableName, payload) {
  let res;
  try {
    res = yield app.mysql.delete(tableName, payload);
  } catch (e) {
    res = e;
    throw e;
  }
  return res;
}

function* getConn(app) {
  return yield app.mysql.beginTransaction();
}

function* pieAgeCount(app) {
  let age21;
  let age22;
  let age23;
  let age24;
  let res;
  let statistics=[];
  try {
    age21 = yield app.mysql.query(' select count(1) from student where age=21');
    age22 = yield app.mysql.query(' select count(1) from student where age=22');
    age23 = yield app.mysql.query(' select count(1) from student where age=23');
    age24 = yield app.mysql.query(' select count(1) from student where age=24');
    statistics.push({ age: 21, count: age21 });
    statistics.push({ age: 22, count: age22 });
    statistics.push({ age: 23, count: age23 });
    statistics.push({ age: 24, count: age24 });
  } catch (e) {
    throw e;
  }
  res = statistics;
  return res;
}

module.exports = {
  tables,

  create,
  getOne,
  getAll,
  modify,
  deleteOne,
  pieAgeCount,
  getConn,
};
