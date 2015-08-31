// If thinking of a hexagon, define hexagon side length:
// var hexSide = 320;
// var height = hexSide * Math.sqrt(3) / 2;
// var width = hexSide * 1.5;

// If thinking of rectangle height, define it:
// var height = 420;
// var hexSide = height * 2 / Math.sqrt(3);
// var width = hexSide * 1.5;

// If thinking of rectangle width, define it:
var width = 64;
var hexSide = width / 1.5;
var height = hexSide * Math.sqrt(3) / 2;

var radius = hexSide/6;  // radius of "cell body"
var clear = hexSide/8;  // width of "synapse"
var delta = Math.PI / 6;  // radian half-width at circle

var mainColor = "#000066";
var background = "#FFFFFF";

var svg = d3.select("div").append("svg")
        .attr("width", width*10)
        .attr("height", height*10);

var drawLogo = function(selection) {
    var origin = selection.append("g")
            .translate([width/2, height/2]);

    triangle = function(selection, first, second, third) {
        var triangle = selection.append("path")
                .attr("d", "M " + first[0] + " " + first[1]
                      + " L " + second[0] + " " + second[1]
                      + " L " + third[0] + " " + third[1]);
        return triangle;
    };

    mirror = function(first, second, third, f) {
        f(first, second, third);
        f([-first[0], first[1]],
          [-second[0], second[1]],
          [-third[0], third[1]]);
        f([first[0], -first[1]],
          [second[0], -second[1]],
          [third[0], -third[1]]);
        f([-first[0], -first[1]],
          [-second[0], -second[1]],
          [-third[0], -third[1]]);
    };

    var theta = Math.atan((height/2) / (width/2));
    var x1 = Math.cos(theta - delta) * radius;
    var y1 = Math.sin(theta - delta) * radius;
    var x2 = Math.cos(theta + delta) * radius;
    var y2 = Math.sin(theta + delta) * radius;

    mirror([x1, y1], [width/2, height/2], [x2, y2],
           function(first, second, third) {
               triangle(origin, first, second, third)
                   .attr("fill", mainColor);
           });

    origin.append("circle")
        .attr("r", radius + clear)
        .attr("fill", background);

    origin.append("circle")
        .attr("r", radius)
        .attr("fill", mainColor);
};

for (var x=0; x < 10; x++) {
    for (var y=0; y < 10; y++) {
        if ((x+y) % 2 === 0) {
            var g = svg.append("g")
                    .translate([x * width, y * height]);
            drawLogo(g);
        }
    }
}
