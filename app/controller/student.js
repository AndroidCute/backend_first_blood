'use strict';

const { checkParams, newErrorWithMessage, error, operateCode } = require('../utils/error');

module.exports = app => {
  class StudentController extends app.Controller {
    * create() {
      const { ctx } = this;
      const goodsInfo = ctx.request.body;
      if (!checkParams(goodsInfo.name, goodsInfo.card, goodsInfo.sex, goodsInfo.age, goodsInfo.native, goodsInfo.science, goodsInfo.specialty, goodsInfo.class)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const token = ctx.state.user;
      const res = yield ctx.service.student.create(goodsInfo, token.id);

      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * getAll() {
      const { ctx } = this;
      const res = yield ctx.service.student.getAll();
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * modify() {
      const { ctx } = this;
      const goodsInfo = ctx.request.body;
      if (!checkParams(goodsInfo.id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.student.modify(goodsInfo);

      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * deleted() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.student.delete(id);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

  }
  return StudentController;
};
