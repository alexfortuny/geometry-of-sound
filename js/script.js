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




    render_stave(storedChord);


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

  //a polysynth composed of 6 Voices of Synth
  const synth = new Tone.PolySynth(4, Tone.Synth, {
    oscillator: {
      type: "sine"
    }
  }).toMaster();



  const VF = Vex.Flow;

  const vf = new VF.Factory({
    renderer: {elementId: 'staff', width: 200, height: 200}
  });

  const score = vf.EasyScore();
  const system = vf.System();

  system.addStave({
    voices: [
      score.voice(score.notes('C#4/w', {stem: 'down'})),
    ]
  }).addClef('treble').addTimeSignature('4/4');

  vf.draw();


  function render_stave(chord) {

    system.addStave({
      voices: [
        score.voice(score.notes('C#4/w', {stem: 'down'})),
        score.voice(score.notes('E4/w', {stem: 'down'})),
        score.voice(score.notes('G4/w', {stem: 'down'})),
        score.voice(score.notes('B4/w', {stem: 'down'})),
      ]
    });


  }





});
