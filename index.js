require("dotenv").config();

const server = require("./api/server.js");

const port = process.env.PORT || 6000;
const environment = process.env.DB_ENV || "development";

server.listen(port, () => console.log(`🎮server up on port ${port} 😂👌💯🙋‍`));
