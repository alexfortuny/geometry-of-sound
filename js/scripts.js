
jQuery(document).ready(function($) {
    const points = $('.point');

    points.hover(function() {
        $(this).css({
            "background-color": "rgb(255, 151, 151)",
        });
    }, function () {
        $(this).css({
            "background-color": "rgb(102, 102, 102)",
        });
    });



    const canvas = SVG("svg");

    for (let i = 0; i < 12; i++) {
        canvas.circle(10).addClass("pitch").move(300, 0).rotate(30*i, 305, 305);
    }

    $(".pitch").hover(function() {
        $(this).css({
            "fill": "blue",
        });
    }, function () {
        $(this).css({
            "fill": "green",
        });
    });




});