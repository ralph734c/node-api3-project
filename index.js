require('dotenv').config();
// require your server and launch it
const server = require('./api/server.js');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
