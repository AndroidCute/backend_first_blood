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

const {
  tables,
  getOne,
  getAll,
  modify,
  getConn,
} = require('../utils/mysqlKit');

const { getToken } = require('../utils/jwt');
const { aesEncrypt, aesDecrypt } = require('../utils/aes');
const { userStatus } = require('../utils/status');

module.exports = app => {
  class User extends app.Service {
    * register(nickname, mobile, password) {
      const conn = yield getConn(app);
      const pass = aesEncrypt(password);
      try {
        yield conn.insert(tables.user, { nickname, mobile, password: pass });
        const user = yield conn.get(tables.user, { mobile });
        yield conn.insert(tables.userInfo, { id: user.id, nickname, mobile });
        yield conn.commit();
      } catch (e) {
        console.log(e);
        yield conn.rollback();
        return false;
      }
      return true;
    }

    * searchUserById(id) {
      return yield getOne(app, tables.user, { id });
    }

    * getAllUser() {
      try {
        const res = yield getAll(app, tables.user, {
          status: userStatus.NORMAL,
        });
        return res.map(function(ele) {
          return {
            id: ele.id,
            nickname: ele.nickname,
            mobile: ele.mobile,
            status: ele.status,
          };
        });
      } catch (error) {
        return null;
      }
    }

    * modifyPassword(id, oldpass, newpass) {
      try {
        const info = yield getOne(app, tables.user, { id });
        if (aesDecrypt(info.password) === oldpass) {
          const pass = aesEncrypt(newpass);
          const res = yield modify(app, tables.user, { id, password: pass });
          return res.affectedRows;
        }
        return false;
      } catch (e) {
        return false;
      }
    }

    * ban(id) {
      try {
        const res = yield modify(app, tables.user, {
          id,
          status: userStatus.BANNED,
        });
        return res.affectedRows;
      } catch (error) {
        return false;
      }
    }

    * resume(id) {
      try {
        const res = yield modify(app, tables.user, {
          id,
          status: userStatus.NORMAL,
        });
        return res.affectedRows;
      } catch (error) {
        return false;
      }
    }

    * deleteUser(id) {
      try {
        const res = yield modify(app, tables.user, {
          id,
          status: userStatus.DELETED,
        });
        return res.affectedRows;
      } catch (error) {
        return false;
      }
    }

    * login(mobile, password) {
      try {
        const res = yield getOne(app, tables.user, { mobile });
        if (aesDecrypt(res.password) === password) {
          return getToken(app, res.id);
        }
        return false;
      } catch (error) {
        return false;
      }
    }

    * modifyInfo(id, mobile) {
      const conn = yield getConn(app);
      try {
        yield conn.update(tables.user, { id, mobile });
        yield conn.update(tables.userInfo, { id, mobile });
        yield conn.commit();
        return true;
      } catch (error) {
        yield conn.rollback();
        return false;
      }
    }

    * getUserInfoById(id) {
      try {
        const res = yield getOne(app, tables.userInfo, {
          id,
        });
        return res;
      } catch (e) {
        return null;
      }
    }
  }
  return User;
};
