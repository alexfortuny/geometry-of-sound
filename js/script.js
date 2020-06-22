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

        lastcoord = point;
        // Create the line / figure
        if (node.getAttribute('clicked')) {
            // The user clicked on a node which has already been clicked: we trigger the animation and chord playing
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
                render_empty_stave();
            });
            SVG(svg).find('circle').attr('clicked', null);
            lastcoord = null;
            piano.triggerAttackRelease(storedChord.slice(0, -1), '2n');
            render_stave(storedChord);
            storedChord = [];
        } else {
            // The user clicked on a previously-unclicked node - we just label it and play the corresponding single note
            node.setAttribute('clicked', true);
            piano.triggerAttackRelease(note, '8n');
            storedChord.push(note);
            render_stave(storedChord);
        }
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
    const staff = $("#staff");

    function render_stave(chord) {
        console.log("Rendering:", chord);
        staff.children('svg').remove();

        const vf = new VF.Factory({
            renderer: {elementId: 'staff', width: 200, height: 200}
        });

        const score = vf.EasyScore();
        const system = vf.System();

        const voices = chord.map(note => score.voice(score.notes(note + '/w', {stem: 'down'})));
        console.log("Voices:", voices);


        if (voices.length) {
            system.addStave({voices: voices}).addClef('treble').addTimeSignature('4/4');
        } else {
            system.addStave({}).addClef('treble').addTimeSignature('4/4');
        }

        vf.draw();
    }

    // TODO Better use the advanced API below for both staff with notes and without them
    function render_empty_stave() {
        staff.children('svg').remove();
        const renderer = new VF.Renderer(staff[0], VF.Renderer.Backends.SVG);
        renderer.resize(200, 200);

        const context = renderer.getContext();

        // Create a stave of width 400 at position 10, 40 on the canvas.
        const stave = new VF.Stave(10, 40, 400);

        // Add a clef and time signature.
        stave.addClef("treble").addTimeSignature("4/4").setContext(context).draw();
    }



    render_empty_stave();
});
