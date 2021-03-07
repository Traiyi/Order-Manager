import fs from "fs";
import path from "path";
import initSqlJs from 'sql.js';

import sqlToJSON from '@/utils/sql-to-json'

var filebuffer = fs.readFileSync(path.join(__static, '/order.db'));

var config = {
  // 指定加载sql-wasm.wasm文件的位置
  locateFile: filename => `./static/js/${filename}`
};
function save(db) {
  var data = db.export();
  var buffer = Buffer.from(data, 'binary');
  fs.writeFileSync(path.join(__static, '/order.db'), buffer);
}

function select(db) {
  var res = db.exec("SELECT * FROM order_factory");
  console.log(res);
  res = sqlToJSON(res);
  return res;
}

function print(sql, data) {
  console.log(sql);
  console.log(data);
}

export function getAll() {

  return initSqlJs(config).then(SQL => {

    // 加载数据库到内存中
    var db = new SQL.Database(filebuffer);
    return select(db);
  });
}



export function createOrderFactory(data) {

  return initSqlJs(config).then(SQL => {
    // 加载数据库到内存中
    var db = new SQL.Database(filebuffer);
    var sql = "INSERT INTO order_factory VALUES(?,?,?,?,?)";
    console.log(sql);
    db.run(sql, [null, data.order_factoryname, data.password, data.status, data.name]);
   print(sql, data)
    save(db)
    return select(db);
  });
}

export function updateOrderFactory(data) {
  console.log(data);
  return initSqlJs(config).then(SQL => {
    // 加载数据库到内存中
    var db = new SQL.Database(filebuffer);
    var sql = "UPDATE order_factory  SET order_factoryname=(?),password=(?), status=(?), name=(?)  WHERE id=(?)";
    console.log(sql);
    db.run(sql, [data.order_factoryname, data.password, data.status, data.name, data.id]);
   print(sql, data)
    save(db)
    return select(db);
  });
}

export function deleteOrderFactory(id) {
  console.log(id);
  return initSqlJs(config).then(SQL => {
    // 加载数据库到内存中
    var db = new SQL.Database(filebuffer);
    var sql = "DELETE from order_factory  WHERE id=(?)";
    console.log(sql);
    db.run(sql, [id]);
   print(sql, data)
    save(db)
    return select(db);
  });
}

