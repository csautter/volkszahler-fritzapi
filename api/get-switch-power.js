require('dotenv').config();
var Fritz = require('fritzapi').Fritz;

const optionDefinitions = [
    { name: 'ain', type: String, multiple: false, defaultOption: true }
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)

var f = new Fritz(process.env.FB_USER, process.env.FB_PASS, process.env.FB_URL);

f.getSwitchPower(options['ain']).then(function(power_w){
    console.log('power ' + power_w);
});