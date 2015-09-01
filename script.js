// If thinking of a hexagon, define hexagon side length:
// var hexSide = 320;
// var height = hexSide * Math.sqrt(3) / 2;
// var width = hexSide * 1.5;

// If thinking of rectangle height, define it:
// var height = 420;
// var hexSide = height * 2 / Math.sqrt(3);
// var width = hexSide * 1.5;

// If thinking of rectangle width, define it:
// var width = 640;
// var hexSide = width / 1.5;
// var height = hexSide * Math.sqrt(3) / 2;

// Define details of circles and so on
// var radius = hexSide/6;  // radius of "cell body"
// var clear = hexSide/8;  // width of "synapse"
// var delta = Math.PI / 6;  // radian half-width at circle

var mainColor = "#000066";
var background = "#FFFFFF";

var drawLogo = function(selection, width, height, radius, clear, delta) {
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

// var width = 640;
// var hexSide = width / 1.5;
// var height = hexSide * Math.sqrt(3) / 2;
// var radius = hexSide/6;  // radius of "cell body"
// var clear = hexSide/8;  // width of "synapse"
// var delta = Math.PI / 6;  // radian half-width at circle

// var svg = d3.select("body").append("center").append("svg")
//         .attr("width", width)
//         .attr("height", height);

// drawLogo(svg, width, height, radius, clear, delta);

var width = 64;
var hexSide = width / 1.5;
var height = hexSide * Math.sqrt(3) / 2;
var radius = hexSide/6;  // radius of "cell body"
var clear = hexSide/8;  // width of "synapse"
var delta = Math.PI / 6;  // radian half-width at circle

var svg = d3.select("#paper").append("svg")
        .attr("width", window.innerWidth)
        .attr("height", height*80);

for (var x=0; x < 40; x++) {
    for (var y=0; y < 80; y++) {
        if ((x+y) % 2 === 0) {
            var g = svg.append("g")
                    .translate([x * width, y * height]);
            drawLogo(g, width, height, radius, clear, delta);
        }
    }
}


var width = 480;
var hexSide = width / 1.5;
var height = hexSide * Math.sqrt(3) / 2;
var radius = hexSide/6;  // radius of "cell body"
var clear = hexSide/8;  // width of "synapse"
var delta = Math.PI / 6;  // radian half-width at circle

var svg = d3.select("#big").append("center").append("svg")
        .attr("width", width)
        .attr("height", height);

drawLogo(svg, width, height, radius, clear, delta);


var height = 120;
var hexSide = height * 2 / Math.sqrt(3);
var width = hexSide * 1.5;
var radius = hexSide/6;  // radius of "cell body"
var clear = hexSide/8;  // width of "synapse"
var delta = Math.PI / 6;  // radian half-width at circle

var svg = d3.select("#dla").append("svg")
        .attr("width", width + 320)
        .attr("height", height);

drawLogo(svg, width, height, radius, clear, delta);

svg.append("g").translate([width, height])
    .append("text")
    .text("DLA")
    .attr("font-size", height + 73)
    .attr("fill", mainColor);


var height = 160;
var hexSide = height * 2 / Math.sqrt(3);
var width = hexSide * 1.5;
var radius = hexSide/6;  // radius of "cell body"
var clear = hexSide/8;  // width of "synapse"
var delta = Math.PI / 6;  // radian half-width at circle

var svg = d3.select("#deeplearninganalytics").append("svg")
        .attr("width", width + 420)
        .attr("height", height + 40);

drawLogo(svg, width, height, radius, clear, delta);

var font = 74;

svg.append("g").translate([width, (height-20)/3])
    .append("text")
    .text("Deep")
    .attr("font-size", font)
    .attr("fill", mainColor);

svg.append("g").translate([width, 10+2*(height-20)/3])
    .append("text")
    .text("Learning")
    .attr("font-size", font)
    .attr("fill", mainColor);

svg.append("g").translate([width, height])
    .append("text")
    .text("Analytics")
    .attr("font-size", font)
    .attr("fill", mainColor);
