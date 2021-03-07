import initSqlJs from 'sql.js';

import { config, select, alter, selectSort, selectAll } from '@/utils/db'


var table = "order_customer"


export function getAll(listQuery) {

    return initSqlJs(config).then(SQL => {
        var sql = "SELECT * FROM " + table + " WHERE date>= '" + listQuery.startDate + "' AND date<= '" + listQuery.endDate + "'";

        return select(SQL, sql);
    });
}

export function getTag(listQuery) {

    return initSqlJs(config).then(SQL => {
        var sql = "SELECT "+listQuery.tag1+" AS tag , COUNT(1) AS total FROM " + table + " WHERE date>= '" + listQuery.startDate + "' AND date<= '" + listQuery.endDate + "' GROUP BY "+listQuery.tag1;

        console.log(sql)
        return select(SQL, sql);
    });
}


export function getTotal(listQuery) {

    return initSqlJs(config).then(SQL => {
        var sql = "SELECT profit,date FROM " + table + " WHERE date>= '" + listQuery.startDate + "' AND date<= '" + listQuery.endDate + "'";
        return select(SQL, sql);
    });
}
export function getCustmerTotal(listQuery) {

    return initSqlJs(config).then(SQL => {
        var sql = "SELECT customer_id,customer.name, SUM(profit) AS total FROM order_customer " +
            " JOIN customer ON order_customer.customer_id=customer.id WHERE date>= '" + listQuery.startDate + "' AND date<= '" + listQuery.endDate + "' GROUP BY customer_id ORDER BY SUM(profit) DESC ";

        return select(SQL, sql);
    });
}

export function getFactoryTotal(listQuery) {

    return initSqlJs(config).then(SQL => {
        var sql = "SELECT factory_id,factory.name ,SUM(profit) AS total FROM order_customer JOIN factory ON  order_customer.factory_id=factory.id  WHERE date>= '" + listQuery.startDate + "' AND date<= '" + listQuery.endDate + "' GROUP BY factory_id ORDER BY SUM(profit) DESC";

        return select(SQL, sql);
    });
}



