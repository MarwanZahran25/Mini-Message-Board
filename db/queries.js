const pool = require("./pool");
async function getMessages() {
  const { rows } = pool.query("selct * from messages ");
  return rows;
}
module.exports = getMessages;
