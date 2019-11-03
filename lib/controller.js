var events = require('events');
var assigner = require('./assigner');

var controller = new events.EventEmitter();

controller.on('t_water', function(){
    if (process.env.water_status) {
        process.env.water_status = 0;
        assigner.water_led.writeSync(0);
        assigner.pump_relay.writeSync(0);
        
    } else {
        process.env.water_status = 1;
        assigner.water_led.writeSync(1);
        assigner.pump_relay.writeSync(1);
    
    }
});

controller.on('t_lights', function() {
    if (process.env.lights_status) {
        process.env.lights_status = 0;
        assigner.lights_led.writeSync(0);
        assigner.lights_relay.writeSync(0);
    
    } else {
        process.env.lights_status = 1;
        assigner.lights_led.writeSync(1);
        assigner.lights_relay.writeSync(1);
    
    }
});

controller.on('t_propane', function() {
    if (process.env.propane_status) {
        process.env.propane_status = 0;
        assigner.propane_led.writeSync(0);
        assigner.propane_valve.writeSync(0);

    } else {
        process.env.propane_status = 1;
        assigner.propane_led.writeSync(1);
        assigner.propane_valve.writeSync(1);

    }
});

controller.on('set_water', function(value){
    process.env.water_status = value;
    assigner.water_led.writeSync(value);
    assigner.pump_relay.writeSync(value);
});

controller.on('set_lights', function(value){
    process.env.lights_status = value;
    assigner.lights_led.writeSync(value);
    assigner.lights_relay.writeSync(value);
});

controller.on('set_propane', function(value){
    process.env.propane_status = value;
    assigner.propane_led.writeSync(value);
    assigner.propane_valve.writeSync(value);
});



module.exports = controller;