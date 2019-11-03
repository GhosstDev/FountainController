var pins = require('./../bin/config.json').gpio;
var gpio = require('onoff').Gpio;

process.env.pump_status = false;
process.env.lights_status = false;
process.env.propane_status = false;

var water_btn = new gpio(pins.water_switch, 'in', 'rising');
var water_led = new gpio(pins.water_led, 'out');
var pump_relay = new gpio(pins.water_control, 'out');

var lights_btn = new gpio(pins.lights_switch, 'in', 'rising');
var lights_led = new gpio(pins.lights_led, 'out');
var lights_relay = new gpio(pins.lights_control, 'out');

var propane_btn = new gpio(pins.propane_switch, 'in', 'rising');
var propane_led = new gpio(pins.propane_led, 'out');
var propane_valve = new gpio(pins.propane_control, 'out');

exports.water_btn = water_btn;
exports.water_led = water_led;
exports.pump_relay = pump_relay;

exports.lights_btn = lights_btn;
exports.lights_led = lights_led;
exports.lights_relay = lights_relay;

exports.propane_btn = propane_btn;
exports.propane_led = propane_led;
exports.propane_valve = propane_valve;

exports.close = function() {

    water_led.writeSync(0);
    pump_relay.writeSync(0);
    lights_led.writeSync(0);
    lights_relay.writeSync(0);
    propane_led.writeSync(0);
    propane_valve.writeSync(0);

    water_btn.unexport();
    water_led.unexport();
    pump_relay.unexport();

    lights_btn.unexport();
    lights_led.unexport();
    lights_relay.unexport();

    propane_btn.unexport();
    propane_led.unexport();
    propane_valve.unexport();    
}