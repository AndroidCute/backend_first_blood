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

const { error, newErrorWithMessage, checkParams, operateCode } = require('../utils/error');

module.exports = app => {
  class UserController extends app.Controller {
    * register() {
      const { ctx } = this;
      const { nickname, mobile, password } = ctx.request.body;
      if (!checkParams(nickname, mobile, password)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.register(nickname, mobile, password);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * searchUserById() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.searchUserById(id);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysqlfound);
      }
    }

    * getAllUser() {
      const { ctx } = this;
      const res = yield ctx.service.user.getAllUser();
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrNotFound);
      }
    }

    * modifyPassword() {
      const { ctx } = this;
      const { code, oldpass, newpass } = ctx.request.body;
      const token = ctx.state.user;
      if (!checkParams(code, oldpass, newpass)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      if (oldpass === newpass) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      if (!token) {
        ctx.body = newErrorWithMessage(error.ErrLoginRequired);
        return;
      }

      const res = yield ctx.service.user.modifyPassword(token.id, oldpass, newpass);

      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
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
      const res = yield ctx.service.user.deleteUser(id);
      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrDelete);
      }
    }

    * ban() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      const res = yield ctx.service.user.ban(id);
      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * resume() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      const res = yield ctx.service.user.resume(id);
      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * login() {
      const { ctx } = this;
      const { mobile, password } = ctx.request.body;
      if (!checkParams(mobile, password)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.login(mobile, password);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
      }
    }

    * modifyInfo() {
      const { ctx } = this;
      const { mobile } = ctx.request.body;
      const token = ctx.state.user;
      if (!token) {
        ctx.body = newErrorWithMessage(error.ErrLoginRequired);
        return;
      }

      const res = yield ctx.service.user.modifyInfo(token.id, mobile);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    // 根据 id 获取用户
    * getUserInfoById() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      const res = yield ctx.service.user.getUserInfoById(id);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    // 获取当前登录用户的信息
    * info() {
      const { ctx } = this;
      const token = ctx.state.user;
      if (!token) {
        ctx.body = newErrorWithMessage(error.ErrLoginRequired);
        return;
      }

      const res = yield ctx.service.user.getUserInfoById(token.id);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * testAuth() {
      const { ctx } = this;
      ctx.body = ctx.state.user;
    }
  }
  return UserController;
};
