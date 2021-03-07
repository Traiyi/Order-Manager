import initSqlJs from 'sql.js';

import { config, select, alter, selectSort, selectAll, selectOne } from '@/utils/db'


var table = "user"

export function getUserAll(listQuery) {

  return initSqlJs(config).then(SQL => {
    return selectSort(SQL, table, listQuery);
  });
}


export function getOne(username) {

  return initSqlJs(config).then(SQL => {
    console.log('username',username)
    var sql = "SELECT * FROM user where username=:bval";
    return selectOne(SQL, sql, username);
  });
}

export function createUser(data) {

  return initSqlJs(config)
    .then(SQL => {
      var sql = "INSERT INTO user VALUES(?,?,?,?,?)";
      var temp = [null, data.username, data.password, data.status, data.name];
      alter(SQL, sql, temp)
    });
}

export function updateUser(data) {

  return initSqlJs(config).then(SQL => {
    var sql = "UPDATE user  SET username=(?),password=(?), status=(?), name=(?)  WHERE id=(?)";
    var temp = [data.username, data.password, data.status, data.name, data.id]
    alter(SQL, sql, temp)
  });
}

export function deleteUser(id) {
  return initSqlJs(config).then(SQL => {
    var sql = "DELETE from user  WHERE id=(?)";
    var temp = [id]
    alter(SQL, sql, temp)
  });
}

