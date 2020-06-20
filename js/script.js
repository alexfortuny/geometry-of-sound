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
    //Create the line / figure
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
         piano.triggerAttackRelease(storedChord.slice(0, -1), '2n');
         storedChord = [];
    } else {
      node.setAttribute('clicked', true);
      piano.triggerAttackRelease(note, '8n');
    }




    render_stave(storedChord);


    // console.log(point);
  }
  //Change color when hover
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
  const piano = new Tone.Sampler({
			"A0" : "A0.[mp3|ogg]",
			"C1" : "C1.[mp3|ogg]",
			"D#1" : "Ds1.[mp3|ogg]",
			"F#1" : "Fs1.[mp3|ogg]",
			"A1" : "A1.[mp3|ogg]",
			"C2" : "C2.[mp3|ogg]",
			"D#2" : "Ds2.[mp3|ogg]",
			"F#2" : "Fs2.[mp3|ogg]",
			"A2" : "A2.[mp3|ogg]",
			"C3" : "C3.[mp3|ogg]",
			"D#3" : "Ds3.[mp3|ogg]",
			"F#3" : "Fs3.[mp3|ogg]",
			"A3" : "A3.[mp3|ogg]",
			"C4" : "C4.[mp3|ogg]",
			"D#4" : "Ds4.[mp3|ogg]",
			"F#4" : "Fs4.[mp3|ogg]",
			"A4" : "A4.[mp3|ogg]",
			"C5" : "C5.[mp3|ogg]",
			"D#5" : "Ds5.[mp3|ogg]",
			"F#5" : "Fs5.[mp3|ogg]",
			"A5" : "A5.[mp3|ogg]",
			"C6" : "C6.[mp3|ogg]",
			"D#6" : "Ds6.[mp3|ogg]",
			"F#6" : "Fs6.[mp3|ogg]",
			"A6" : "A6.[mp3|ogg]",
			"C7" : "C7.[mp3|ogg]",
			"D#7" : "Ds7.[mp3|ogg]",
			"F#7" : "Fs7.[mp3|ogg]",
			"A7" : "A7.[mp3|ogg]",
			"C8" : "C8.[mp3|ogg]"
		}, {
			"release" : 1,
			"baseUrl" : "audio/"
	}).toMaster();
  piano.volume.value = -20;

  //StaffConfig
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
