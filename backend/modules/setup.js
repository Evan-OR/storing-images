const fs = require('node:fs');

const connectionSetUp = async (mysql) => {
  const { HOST, USER, PASSWORD, DATABASE } = process.env;
  return mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: 3306,
    ssl: { ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem') },
  });
};

module.exports = { connectionSetUp };
