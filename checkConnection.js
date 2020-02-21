const oracledb = require('oracledb');
// hr schema password
var password = '123456' 
// checkConnection async function
async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
        user: "hr",
        password: password,
        connectString: "localhost:1521/xepdb1"
    });
    console.log('connected to database');
  } catch (err) {
    console.error(err.message);
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
  }
}

checkConnection();