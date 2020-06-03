$(document).ready(function () {
  $( "#target1" ).click(function() {
    console.log("CLICK ON TARGET 1");
    polySynth.play('C4', 0.1, 0, 1.5);
    polySynth.play('D4', 0.1, 0, 1.5);
    polySynth.play('E4', 0.1, 0, 1.5);
    polySynth.play('G4', 0.1, 0, 1.5);
  });
  $( "#target2" ).mousedown(function() {
    console.log("CLICK ON TARGET 2");
    polySynth.play('D4', 0.1, 0, 1.5);
    polySynth.play('E4', 0.1, 0, 1.5);
    polySynth.play('F#4', 0.1, 0, 1.5);
    polySynth.play('A4', 0.1, 0, 1.5);
  });
  $( "#target3" ).mousedown(function() {
    console.log("CLICK ON TARGET 3");
    polySynth.play('E4', 0.1, 0, 1.5);
    polySynth.play('F#4', 0.1, 0, 1.5);
    polySynth.play('G4', 0.1, 0, 1.5);
    polySynth.play('B4', 0.1, 0, 1.5);
  });
  $(circlePoint).mousedown(function() { //CONNECT THIS WITH THE POINTS CREATED
    console.log("CLICK ON circlePoint");
    polySynth.play('D4', 0.1, 0, 1.5);
  });
});

let polySynth;
let circlePoint = [];

function setup() {
  let cnv = createCanvas(600, 600);
  angleMode(DEGREES);
  polySynth = new p5.PolySynth();
  noLoop();
}

let i = 0;
let x = 0;
let y = -240;
let r = 20;
let rotationFactor = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
let noteName = ["C", "G", "D", "A", "E", "B", "F#/Gb", "Db", "Ab", "Eb", "Bb", "F"];

function draw() {
  background(145, 179, 163);
  translate(300, 300);
  for (i = 0; i < 12; i++) {
    push();
    rotate(rotationFactor[i]);
    fill(255, 207, 0);
    noStroke(); // Don't draw a stroke around shapes
    circlePoint.push(ellipse(x, y, r));
    pop();

    push();
    stroke(0, 0, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(20);
    rotate(rotationFactor[i]);
    text(noteName[i], 0, -270);
    pop();
  }
  // translate(-300, -300); // return to initial position, cause translation point was moved before.
}

function mouseClicked(circlePoint) {
  console.log("CLICK ON circlePoint");
}
