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
 *     Initial: 2017/08/01        Tang Xiaoji
 */

'use strict';

const { operateCode, newErrorWithMessage, error, checkParams } = require('../utils/error');

module.exports = app => {
  class AddressController extends app.Controller {
    * create() {
      const { ctx } = this;
      const addrInfo = ctx.request.body;
      if (!checkParams(addrInfo.name, addrInfo.mobile, addrInfo.province, addrInfo.city, addrInfo.street, addrInfo.address)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      const token = ctx.state.user;
      const res = yield ctx.service.address.create(addrInfo, token.id);
      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * modify() {
      const { ctx } = this;
      const addrInfo = ctx.request.body;
      if (!checkParams(addrInfo.id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      const res = yield ctx.service.address.modify(addrInfo);
      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * setDefault() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      const res = yield ctx.service.address.setDefault(id);
      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * getAll() {
      const { ctx } = this;
      const res = yield ctx.service.address.getAllAddr();
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * delete() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      const res = yield ctx.service.address.delete(id);
      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }
  }
  return AddressController;
};
