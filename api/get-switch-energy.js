require('dotenv').config();
var Fritz = require('fritzapi').Fritz;

const optionDefinitions = [
    { name: 'ain', type: String, multiple: false, defaultOption: true }
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)

var f = new Fritz(process.env.FB_USER, process.env.FB_PASS, process.env.FB_URL);

f.getSwitchEnergy(options['ain']).then(function(energy_wh){
    if(energy_wh > 0){
        console.log('energy ' + energy_wh);
    }
});

f.getSwitchPower(options['ain']).then(function(power_w){
    if(power_w > 0){
        console.log('power ' + power_w);
    }
});