const pool = require("Pool");
async function getMessages() {
  const { rows } = pool.query("selct * from messages ");
  return rows;
}
module.exports = getMessages;
