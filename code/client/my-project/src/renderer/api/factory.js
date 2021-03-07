import initSqlJs from 'sql.js';

import { config, select, alter, selectSort, selectAll } from '@/utils/db'


var table = "factory"

export function getFactoryAll(listQuery) {

  return initSqlJs(config).then(SQL => {
    return selectSort(SQL, table, listQuery);
  });
}



export function createFactory(data) {

  return initSqlJs(config)
    .then(SQL => {
      var sql = "INSERT INTO factory VALUES(?,?,?)";
      var temp = [null, data.name, data.telephone]
      alter(SQL, sql, temp)
    });
}

export function updateFactory(data) {

  return initSqlJs(config)
    .then(SQL => {
      var sql = "UPDATE factory  SET name=(?),telephone=(?) WHERE id=(?)";
      console.log(sql);
      var temp = [data.name, data.telephone, data.id]
      alter(SQL, sql, temp)
    });
}

export function deleteFactory(id) {

  return initSqlJs(config)
    .then(SQL => {
      var sql = "DELETE from factory  WHERE id=(?)";
      var temp = [id]
      alter(SQL, sql, temp)
    });
}

