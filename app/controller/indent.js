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

const { checkParams, newErrorWithMessage, error, operateCode } = require('../utils/error');

module.exports = app=> {
  class indentController extends app.Controller {
    * create() {
      const { ctx } = this;
      const indentInfo = ctx.request.body;
      if (!checkParams(indentInfo.name, indentInfo.price, indentInfo.bought, indentInfo.goodsid, indentInfo.address)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const token = ctx.state.user;
      const res = yield ctx.service.indent.create(indentInfo, token.id);

      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * bought() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.indent.bought(id);
      if (res) {
        const res1 = yield ctx.service.indent.get(id);
        if (res1) {
          const res2 = yield ctx.service.indent.countmodify(res1);
          if (res2) {
            ctx.body = newErrorWithMessage(error.ErrSucceed);
          }
        }
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

  }
  return indentController;
}


