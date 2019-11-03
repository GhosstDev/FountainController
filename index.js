var gpio = require('onoff').Gpio;
var config = require('./bin/config.json');
var power_led = new gpio(config.gpio.power_led, 'high');
// var ser = require('./lib/server');
var buttons = require("./lib/buttons");
var assigner = require("./lib/assigner");
var controller = require("./lib/controller");

// ser();
buttons();

process.stdin.resume();

function exitHandler() {
    power_led.writeSync(0);
    power_led.unexport();
    assigner.close();
}

process.on('exit', exitHandler.bind());
process.on('SIGINT', exitHandler.bind());
process.on('SIGUSR1', exitHandler.bind());
process.on('SIGUSR2', exitHandler.bind());
process.on('uncaughtException', exitHandler.bind());