import fs from "fs";
import path from "path";


import sqlToJSON from '@/utils/sql-to-json'


var filebuffer = fs.readFileSync(path.join(__static, '/order.db'));


function print(data1, data2) {
  console.log(data1);
  console.log(data2);
}

export var config = {
  // 指定加载sql-wasm.wasm文件的位置
  locateFile: filename => `./static/js/${filename}`
};



export function get_db(SQL) {
  // 加载数据库到内存中
  return new SQL.Database(filebuffer);
}



export function select(SQL, sql) {
  var db = get_db(SQL);
  var res = db.exec(sql);
  console
  res = sqlToJSON(res);
  return res;
}

export function alter(SQL, sql, data) {
  print(sql, data);
  var db = get_db(SQL);
  db.run(sql, data)
  var data = db.export();
  var buffer = Buffer.from(data, 'binary');
  fs.writeFileSync(path.join(__static, '/order.db'), buffer);
}


export function selectAll(SQL, table) {
  var res = select(SQL, "SELECT * FROM " + table)
  print(res, table)
}

export function selectSort(SQL, table, listQuery) {
  var offset = listQuery.limit * (listQuery.page - 1)
  // var sql = "SELECT * FROM " + table + " WHERE name = '" + listQuery.name.toString() + "' ORDER BY id " + listQuery.sort + " LIMIT " + listQuery.limit + " OFFSET " + offset;

  var sql = "SELECT * FROM " + table + " ORDER BY id " + listQuery.sort + " LIMIT " + listQuery.limit + " OFFSET " + offset;
  var sql2 = "SELECT COUNT(*) FROM " + table
  print(sql, sql2)

  var res = select(SQL, sql)
  var total = select(SQL, sql2)

  var data = {};
  data.res = res;
  data.total = total;

  return data;
}

export function selectOne(SQL, sql, data) {
  var db = get_db(SQL)
  var stmt = db.prepare(sql);
  var res = stmt.getAsObject({ ':bval': data });

  return res;

}
