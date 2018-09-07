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
 *     Initial: 2017/08/03        Li Zhaoxia
 */

'use strict';

const { tables, create, getAll, modify, getOne } = require('../utils/mysqlKit');
const { goodsStatus } = require('../utils/status');

module.exports = app => {
  class goods extends app.Service {
    * create(goodsInfo, id) {
      try {
        const res = yield create(app, tables.goods, {
          name: goodsInfo.name,
          price: goodsInfo.price,
          desc: goodsInfo.desc,
          count: goodsInfo.count,
          bought: goodsInfo.bought,
          userid: id,
          status: goodsStatus.NORMAL,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * getAll() {
      try {
        return yield getAll(app, tables.goods, {
          status: [ goodsStatus.NORMAL ],
        });
      } catch (e) {
        return null;
      }
    }

    * modify(goodsInfo) {
      const now = new Date();
      try {
        const goods = yield getOne(app, tables.goods, { id: goodsInfo.id });
        console.log(goodsInfo);
        const res = yield modify(app, tables.goods, {
          id: goodsInfo.id,
          name: goodsInfo.name ? goodsInfo.name : goods.name,
          price: goodsInfo.price ? goodsInfo.price : goods.price,
          count: goodsInfo.count ? goodsInfo.count : goods.count,
          bought: goodsInfo.bought ? goodsInfo.bought : goods.bought,
          userid: goodsInfo.userid ? goodsInfo.userid : goods.userid,
          desc: goodsInfo.address ? goodsInfo.address : goods.desc,
          updated: now,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * delete (id) {
      try {
        const res = yield modify(app, tables.goods, {
          id,
          status: goodsStatus.DELETED,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * banned (id) {
      try {
        const res = yield modify(app, tables.goods, {
          id,
          status: goodsStatus.BANNED,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * unbanned (id) {
      try{
        const res = yield modify(app, tables.goods, {
          id,
          status: goodsStatus.NORMAL,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

  }
  return goods;
};
