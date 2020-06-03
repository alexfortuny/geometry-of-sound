jQuery(document).ready(function($) {

  const canvas = SVG("svg");

  // Create the 12 circle-of-fifth points
    for (let i = 0; i < 12; i++) {
        canvas.circle(10).addClass("pitch").attr('id', 'position' + i).move(300, 0).rotate(30 * i, 305, 305).click(on_pitch_click);
    }


    /** Extract the SVG coordinates *relative* to the given SVG element from a mouse event object. */
    function get_relative_svg_coordinates(svg, evt) {
        let pt = svg.createSVGPoint();  // TODO Should create this just once per canvas
        pt.x = evt.clientX;
        pt.y = evt.clientY;

        // The cursor point, translated into svg coordinates
        const cursorpt =  pt.matrixTransform(svg.getScreenCTM().inverse());
        return [cursorpt.x, cursorpt.y]
    }


    let path_coords = [];
    let lines = [];


    function on_pitch_click(e) {
        const node = this.node;
        const svg = node.closest("svg");

        // Extract the coordinates of the element relative to the parent svg canvas
        const elem_coords = node.getBoundingClientRect();
        const svg_coords = svg.getBoundingClientRect();
        const elemx = elem_coords.x - svg_coords.x;
        const elemy = elem_coords.y - svg_coords.y;
        const elem_centerx = elemx + elem_coords.width/2;
        const elem_centery = elemy + elem_coords.height/2;

        // const point = get_relative_svg_coordinates(svg, e);
        const point = [elem_centerx, elem_centery]

        path_coords.push(point);
        const nelems = path_coords.length;
        if (nelems > 1) {
            const x0 = path_coords[nelems-2];
            const x1 = path_coords[nelems-1];
            lines.push(canvas.line(x0[0], x0[1], x1[0], x1[1]).attr({
                "stroke": "#fff",
                "stroke-width": "2px"
            }));
        }

        if (node.getAttribute('clicked')) {
            // Second time we click on same node - stop animation
            // console.log("STOP");
            console.log(lines);
            // TODO
            path_coords = [];
            lines = [];
            const svglines = SVG(svg).find('line');
            // console.log(svglines);
            // svglines.animate(2000, 1000, 'now').attr({ stroke: '#f03' });

            console.log("Let's get wild!");
            svglines.animate({
              duration: 1000,
              delay: 400,
              when: 'now',
              swing: true,
              times: 3,
              wait: 200
            }).attr({ stroke: '#ff204e' }).after(function () {
                this.element().remove();
            });

        } else {
            node.setAttribute('clicked', true);
        }


        // console.log(point);
  }

  $(".pitch").hover(function() {
    $(this).css({
      "fill": "blue",
    });
  }, function() {
    $(this).css({
      "fill": "green",
    });
  });

  let notes = ['C3', 'G3', 'D3', 'A3', 'E3', 'B3', 'F#3', 'Db3', 'Ab3', 'Eb3', 'Bb3', 'F3']
  for (let i = 0; i < 12; i++) {
    $("#position" + i).mousedown(function() {
      synth.triggerAttackRelease([notes[i]], '4n');
    });
  };
});

//a polysynth composed of 6 Voices of Synth
var synth = new Tone.PolySynth(4, Tone.Synth, {
  oscillator : {
		type : "sine"
	}
}).toMaster();
