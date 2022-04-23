function main() {


// set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60}, 
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
// append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
                "translate(" + margin.left + ", " + margin.top + ")");
    // read the data
    // d3.csv("/scrimmage_data/PracticeLoads-Table1.csv")
    //                 .then(function(data) {
    //                     console.log(data);
    //                 })

    // https://d3-graph-gallery.com/graph/scatter_basic.html
    d3.csv("/scrimmage_data/PracticeLoads-Table1.csv", function(data) {
        // add x axis
        // console.log(Object.keys(data)).columns);
        var name = data.columns[0];
        // console.log(name);
        for (var i = 0; i < data.columns.length; i++) {
            // console.log(data[i]['Name']);
        }
        // data.forEach(function(row) {
        //     console.log(Object.keys(row)[0]);
        // });
        // console.log(d3.values(data));
        // const a = d3.map(data, )
        // console.log(data[data.columns[1]]);
        // console.log(data);
        console.log(data);
        // console.log(data['AA Load']);

        var x = d3.scaleLinear()
                    .domain([0, 0])
                    .range([0, width]);
        var xAxis = svg.append("g")
                .attr("class", "myXaxis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .attr("opacity", "0");

        // text label for the x axis
        svg.append("text")  
            .attr("class", "myXaxis")
            .transition()
            .duration(2000)
            .attr("opacity", "1")
            .attr("transform",
                    "translate(" + (width/2) + " ," + 
                                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Distance (mi)");
        
        var y = d3.scaleLinear()
                    .domain([0, 800])
                    .range([height, 0]);
        svg.append("g")
                .call(d3.axisLeft(y));
        // var t = d3.transition().duration(2000)
        // text label for y axis
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("AA Load");

        // svg.append("text")
        //   .attr("x", -margin.left)
        //   .attr("y", 10)
        //   .attr("fill", "currentColor")
        //   .attr("text-anchor", "start")

        var tooltip = d3.select("#my_dataviz")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "1px")
                .style("border-radius", "5px")
                .style("padding", "10px")

        // var tooltip = svg.append("g")
        // .selectAll("text")
        // .data(data)
        // .enter()
        // .append("text")
        //     .text(function(pt) {
        //         console.log(pt['Name'])
        //         return pt['Name'];
        //     })
        //     .attr("x", function(d) {
        //         return x(d['Distance (mi)']);
        //     })
        //     .attr("y", function(d) {
        //         return 15 + y(d['AA Load']);
        //     })
        //     .attr("font-size", 0)


        var mouseover = function(d) {
            // console.log(d['Distance (mi)'] + ", " + d['AA Load'])
            tooltip
            .style("opacity", 10)
            .text(d['Name'])
            // .attr("x", function(d) {
            //         return x(d['Distance (mi)']);
            //     })
            //     .attr("y", function(d) {
            //         return 15 + y(d['AA Load']);
            //     })
        }
        
        var mousemove = function(d) {
            tooltip
            .html(d["Name"])
            .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (d3.mouse(this)[1]) + "px")
        }
        
        // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
        var mouseleave = function(d) {
            tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
        }

        var dot = svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", function(d) { return x(d['Distance (mi)']); })
                .attr("cy", function(d) { return y(d['AA Load']); })
                .attr("r", 1.5)
            .on("mouseover", mouseover)
            // .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

        x.domain([0, 4])
        svg.select(".myXaxis")
            .transition()
            .duration(2000)
            .attr("opacity", "1")
            .call(d3.axisBottom(x));
        svg.selectAll("circle")
            .transition()
            .delay(function(d, i) { return (i * 3)})
            .duration(2000)
            .attr("cx", function(d) { return x(d['Distance (mi)']); })
            .attr("cy", function(d) { return y(d['AA Load']); })
        // dot.transition()
        //     .duration(2000)
        //     .attr("height", 100)


    
    
    
      // A function that change this tooltip when the user hover a point.
      // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)


 

        
        function updatePlot() {
            xlim = this.value

            x.domain([0, xlim])
            xAxis.transition()
                .duration(1000)
                .call(d3.axisBottom(x))
            
            svg.selectAll("circle")
                .data(data)
                .transition()
                .duration(1000)
                .attr("cx", function(d) { return x(d['Distance (mi)']); })
                .attr("cy", function(d) { return y(d['AA Load']); })
        }

        d3.select("#buttonXaxis").on("input", updatePlot)
        // if (T) svg.append("g")
        //         .attr("font-family", "sans-serif")
        //         .attr("font-size", 10)
        //         .attr("stroke-linejoin", "round")
        //         .attr("stroke-linecap", "round")
        //       .selectAll("text")
        //       .data(I)
        //       .join("text")
        //         .attr("dx", 7)
        //         .attr("dy", "0.35em")
        //         .attr("x", i => xScale(X[i]))
        //         .attr("y", i => yScale(Y[i]))
        //         .text(i => T[i])
        //         .call(text => text.clone(true))
        //         .attr("fill", "none")
        //         .attr("stroke", halo)
        //         .attr("stroke-width", haloWidth);
    });


    // var margin = {top: 10, right: 30, bottom: 30, left: 60},
    // width = 460 - margin.left - margin.right,
    // height = 400 - margin.top - margin.bottom;

    // // append the svg object to the body of the page
    // var svg = d3.select("#my_dataviz")
    // .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    // .append("g")
    // .attr("transform",
    //     "translate(" + margin.left + "," + margin.top + ")");

    // //Read the data
    // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", function(data) {

    // // Add X axis
    // var x = d3.scaleLinear()
    // .domain([0, 3000])
    // .range([ 0, width ]);
    // svg.append("g")
    // .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(x));

    // // Add Y axis
    // var y = d3.scaleLinear()
    // .domain([0, 500000])
    // .range([ height, 0]);
    // svg.append("g")
    // .call(d3.axisLeft(y));

    // // Add dots
    // svg.append('g')
    // .selectAll("dot")
    // .data(data)
    // .enter()
    // .append("circle")
    // .attr("cx", function (d) { return x(d.GrLivArea); } )
    // .attr("cy", function (d) { return y(d.SalePrice); } )
    // .attr("r", 1.5)
    // .style("fill", "#69b3a2")

    // })
}
