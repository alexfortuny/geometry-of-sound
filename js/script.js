let polySynth;

function setup() {
  let cnv = createCanvas(600, 600);
  angleMode(DEGREES);
  cnv.mousePressed(playSynth);
  polySynth = new p5.PolySynth();
  noLoop();
}

function draw() {
  background(0, 0, 0, 0);
  circleOfFifths();
}

function circleOfFifths() {
  let i = 0;
  let x = 0;
  let y = -250;
  let rotationFactor = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  let noteName = ["C", "G", "D", "A", "E", "B", "F#/Gb", "Db", "Ab", "Eb", "Bb", "F"];
  stroke(39, 92, 81); // Change the color
  strokeWeight(10); // Make the points 10 pixels in size
  translate(300, 300); // translation point to the middle
  for (i = 0; i < 12; i++) {
    push();
    rotate(rotationFactor[i]);
    point(x, y);
    pop();

    push();
    stroke(0, 0, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(20);
    rotate(rotationFactor[i]);
    text(noteName[i], 0, -270);
    pop();
  }
}

function playSynth() {
  userStartAudio();

  // note duration (in seconds)
  let dur = 1.5;

  // time from now (in seconds)
  let time = 0;

  // velocity (volume, from 0 to 1)
  let vel = 0.1;

  // notes can overlap with each other
  polySynth.play('G3', vel, 0, dur);
  polySynth.play('B4', vel, time += 1/3, dur);
  polySynth.play('Db4', vel, time += 1/3, dur);
}
