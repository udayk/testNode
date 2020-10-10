var express = require("express");
var router = express.Router();
var pg = require("pg");

const connection = require('../config/db.config')

router.get('/getObjectType/getPolicies/:object_id', function (req, res, next) {
  var objectId = req.params.object_id
  //console.log("for der 1 list :",objectId);       
  connection.query('SELECT * from fun_get_policy_details_tab($1);', [objectId], function (error, table) {
    if (!!error) {
      console.log("error in get policy object query" + error.stack);
    } else {
      //console.log("table data ",table) ;      
      res.send(table.rows);
    }
  });
});


router.get('/getNames', function (req, res, next) {
  const table_name = req.query.tableValue
  const policy_name = req.query.policyResult
  console.log("query string for names...", table_name);
  console.log("query string for policy in names...", policy_name);
  connection.query('SELECT * from fun_get_names_list_tab($1,$2)', [table_name, policy_name], function (error, table) {
    if (!!error) {
      console.log("error in query" + error.stack);
    } else {
      //console.log("");
      //console.log(table.rows);
      res.send(table.rows);
    }
  });
});

router.get('/getRevision', function (req, res, next) {
  //console.log("In revision ... request object"+req.params.nameValue);
  //console.log("In revision ... request object"+req.params.tableName);
  const table_name = req.query.tableName;
  const nameValue = req.query.nameValue;
  const policy = req.query.policy;
  //  const queryString = 'select distinct revision from '+table_name+' where name ='+nameValue+' order by revision desc';
  console.log("query string for names...", table_name);
  connection.query('SELECT * from fun_get_revisions_list_tab($1,$2,$3)', [table_name, nameValue, policy], function (error, table) {
    if (!!error) {
      console.log("error in query" + error.stack);
    } else {
      //console.log("In Revision",table.rows);
      res.send(table.rows);
    }
  });
});


//const db = pgp(connectionString);
router.get('/getObjectType', function (req, res, next) {
  /* const user_id = req.params.user_id */
  console.log("req headers",req.headers['authorization']);
  console.log("req auth Info",req.authInfo);
  connection.query('SELECT * from fun_get_type_list_tab();', function (error, table) {
    if (!!error) {
      console.log("error in get object query" + error.stack);
    } else {
      //console.log("table data ",table.rows) ;      
      res.send(table.rows);
    }
  });
});


router.get('/getObjectType/getDer1/:object_id',function (req, res, next) {
  var objectId = req.params.object_id
  // console.log("for der 1 list :",objectId);       
  // connection.query('SELECT * from fun_get_der1_list_tab($1);',[objectId],function(error,table){
  connection.query('SELECT * from fun_get_derivative_list_tab($1,$2);', [objectId, 'der1'], function (error, table) {
    if (!!error) {
      console.log("error in get object query" + error.stack);
    } else {
      //console.log("table data ",table) ;      
      res.send(table.rows);
    }
  });
});

router.get('/getObjectType/getDer2/:der1_id', function (req, res, next) {
  var Der1Id = req.params.der1_id
  //console.log("For der 2 ",Der1Id);       
  // connection.query('SELECT * from fun_get_der2_list_tab($1);',[Der1Id],function(error,table){
  connection.query('SELECT * from fun_get_derivative_list_tab($1,$2);', [Der1Id, 'der2'], function (error, table) {
    if (!!error) {
      console.log("error in get object query" + error.stack);
    } else {
      //console.log("table data ",table) ;      
      res.send(table.rows);
    }
  });
});


router.get('/getObjectType/getDer3/:der2_id', function (req, res, next) {
  var Der2Id = req.params.der2_id
  // console.log("For der 3 ",Der2Id);       
  // connection.query('SELECT * from fun_get_der3_list_tab($1);',[Der2Id],function(error,table){
  connection.query('SELECT * from fun_get_derivative_list_tab($1,$2);', [Der2Id, 'der3'], function (error, table) {
    if (!!error) {
      console.log("error in get object query" + error.stack);
    } else {
      //console.log("table data ",table) ;      
      res.send(table.rows);
    }
  });
});

