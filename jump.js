var data = [{ Name: "Deebo Coleman", Jumps: "126", JumpLoad: "24785.54" },
        { Name: "Devion Smith", Jumps: "95", JumpLoad: "16690.31" },
        { Name: "Jalon Moore", Jumps: "81", JumpLoad: "16763.9" },
        { Name: "Jehloni James", Jumps: "23", JumpLoad: "5145.01" },
        { Name: "Jordan Meka", Jumps: "31", JumpLoad: "8823.81" },
        { Name: "Jordan Usher", Jumps: "82", JumpLoad: "21417.83" },
        { Name: "Khalid Moore", Jumps: "112", JumpLoad: "22095.69" },
        { Name: "Kyle Sturdivant", Jumps: "107", JumpLoad: "18066.84" },
        { Name: "Michael Devoe", Jumps: "70", JumpLoad: "11722.58" },
        { Name: "Miles Kelly", Jumps: "120", JumpLoad: "17381.69" },
        { Name: "Rodney Howard", Jumps: "49", JumpLoad: "14499.76" },
        { Name: "Saba Gigiberia", Jumps: "70", JumpLoad: "17998.15" }]

    var height = 300;
    var width = 500;
    var margin = {left:50, right:50, top:40, bottom:0};

    var y = d3.scaleLinear()
            .domain([0, 25000])
            .range([height, 0]);

    var x = d3.scaleLinear()
            .domain([0, 130])
            .range([0, width]);

    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(x);

    var svg = d3.select("body").append("svg").attr("height", 600).attr("width", "100%");
    var chartGroup = svg.append("g").attr("transform", "translate(0,"+margin.top+")");

    chartGroup.append("g").attr("class", "x axis").attr("transform", "translate("+margin.left*1.5+", "+height+")").call(xAxis);
    chartGroup.append("g").attr("class", "y axis").attr("transform", "translate("+margin.left*1.5+", 0)").call(yAxis);

    chartGroup.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", margin.left*1.5+0.5*width)
        .attr("y", height+40)
        .style("fill", "#003057")
        .text("Jumps");

    chartGroup.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+margin.left*0.5+", "+height*0.5+"), rotate(270)")
        .style("fill", "#003057")
        .text("Jump Load (J)");

    var div = d3.select("body").append("div").style("opacity", "0").style('position', 'absolute').style("stroke", "blue");
    //chartGroup.selectAll("div").data(data).enter().append("div");

    chartGroup.append('g')
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.Jumps) + margin.left*1.5; } )
            .attr("cy", function (d) { return y(d.JumpLoad); } )
            .attr("r", 5)
            .style("fill", "#B3A369")
            .on('mouseover', function(d){
                d3.select(this)
                    .attr("r", 8);
                div.style('opacity', 1)
                    .style("left", d3.event.pageX+"px")
                    .style("top", d3.event.pageY+"px")
                div.html(d.Name);

            })
            .on('mouseout', function(){
                d3.select(this)
                    .attr('r', 5);
                div.style('opacity', 0).html('');
            });


