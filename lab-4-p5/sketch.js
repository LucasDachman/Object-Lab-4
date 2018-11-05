/*

Lucas Dachman
Adapted from template by Arielle Hein
http://alpha.editor.p5js.org/coloringchaos/sketches/Sya5qKBYf

*/

var serial; //variable to hold an instance of the serial port library
var portName = '/dev/cu.usbmodem1411'; //fill in with YOUR port
var left = 0;
var right = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  serial = new p5.SerialPort(); //a new instance of serial port library

  //set up events for serial communication
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);

  //open our serial port
  serial.open(portName);

  //let's figure out what port we're on - useful for determining your port
  // serial.on('list', printList); //set a callback function for the serialport list event
  // serial.list(); //list the serial ports
}

function draw() {
  background('#403D39');
  fill('#EB5E28');
  noStroke();
  triangle(width/2, 0, width/2 - 10 - left, height, width/2 + 10 + right, height);
}

//all my callback functions are down here:
//these are useful for giving feedback

function serverConnected(){
	console.log('connected to the server');
}

function portOpen(){
  console.log('the serial port opened!');
}

function serialEvent(){
  //receive serial data here
  inData = serial.readLine().split(",");
  if (inData.length > 1) {
    console.log(inData);
    left = mapRange(Number(inData[0]), 0, 1024, 0, width/2);
    right = mapRange(Number(inData[1]), 0, 1024, 0, width/2);
  }
}

function serialError(err){
  console.log('something went wrong with the port. ' + err);
}

function portClose(){
  console.log('the port was closed');
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function mapRange(x, in_min, in_max, out_min, out_max){
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}