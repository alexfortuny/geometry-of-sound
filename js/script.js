let polySynth;
let pointClick;

function setup() {
  let cnv = createCanvas(600, 600);
  angleMode(DEGREES);
  // cnv.mousePressed(playSynth);
  polySynth = new p5.PolySynth();
  pointClick = new Point(0, 0, 10, 10);
  noLoop();
}

function draw() {
  background(0, 0, 0, 0);
  circleOfFifths();
  pointClick.show();
}

function circleOfFifths() {
  let i = 0;
  let x = 0;
  let y = -250;
  let r = 10;
  let rotationFactor = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  let noteName = ["C", "G", "D", "A", "E", "B", "F#/Gb", "Db", "Ab", "Eb", "Bb", "F"];
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

class Point {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  clicked() {
      console.log("CLICK ON");
  }

  show(x, y, r) {
    stroke(100);
    strokeWeight(10);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

function mousePressed() {
  pointClick.clicked();
}

// CHECK https://youtu.be/TaN5At5RWH8?t=375

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
