var side = 640;  // drawing inside a square
var height = side;
var width = side;
var radius = side/5;  // radius of "cell body"
var clear = side/20;  // width of "synapse"
var rise = side/4;  // vertical from midline to vanishing point

var mainColor = "#000066";
var background = "#FFFFFF";
//var background = "#6666FF";
//var tempColor = "#6699FF";

var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", background);

var origin = svg.append("g").translate([width/2, height/2]);

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

mirror([-radius, 0], [-width / 2, -rise], [0, -radius],
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


//origin.append("path")
//    .attr("d", "M 0 0 L " + -(width-30) / 2 + " 0")
//    .attr("stroke", "red")
//    .attr("stroke-width", 10);

// d3.tsv("data.tsv", function(error, data) {
//     var c = d3.conventions();
//     c.x.domain(d3.extent(data, ƒ('sepalWidth')));
//     c.y.domain(d3.extent(data, ƒ('sepalLength')));

//     c.drawAxis();

//     c.svg.dataAppend(data, "circle.dot")
//         .attr("r", 3.5)
//         .attr("cx", ƒ('sepalWidth', c.x))
//         .attr("cy", ƒ('sepalLength', c.y))
//         .style("fill", ƒ('species', c.color))
//         .call(d3.attachTooltip);
// });
