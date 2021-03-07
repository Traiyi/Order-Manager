import initSqlJs from 'sql.js';

import { config, select, alter, selectSort, selectAll } from '@/utils/db'


var table = "customer"


export function getCustomerAll(listQuery) {

  return initSqlJs(config).then(SQL => {
    return selectSort(SQL, table, listQuery);
  });
}



export function createCustomer(data) {

  return initSqlJs(config)
    .then(SQL => {
      var sql = "INSERT INTO customer VALUES(?,?,?)";
      var temp = [null, data.name, data.telephone]
      alter(SQL, sql, temp)
    });
}

export function updateCustomer(data) {
  return initSqlJs(config).then(SQL => {
    var sql = "UPDATE customer  SET name=(?),telephone=(?) WHERE id=(?)";
    var temp = [data.name, data.telephone, data.id];
    alter(SQL, sql, temp)
  });
}

export function deleteCustomer(id) {
  return initSqlJs(config).then(SQL => {
    var sql = "DELETE from customer  WHERE id=(?)";
    console.log(sql);
    var temp = [id]
    alter(SQL, sql, temp)
    selectAll(SQL, table)
  });
}

