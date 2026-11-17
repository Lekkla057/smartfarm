const express = require('express');
const app = express();
var mqtt = require('mqtt');

const MQTT_SERVER = "broker.emqx.io";
const MQTT_PORT = "1883";
//if your server don't have username and password let blank.
const MQTT_USER = ""; 
const MQTT_PASSWORD = "";

// Connect MQTT
var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
});
var sensor=""
client.on('connect', function () {
    // Subscribe any topic
    console.log("MQTT Connect");
    client.subscribe('/lpt/sensor', function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// Receive Message and print on terminal
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    if(tipic=="/lpt/sensor"){
        sensor=message;
    }

});

app.use(express.json());
var plug1="0";
var plug2="0";
var plug3="0";
var plug4="0";
var plug5="0";
app.get('/lpt/plug1', (req, res) => {
    plug1=plug1=="0"?"1":"0";
    console.log(plug1);
    client.publish("/lpt/plug1", plug1);
    res.json(plug1);
});
app.get('/lpt/plug2', (req, res) => {
    plug2=plug2=="0"?"1":"0";
    client.publish("/lpt/plug2", plug2);
    res.json(plug2);
});
app.get('/lpt/plug3', (req, res) => {
    plug3=plug3=="0"?"1":"0";
    client.publish("/lpt/plug3", plug3);
    res.json(plug3);
});
app.get('/lpt/plug4', (req, res) => {
    plug4=plug4=="0"?"1":"0";
    client.publish("/lpt/plug4", plug4);
    res.json(plug5);
});
app.get('/lpt/plug5', (req, res) => {
    plug5=plug5=="0"?"1":"0";
    client.publish("/lpt/plug5", plug5);
    res.json(plug5);
});
app.get('/lpt/sensor', (req, res) => {
    res.json(sensor);
});
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
