const path = require("node:path");

require("dotenv").config({
  path: path.resolve(path.join(".", ".env.development")),
});
