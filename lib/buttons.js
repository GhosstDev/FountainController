var gpio = require('onoff').Gpio;
var fs = require('fs');
var controller = require('./controller');
var assigner = require('./assigner');

var bpump = assigner.propane_btn;
var bpropane = assigner.propane_btn;
var blights = assigner.lights_btn;


module.exports = function() {
    bpump.watch((err, val) => {
        if (!err)
            controller.emit('t_water');
    });

    bpropane.watch((err, val) => {
        if (!err) 
            controller.emit('t_propane');
    });

    blights.watch((err, val) => {
        if (!err) 
            controller.emit('t_lights');
    });
}
