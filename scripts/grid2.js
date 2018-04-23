
d3.csv('data/DEPVSREP230418.csv', function (error, data) {

data.forEach(function(d) {
            d.IMD15 = +d.IMD15;
        });
        
data = data.sort(function (a,b) {return d3.ascending(a.IMD15, b.IMD15); });
function depPolGridData() {
    

        var depData = new Array();
        var xpos = 1;
        var ypos = 1;
        var sqwidth = 5;
        var hgap = 1;
        var vgap = 1;
        var sqheight = 5;
        var click = 0;
        var i = 0;
        

            for (var row = 0;row < 138; row++) {
                depData.push( new Array() );

                for (var column = 0; column < 238; column++) {
                    depData[row].push({
                        x:xpos,
                        y:ypos,
                        //width: sqwidth,
                        //height: sqheight,
                        //click: click,
                        dep: data[i].IMD15,
                        control: data[i].REPR,
                        laua: data[i].LAD16CD
                    })
                    i +=1;
                    xpos +=(sqwidth + hgap);
                    
                }
                xpos = 1;

                ypos += (sqheight + vgap);
        }
    

        
        //console.log(depData);
        return depData;


    
}






/*function gridData() {



    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = 10;
    var height = 10;
    var click = 0;
    
    // iterate for rows 
    for (var row = 0; row < 100; row++) {
        data.push( new Array() );
        
        // iterate for cells/columns inside rows
        for (var column = 0; column < 100; column++) {
            data[row].push({
                x: xpos,
                y: ypos,
                width: width,
                height: height,
                click: click
            })
            // increment the x position. I.e. move it over by 50 (width variable)
            xpos += width;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += height; 
    }
    return data;
}*/

var gridData = depPolGridData();  
// I like to log the data to the console for quick debugging
console.log(gridData);

var grid = d3.select("#grid")
    .append("svg")
    .attr("width","1500px")
    .attr("height","1000px");
    
var row = grid.selectAll(".row")
    .data(gridData)
    .enter().append("g")
    .attr("class", "row");
    
var column = row.selectAll(".square")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("class","square")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", 5)
    .attr("height", 5)
    .style("fill", function(d) {if (d.control == 'L') { return "red";} 
                                else if (d.control == 'C') { return "blue";}
                                else if (d.control == 'LD') { return "yellow";}
                                else if (d.control == 'O') { return "pink";}
                                else if (d.control == 'UKIP') { return "purple";}
                                else if (d.control == 'G') { return "green";}

    return "#aaa";})
    .style("opacity", 1)
    .on("click",function(d) {console.log(d.control)});
});

function updateData() {
    var lauasel = d3.select("#lauasel").node().value
    //console.log(lauasel)
    var svg = d3.select("#grid").transition();
    svg.selectAll(".square")
       .duration(500)
       .style("opacity", function(d) {if (d.laua == lauasel) { return "1";}
                                      return "0.1";})
       .style("stroke-width", function(d) {if (d.laua == lauasel) { return "1";}
                                      return "0.1";})
       .style("stroke", function(d) {if (d.laua == lauasel) { return "#111";}
                                      return "#fff";})
            
}

function resetData() {
    var svg = d3.select("#grid").transition();
    svg.selectAll(".square")
       .duration(500)
       .style("opacity",1)
       .style("stroke-width",0)
}
