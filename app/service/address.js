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
 *     Initial: 2017/08/01       Tang Xiaoji
 */

'use strict';

const { create, modify, getAll, getOne, tables } = require('../utils/mysqlKit');
const { addrStatus } = require('../utils/status');
const { operateCode } = require('../utils/error');

module.exports = app => {
  class Address extends app.Service {
    * create(addrInfo, id) {
      try {
        const res = yield create(app, tables.address, {
          name: addrInfo.name,
          userid: id,
          mobile: addrInfo.mobile,
          province: addrInfo.province,
          city: addrInfo.city,
          street: addrInfo.street,
          address: addrInfo.address,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * modify(addrInfo) {
      const now = new Date();
      try {
        const addr = yield getOne(app, tables.address, { id: addrInfo.id });
        const res = yield modify(app, tables.address, {
          id: addrInfo.id,
          name: addrInfo.name ? addrInfo.name : addr.name,
          mobile: addrInfo.mobile ? addrInfo.mobile : addr.mobile,
          province: addrInfo.province ? addrInfo.province : addr.province,
          city: addrInfo.city ? addrInfo.city : addr.city,
          street: addrInfo.street ? addrInfo.street : addr.street,
          address: addrInfo.address ? addrInfo.address : addr.address,
          status: addrInfo.status ? addrInfoInfo.status : addr.status,
          updated: now,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * setDefault(id) {
      try {
        const addr = yield getOne(app, tables.address, {
          status: addrStatus.DEFAULT,
        });

        if (addr && addr.id === id) {
          return operateCode.SUCCESS_AFFECTED_ROWS;
        }

        if (addr && addr.id && addr.id !== id) {
          yield modify(app, tables.address, {
            id: addr.id,
            status: addrStatus.NORMAL,
          });
        }

        const res = yield modify(app, tables.address, {
          id,
          status: addrStatus.DEFAULT,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * getAllAddr() {
      try {
        return yield getAll(app, tables.address, {
          status: [ addrStatus.NORMAL, addrStatus.DEFAULT ],
        });
      } catch (e) {
        return null;
      }
    }

    * delete(id) {
      try {
        const res = yield modify(app, tables.address, {
          id,
          status: addrStatus.DELETED,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }
  }
  return Address;
};
