const dotenv = require("dotenv");
const program = require("../utils/commander.js");

const { mode } = program.opts();

dotenv.config({
  path: mode === "desarrollo" ? "./.env.desarrollo" : "./.env",
});

const configObject = {
  mongo_url: process.env.MONGO_URL,
};

module.exports = configObject;