router.get('/getObjectType/getDer4/:der3_id',function (req, res, next) {
  var Der3Id = req.params.der3_id
  //console.log("For der 4 ",Der3Id);       
  // connection.query('SELECT * from fun_get_der4_list_tab($1);',[Der3Id],function(error,table){
  connection.query('SELECT * from fun_get_derivative_list_tab($1,$2);', [Der3Id, 'der4'], function (error, table) {
    if (!!error) {
      console.log("error in get object query" + error.stack);
    } else {
      //console.log("table data ",table) ;      
      res.send(table.rows);
    }
  });
});


router.get('/getHeaderNames/:objectId', function (req, res, next) {
  var objectId = req.params.objectId
  //console.log("In header names data...");        
  // connection.query('select * from load_nut_part where name=$1',[nameValue],function(error,table){
  connection.query('select * from fun_get_attribute_list_tab($1);', [objectId], function (error, table) {
    if (!!error) {
      console.log("error in get object query" + error.stack);
    } else {
      //console.log("table data ",table) ;      
      res.send(table.rows);
    }
  });
});

router.get('/getPopupHeaderNames/:tableId', function (req, res, next) {
  var tableId = req.params.tableId
  console.log("In popup header names table Id...",tableId);        
  // connection.query('select * from load_nut_part where name=$1',[nameValue],function(error,table){
    connection.query('select * from fun_get_attr_list_display_details_tab($1);', [tableId], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        console.log("display popup ui names ", table.rows);
        res.send(table.rows);
      }
    });
});

