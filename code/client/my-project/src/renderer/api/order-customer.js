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
  var res = db.exec("SELECT * FROM order_customer");
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



export function createOrderCustomer(data) {

  return initSqlJs(config).then(SQL => {
    // 加载数据库到内存中
    var db = new SQL.Database(filebuffer);
    var sql = "INSERT INTO order_customer VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.run(sql, [null, data.customer_id, data.factory_id, data.is_factory

      , data.business_nature, data.brand, data.country, data.inquiry_number, data.date, data.pape_bag_form, data.the_size_of_the_inquiry, data.adjusted_dimensions, data.quantity, data.paper, data.paper_price, data.double_sided_glue, data.double_sided_glue_length, data.g_weight, data.handle, data.handle_color, data.handle_print, data.print_color, data.print_area, data.print_surface, data.the_color_printed_inside_the_paper_bag, data.the_area_printed_inside_the_paper_bag, data.light_oil, data.the_color_of_the_bronzing, data.the_area_of_the_bronzing, data.press, data.the_number_of_per_box, data.gw_kgs, data.carton_specification_cm, data.factory_with_tax_price, data.shipping, data.the_cost_of_the_sample, data.royalties, data.delivery, data.exchange_rate, data.quote_rmb, data.quote_usd, data.profit
    ]);
    // save(db);
    print(sql, data)
    save(db)
    return select(db);
  });
}

export function updateOrderCustomer(data) {
  console.log(data);
  return initSqlJs(config).then(SQL => {
    // 加载数据库到内存中
    var db = new SQL.Database(filebuffer);
    var sql = "UPDATE order_customer  SET customer_id=(?),factory_id=(?), is_factory=(?)  WHERE id=(?)";
    console.log(sql);
    db.run(sql, [data.customer_id, data.factory_id, data.is_factory, data.id]);
    print(sql, data)
    save(db)
    return select(db);
  });
}

export function deleteOrderCustomer(id) {
  console.log(id);
  return initSqlJs(config).then(SQL => {
    // 加载数据库到内存中
    var db = new SQL.Database(filebuffer);
    var sql = "DELETE from order_customer  WHERE id=(?)";
    console.log(sql);
    db.run(sql, [id]);
    print(sql, id)
    save(db)
    return select(db);
  });
}

