let polySynth;
let circlePoint;

function setup() {
  let cnv = createCanvas(600, 600);
  angleMode(DEGREES);
  // cnv.mousePressed(playSynth);
  polySynth = new p5.PolySynth();
  circlePoint = new Point(0, 0, 10);
  noLoop();
}

function draw() {
  background(0, 0, 0, 0);
  circleOfFifths();
}

class Point {
  constructor(x_, y_, r_) {
    // Location and size
    this.x = x_;
    this.y = y_;
    this.r = r_;
  }
  // Is a point inside the doorbell?
  contains(mx, my) {
    return dist(mx, my, this.x, this.y) < this.r;
  }

  // Show the point
  display(mx, my) {
    if (this.contains(mx, my)) {
      fill(100);
    } else {
      fill(200);
    }
    stroke(0);
    strokeWeight(0);
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

function circleOfFifths() {
  let i = 0;
  let x = 0;
  let y = -250;
  let rotationFactor = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  let noteName = ["C", "G", "D", "A", "E", "B", "F#/Gb", "Db", "Ab", "Eb", "Bb", "F"];
  translate(300, 300); // translation point to the middle
  for (i = 0; i < 12; i++) {
    push();
    rotate(rotationFactor[i]);
    strokeWeight(10);
    point["i"] = point(x, y);
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

function mousePressed() {
  // If the user clicks on the doorbell, play the sound!
  if (circlePoint.contains(mouseX, mouseY)) {
    polySynth.play('G3', 0.1, 0, 1.5);
  }
}
//
// function playSynth() {
//   userStartAudio();
//
//   // note duration (in seconds)
//   let dur = 1.5;
//
//   // time from now (in seconds)
//   let time = 0;
//
//   // velocity (volume, from 0 to 1)
//   let vel = 0.1;
//
//   // notes can overlap with each other
//   polySynth.play('G3', vel, 0, dur);
//   polySynth.play('B4', vel, time += 1/3, dur);
//   polySynth.play('Db4', vel, time += 1/3, dur);
// }
