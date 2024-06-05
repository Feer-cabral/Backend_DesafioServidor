const { Command } = require("commander");
const program = new Command();

//1- comando 2- descripcion 3- valor por defecto

program.option("--mode <mode>", "modo de trabajo", "desarrollo");
program.parse();

module.exports = program;