router.get('/getSearchData', function (req, res, next) {
  //console.log("In revision value ... request object>>"+req.query.revisionValue);
  //  console.log("In revision ... request object"+req.query.tableValue);
  var objectId = req.query.objectId;
  var tableValue = req.query.tableValue;
  var policyResult = req.query.policyResult;
  var nameValue = req.query.nameValue;
  var revisionValue = req.query.revisionValue;
  var latestRevision = req.query.latestRevision;

  console.log("In search data...", objectId, tableValue, policyResult, nameValue, revisionValue, latestRevision);
  // connection.query('select * from load_nut_part where name=$1',[nameValue],function(error,table){
  if (objectId == 1) {
    connection.query('select * from fun_get_data_part_final_search($1,$2,$3,$4,$5,$6) order by name,revision desc;', [objectId, tableValue, policyResult, nameValue, revisionValue, latestRevision], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        //console.log(connection.query('select * from fun_get_data_part_final_search($1,$2,$3,$4,$5,$6);',[objectId,tableValue,policyResult,nameValue,revisionValue,latestRevision]));
        //console.log("searched data for Part ", table.rows);
        res.send(table.rows);
      }
    });
  } else if (objectId == 2) {
    connection.query('select * from fun_get_data_part_master_final_search($1,$2,$3,$4,$5,$6) order by name,revision desc;', [objectId, tableValue, policyResult, nameValue, revisionValue, latestRevision], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        //console.log(connection.query('select * from fun_get_data_part_final_search($1,$2,$3,$4,$5,$6);',[objectId,tableValue,policyResult,nameValue,revisionValue,latestRevision]));
        //console.log("searched data for Part Master ", table.rows);
        res.send(table.rows);
      }
    });

  } else if (objectId == 3) {
    connection.query('select * from fun_get_data_drawing_print_final_search($1,$2,$3,$4,$5,$6) order by name,revision desc;', [objectId, tableValue, policyResult, nameValue, revisionValue, latestRevision], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        //console.log(connection.query('select * from fun_get_data_part_final_search($1,$2,$3,$4,$5,$6);',[objectId,tableValue,policyResult,nameValue,revisionValue,latestRevision]));
        //console.log("searched data for Drawing Print ", table.rows);
        res.send(table.rows);
      }
    });

  } else if (objectId == 4) {
    connection.query('select * from fun_get_data_eco_final_search($1,$2,$3,$4,$5,$6) order by name,revision desc;', [objectId, tableValue, policyResult, nameValue, revisionValue, latestRevision], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        //console.log(connection.query('select * from fun_get_data_part_final_search($1,$2,$3,$4,$5,$6);',[objectId,tableValue,policyResult,nameValue,revisionValue,latestRevision]));
       // console.log("searched data for ECO ", table.rows);
        res.send(table.rows);
      }
    });

  } else if (objectId == 5) {
    connection.query('select * from fun_get_data_ecr_final_search($1,$2,$3,$4,$5,$6) order by name,revision desc;', [objectId, tableValue, policyResult, nameValue, revisionValue, latestRevision], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        //console.log(connection.query('select * from fun_get_data_part_final_search($1,$2,$3,$4,$5,$6);',[objectId,tableValue,policyResult,nameValue,revisionValue,latestRevision]));
        //console.log("searched data for ECR ", table.rows);
        res.send(table.rows);
      }
    });

  } else if (objectId == 6) {
    connection.query('select * from fun_get_data_route_final_search($1,$2,$3,$4,$5,$6) order by name,revision desc;', [objectId, tableValue, policyResult, nameValue, revisionValue, latestRevision], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        //console.log(connection.query('select * from fun_get_data_part_final_search($1,$2,$3,$4,$5,$6);',[objectId,tableValue,policyResult,nameValue,revisionValue,latestRevision]));
        //console.log("searched data for Route ", table.rows);
        res.send(table.rows);
      }
    });

  } else if (objectId == 7) {
    connection.query('select * from fun_get_data_inbox_task_final_search($1,$2,$3,$4,$5,$6) order by name,revision desc;', [objectId, tableValue, policyResult, nameValue, revisionValue, latestRevision], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        //console.log(connection.query('select * from fun_get_data_part_final_search($1,$2,$3,$4,$5,$6);',[objectId,tableValue,policyResult,nameValue,revisionValue,latestRevision]));
        //console.log("searched data for Inbox Task ", table.rows);
        res.send(table.rows);
      }
    });

  } else if (objectId == 8) {
    connection.query('select * from fun_get_data_person_final_search($1,$2,$3,$4,$5) order by name,revision desc;', [objectId, tableValue, policyResult, nameValue, revisionValue], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        //console.log(connection.query('select * from fun_get_data_part_final_search($1,$2,$3,$4,$5,$6);',[objectId,tableValue,policyResult,nameValue,revisionValue,latestRevision]));
        //console.log("searched data for Person ", table.rows);
        res.send(table.rows);
      }
    });

  }



});

router.get('/getObjectId', function (req, res, next) {
  /* const user_id = req.params.user_id */
  var objectId = req.query.objectId
  var tableId = req.query.tableId
  console.log("route and approver", objectId);
  
  if (tableId == 4) {
    connection.query('select * from fun_get_eco_route_approver_details($1);', [objectId], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        console.log("table data ", table.rows);
        res.send(table.rows);
      }
    });
  } else if (tableId == 5) {
    connection.query('select * from fun_get_ecr_route_approver_details($1);', [objectId], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        console.log("table data for ecr ", table.rows);
        res.send(table.rows);
      }
    });
  } else if (tableId == 6) {
    connection.query('select * from fun_get_route_ecr_eco_approver_details($1);', [objectId], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        console.log("table data ", table.rows);
        res.send(table.rows);
      }

    });
  } else if (tableId == 7) {
    connection.query('select * from fun_get_inbox_task_route_approver_details($1);', [objectId], function (error, table) {
      if (!!error) {
        console.log("error in get object query" + error.stack);
      } else {
        console.log("table data ", table.rows);
        res.send(table.rows);
      }
    });
  }

});

module.exports = router;
