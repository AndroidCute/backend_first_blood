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
 *     Initial: 2017/08/04        Li Zhaoxia
 */

'use strict';

const { tables, create, modify, getOne } = require('../utils/mysqlKit');
const { indentStatus } = require('../utils/status');

module.exports = app => {
  class indent extends app.Service {
    * create (indentInfo, id) {
      try {
        const res = yield create(app, tables.indent, {
          name: indentInfo.name,
          price: indentInfo.price,
          bought: indentInfo.bought,
          userid: id,
          goodsid: indentInfo.goodsid,
          status: indentStatus.NORMAL,
          address: indentInfo.address,
          allprice: indentInfo.price * indentInfo.bought
        })
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * bought (id) {
      try {
        const res = yield modify(app, tables.indent, {
          id,
          status: indentStatus.BANNED
      });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * get (id) {
      try {
        const res1 = yield getOne(app, tables.indent, {id});
        return res1;
    } catch (e) {
        return false;
      }
    }

    * countmodify (res1) {
      try{
        const goods = yield getOne(app, tables.goods, { id: res1.goodsid });
        const res = yield modify(app, tables.goods, {
          id: res1.goodsid,
          count: goods.count-res1.bought,
          bought: goods.bought+res1.bought,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

  }
  return indent;
}
