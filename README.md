# Volkszähler FritzBox API
This composition of vzlogger and fritzapi helps you to push energy and power measures from Fritz DECT devices to the Volkszähler middleware. Supported devices are **Fritz!DECT 200 and 210**.
## fritzapi
fritzapi is used as connector to your Fritz Box.  
The fritzapi component ist located under /api.

**Source:** https://github.com/andig/fritzapi
### Install
Run ``npm install`` in /api folder.  
As alternative, you can use the npm docker container.
````bash
docker-compose -f docker-compose.fritzapi.dev.yml run fritzapi sh -c "cd /app && npm install"
````
### Configure fritzapi
Be sure you have enabled the authentication methode by username and password in your Fritz Box.  
Create a file ./app/.env with your specific environment settings. Or pass environment variables to the docker container.
````dotenv
# Use FBs IP Address or DNS Name
FB_URL=http://192.168.178.1/
#FB_URL=http://fritz.box/
# Fritz Box User Account
FB_USER=user
# Fritz Box Passwort
FB_PASS=<YOUR_PASSWORD>
````
### Get switch energy consumption in Wh and power in W

#### Run with node
````bash
node get-switch-energy.js --ain 000012345678
# energy 282395
# power 56.43
````
#### Run with docker
````bash
docker-compose -f docker-compose.fritzapi.dev.yml run fritzapi sh -c "cd /app && node get-switch-energy.js --ain 000012345678"
# energy 282395
# power 56.43
````
_*AIN is the unique identifier of Fritz DECT devices._

## vzlogger
Vzlogger is used to push the data from fritzapi to your Volkszähler middleware. Consult the docs from volkszähler for further information about the middleware: https://wiki.volkszaehler.org/software/middleware

### Configure vzlogger
Create a file [vzlogger.json](./component/vzlogger/vzlogger.json) based on [vzlogger.example.json](./component/vzlogger/vzlogger.example.json) under [./component/vzlogger/](./component/vzlogger/)

Adjust the config file to your needs.
````json
{
  "retry": 3,
  "daemon": false,
  "verbosity": 0, // Set to 15 for debugging purposes
  "log": "/dev/stdout",
  "local": {
    "enabled": true,
    "port": 8080,
    "index": true,
    "timeout": 30,
    "buffer": 600
  },
  "meters": [
    {
      "enabled": true,
      "allowskip": true,
      "use_local_time": true,
      "aggtime": -1,
      "aggfixedinterval": false,
      "interval": 120, // 120 seconds -> you can lower the interval for your needs
      "protocol": "exec",
      "command": "cd /app/api && node get-switch-energy.js --ain 000012345678", // replace the ain with device ain
      "format": "$i $v",
      "channels": [
        {
          "uuid": "cd62e640-3732-11eb-9d49-09812203e6f7", // replace with your middleware uuid
          "middleware": "http://192.168.5.136:8080", // replace with your middleware url
          "identifier": "energy"
        },
        {
          "uuid": "7d1eec50-37c6-11eb-985f-016d155eab7b",  // replace with your middleware uuid
          "middleware": "http://192.168.5.136:8080", // replace with your middleware url
          "identifier": "power"
        }
      ]
    }
  ]
}
````
### Start vzlogger
Start with docker-compose
````
# run in foreground
# docker-compose up vzlogger

# run detached in background
docker-compose up vzlogger -d
````