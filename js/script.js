let polySynth;
let point = [];

function setup() {
  let cnv = createCanvas(600, 600);
  angleMode(DEGREES);
  polySynth = new p5.PolySynth();
  noLoop();
}

function draw() {
  background(0, 0, 0, 0);
  circleOfFifths();
  translate(-300, -300); // return to initial position, cause translation point was moved before.
}

function circleOfFifths() {
  let i = 0;
  let x = 0;
  let y = -240;
  let r = 10;
  let rotationFactor = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  let noteName = ["C", "G", "D", "A", "E", "B", "F#/Gb", "Db", "Ab", "Eb", "Bb", "F"];
  let point = [] //how to create variables with different names in a loop?
  translate(300, 300); // translation point to the middle
  for (i = 0; i < 12; i++) {
    push();
    rotate(rotationFactor[i]);
    // stroke(100);
    // strokeWeight(10);
    // ellipse(x, y, r, r);
    point = new Point(0, -240, 10, 10); //how to create variables with different names in a loop?
    point.show();
    // point.push(i++); Use different name. TRY
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
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r) {
      console.log("CLICK ON");
    }
  }

  show(x, y, r) {
    stroke(100);
    strokeWeight(10);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

function mousePressed() {
  point.clicked();
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
