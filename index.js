const express = require('express')
const oracledb = require('oracledb');
const app = express();
const port = 3000;
var password = '123456';

async function selectAllEmployees(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: password,
      connectString: "localhost:1521/xepdb1"
    });

    console.log('connected to database');
    let query = 'SELECT * FROM employees';
    // run query to get all employees
    result = await connection.execute(query);

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }

  }
}

//get /employess
app.get('/employees', function (req, res) {
  //fetch all employees from db and send it 
  selectAllEmployees(req, res);
})

async function selectEmployeesById(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: password,
      connectString: "localhost:1521/xepdb1"
    });
    let query = 'SELECT * FROM employees where employee_id=:id';
    // run query to get employee with employee_id
    result = await connection.execute(query, [id]);

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//get /employee?id=<id employee>
app.get('/employee', function (req, res) {
  //get query param ?id
  let id = req.query.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send('Query param id is not number')
    return
  }
  selectEmployeesById(req, res, id);
})

app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))