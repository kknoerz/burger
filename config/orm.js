var connection = require('../config/connection.js');

var orm = {
  all: function(tableInput, cb) {
      var queryString = 'SELECT * FROM ' + tableInput + ';';
      connection.query(queryString, function(err, result) {
          if (err) throw err;
          cb(result);
      });
  },
  create: function(table, cols, vals, cb) {
      var queryString = 'INSERT INTO ' + table;

      queryString = queryString + ' (';
      queryString = queryString + cols.toString();
      queryString = queryString + ') ';
      queryString = queryString + 'VALUES ( ? );';

      // console.log(queryString)
      vals = vals.toString();
      connection.query(queryString, vals, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },
    update: function(table, objColVals, condition, cb) {
      // console.log('this is objColVals: ', objColVals);
      if(objColVals.devoured == 'true'){
        objColVals = 1
      }else{
        objColVals = 0
      }
      var queryString = 'UPDATE ' + table;

      queryString = queryString + ' SET ';
      queryString = queryString + 'devoured = '+ objColVals;
      queryString = queryString + ' WHERE ';
      queryString = queryString + condition;

      // console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    }
};

module.exports = orm;
