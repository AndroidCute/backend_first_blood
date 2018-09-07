'use strict';

const { tables, create, getAll, modify, getOne, deleteOne } = require('../utils/mysqlKit');
const { goodsStatus } = require('../utils/status');

module.exports = app => {
  class student extends app.Service {
    * create(goodsInfo, id) {
      try {
        const res = yield create(app, tables.student, {
          name: goodsInfo.name,
          card : goodsInfo.card,
          sex : goodsInfo.sex,
          age : goodsInfo.age,
          native : goodsInfo.native,
          science : goodsInfo.science,
          specialty : goodsInfo.specialty,
          class : goodsInfo.class,
        });
        return res.affectedRows;
      } catch (e) {
        app.logger.error("create err:", e)
        return false;
      }
    }

    * getAll() {
      try {
        return yield getAll(app, tables.student);
      } catch (e) {
        return null;
      }
    }

    * modify(goodsInfo) {
      const now = new Date();
      try {
        const goods = yield getOne(app, tables.student, { id: goodsInfo.id });
        console.log(goodsInfo);
        const res = yield modify(app, tables.student, {
          id: goodsInfo.id,
          name: goodsInfo.name ? goodsInfo.name : goods.name,
          card : goodsInfo.card ? goodsInfo.card : goods.card,
          sex : goodsInfo.sex ? goodsInfo.sex : goods.sex,
          age : goodsInfo.age ? goodsInfo.age : goods.age,
          native : goodsInfo.native ? goodsInfo.native : goods.native,
          science : goodsInfo.science ? goodsInfo.science : goods.science,
          specialty : goodsInfo.apecialty ? goodsInfo.specialty : goods.specialty,
          class : goodsStatus.class ? goodsInfo.class : goods.class,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * delete (id) {
      try {
        const res = yield deleteOne(app, tables.student, {
          id,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

  }
  return student;
};
