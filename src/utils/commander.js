const { Command } = require("commander");
const program = new Command();

program.option("--mode <mode>", "modo de trabajo", "desarrollo");
program.parse();

module.exports = program;
