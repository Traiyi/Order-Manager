export default function (res) {


    // console.log(res);
    // console.log(JSON.stringify(res));
    // console.log(res[0]['columns']);
    // console.log(res[0]['values']);

    var columns = res[0]['columns'];
    var values = res[0]['values'];

    var array = [];

    for (var i = 0; i < values.length; i++) {
        // console.log(values[i]);
        var object = {};
        for (let j = 0; j < values[i].length; j++) {
            // if (j == 0) {
                // console.log(values[i][j])
                // object[columns[j]] = Number(values[i][j]);
            // }
            // else {
                object[columns[j]] = values[i][j];
            // }
        }
        // console.log(object);
        array[i] = object;
        object = {};
    }


    return array;
}