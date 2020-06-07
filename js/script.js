jQuery(document).ready(function($) {
  const notes = ['C4', 'G4', 'D4', 'A4', 'E4', 'B4', 'F#4', 'Db4', 'Ab4', 'Eb4', 'Bb4', 'F4'];
  const canvas = SVG("svg");

  // Create the 12 circle-of-fifth points
  for (let i = 0; i < 12; i++) {
    canvas.circle(10).addClass("pitch").attr('id', 'position' + i).attr('note', notes[i]).move(300, 0).rotate(30 * i, 305, 305).click(on_pitch_click);
  }


  let lastcoord = null;
  let storedChord = [];

  function on_pitch_click(e) {
    const node = this.node;
    const note = node.getAttribute('note');
    const svg = node.closest("svg");

    // Extract the coordinates of the element relative to the parent svg canvas
    const elem_coords = node.getBoundingClientRect();
    const svg_coords = svg.getBoundingClientRect();
    const elemx = elem_coords.x - svg_coords.x;
    const elemy = elem_coords.y - svg_coords.y;
    const elem_centerx = elemx + elem_coords.width / 2;
    const elem_centery = elemy + elem_coords.height / 2;

    // const point = get_relative_svg_coordinates(svg, e);
    const point = [elem_centerx, elem_centery]

    if (lastcoord != null) {
      canvas.line(lastcoord[0], lastcoord[1], point[0], point[1]).attr({
        "stroke": "rgb(78, 78, 78)",
        "stroke-width": "2px"
      });
    }

    storedChord.push(note);

    lastcoord = point;

    if (node.getAttribute('clicked')) {
      const svglines = SVG(svg).find('line');
      svglines.animate({
        duration: 1000,
        delay: 400,
        when: 'now',
        swing: true,
        times: 3,
        wait: 200
      }).attr({
        stroke: 'rgb(201, 187, 87)'
      }).after(function() {
        this.element().remove();
      });
      SVG(svg).find('circle').attr('clicked', null);
      lastcoord = null;
         synth.triggerAttackRelease(storedChord.slice(0, -1), '2n');
         storedChord = [];
    } else {
      node.setAttribute('clicked', true);
      synth.triggerAttackRelease(note, '8n');
    }


    // console.log(point);
  }

  $(".pitch").hover(function() {
    $(this).css({
      "fill": "rgb(201, 187, 87)",
    });
  }, function() {
    $(this).css({
      "fill": "rgb(78, 78, 78)",
    });
  });


});

//a polysynth composed of 6 Voices of Synth
const synth = new Tone.PolySynth(4, Tone.Synth, {
  oscillator: {
    type: "sine"
  }
}).toMaster();

const VF = Vex.Flow;

// We created an object to store the information about the workspace
var WorkspaceInformation = {
    // The div in which you're going to work
    div: document.getElementById("staff"),
    // Vex creates a svg with specific dimensions
    canvasWidth: 500,
    canvasHeight: 500
};

// Create a renderer with SVG
var renderer = new VF.Renderer(
    WorkspaceInformation.div,
    VF.Renderer.Backends.SVG
);

// Use the renderer to give the dimensions to the SVG
renderer.resize(WorkspaceInformation.canvasWidth, WorkspaceInformation.canvasHeight);

// Expose the context of the renderer
var context = renderer.getContext();

// And give some style to our SVG
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");


/**
 * Creating a new stave
 */
// Create a stave of width 400 at position x10, y40 on the SVG.
var stave = new VF.Stave(10, 40, 400);
// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");
// Set the context of the stave our previous exposed context and execute the method draw !
stave.setContext(context).draw();
