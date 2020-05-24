
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





    const svg = $("svg");

    $(".pitch").hover(function() {
        $(this).css({
            "fill": "blue",
        });
    }, function () {
        $(this).css({
            "fill": "green",
        });
    });

    svg.append('<circle class="pitch" cx="300" cy="5" r="5" transform="rotate(30 300 300)" />')


});