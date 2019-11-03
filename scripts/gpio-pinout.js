var gpio = require('./../bin/config.json');
var cells = require('./../bin/config.json').gpio_mono_cells;

var pinout = [
    null,
    'power33v',  'power5v',
    'gpio_2',    'power5v', 
    'gpio_3',    'gnd',
    'gpio_4',    'gpio_14',
    'gnd',       'gpio_15', //10
    'gpio_17',   'gpio_18',
    'gpio_27',   'gnd',
    'gpio_22',   'gpio_23',
    'power33v',  'gpio_24',
    'gpio_10',   'gnd', //20
    'gpio_9',    'gpio_25',
    'gpio_11',   'gpio_8',
    'gnd',       'gpio_7',
    'dnc',       'dnc',
    'gpio_5',    'gnd', //30
    'gpio_6',    'gpio_12',
    'gpio_13',   'gnd',
    'gpio_19',   'gpio_16',
    'gpio_26',   'gpio_20',
    'gnd',       'gpio_21'
];

var pinout_new = [
    null,
    'power33v',  'power5v',
    'gpio_2',    'power5v', 
    'gpio_3',    'gnd',
    'gpio_4',    'gpio_14',
    'gnd',       'gpio_15', //10
    'gpio_17',   'gpio_18',
    'gpio_27',   'gnd',
    'gpio_22',   'gpio_23',
    'power33v',  'gpio_24',
    'gpio_10',   'gnd', //20
    'gpio_9',    'gpio_25',
    'gpio_11',   'gpio_8',
    'gnd',       'gpio_7',
    'dnc',       'dnc',
    'gpio_5',    'gnd', //30
    'gpio_6',    'gpio_12',
    'gpio_13',   'gnd',
    'gpio_19',   'gpio_16',
    'gpio_26',   'gpio_20',
    'gnd',       'gpio_21'
];

var gpiout = [null,null,3,5,7,29,31,26,24,21,19,23,32,33,8,10,36,11,12,35,38,40,15,16,18,22,37,13 ];

var output = `
+-------------------------------------------+
| Raspberry Pi 3B GPIO Pinout Config        |
+----------------+----+----+----------------+
|power33v| 1  | 2  |power5v|
|                |----|----|                |
|gpio_2| 3  | 4  |power5v|
|                |----|----|                |
|gpio_3| 5  | 6  |gnd|
|                |----|----|                |
|gpio_4| 7  | 8  |gpio_14|
|                |----|----|                |
|gnd| 9  | 10 |gpio_15|
|                |----|----|                |
|gpio_17| 11 | 12 |gpio_18|
|                |----|----|                |
|gpio_27| 13 | 14 |gnd|
|                |----|----|                |
|gpio_22| 15 | 16 |gpio_23|
|                |----|----|                |
|power33v| 17 | 18 |gpio_24|
|                |----|----|                |
|gpio_10| 19 | 20 |gnd|
|                |----|----|                |
|gpio_9| 21 | 22 |gpio_25|
|                |----|----|                |
|gpio_11| 23 | 24 |gpio_8|
|                |----|----|                |
|gnd| 25 | 26 |gpio_7|
|                |----|----|                |
|dnc| 27 | 28 |dnc|
|                |----|----|                |
|gpio_5| 29 | 30 |gnd|
|                |----|----|                |
|gpio_6| 31 | 32 |gpio_12|
|                |----|----|                |
|gpio_13| 33 | 34 |gnd|
|                |----|----|                |
|gpio_19| 35 | 36 |gpio_16|
|                |----|----|                |
|gpio_26| 37 | 38 |gpio_20|
|                |----|----|                |
|gnd| 39 | 40 |gpio_21|
+----------------+----+----+----------------+
`;

module.exports = function() {
    for (let [pin_name, pin_num] of Object.entries(gpio.gpio)) {pinout_new[gpiout[pin_num]] = pin_name;}

    for (var pin=1; pin <= 40; pin++) {
        var cell = '';
        switch (pinout_new[pin]) {
            case 'power5v': cell = cells.power5v;break;
            case 'power33v': cell = cells.power33v;break;
            case 'gnd': cell = cells.gnd;break;
            case 'dnc': cell = cells.dnc;break;
            case 'power_led': cell = cells.power_led;break;
            case 'water_led': cell = cells.water_led;break;
            case 'water_switch': cell = cells.water_switch;break;
            case 'water_control': cell = cells.water_control;break;
            case 'lights_led': cell = cells.lights_led;break;
            case 'lights_switch': cell = cells.lights_switch;break;
            case 'lights_control': cell = cells.lights_control;break;
            case 'lights_data': cell = cells.lights_data;break;
            case 'propane_led': cell = cells.propane_led;break;
            case 'propane_switch': cell = cells.propane_switch;break;
            case 'propane_control': cell = cells.propane_control;break;
            default: cell = cells.blank
        }
        output = output.replace(pinout[pin], cell);
    
    }
    console.log(output);
}
