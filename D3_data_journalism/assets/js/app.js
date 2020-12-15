//sets the width, heigh and margin of svg
var svgWidth = 960;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold the chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params for x and y axis
var chosenXAxis = "poverty";

var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on x axis label
function xScale(dataj, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(dataj, d => d[chosenXAxis]) * 0.8,
      d3.max(dataj, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating y-scale var upon click on y axis label
function yScale(dataj, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(dataj, d => d[chosenYAxis] -5), d3.max(dataj, d => d[chosenYAxis] *1.2)])
    .range([height, 0]);

  return yLinearScale;

}

// function used for updating xAxis var upon click on x axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating yAxis var upon click on y axis label
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }



// function used for updating circles group with a transition to
// new circles for the x axis
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function renderCirclesLabelX(newXScale, chosenXAxis, circleLabels) {

//     circleLabels.transition()
//       .duration(1000)
//       .attr("x", d => newXScale(d[chosenXAxis]));
  
//     return circleLabels;
//   }

// function used for updating circles group with a transition to
// new circles for the y axis
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cy", d => newYScale(d[chosenYAxis]));
  
    return circlesGroup;
  }

  function renderCircleLabelY(newYScale, chosenYAxis, circleLabels) {

    circleLabels.selectAll(null).transition()
      .duration(1000)
      .attr("y", d => newYScale(d[chosenYAxis]));
  
    return circleLabels;
  }
  

// function used for updating circles group with new tooltip based on the x axis label
function updateToolTip(chosenXAxis, circlesGroup) {
  var lab = "";
  var labelx;
  var labx = "";

  if (chosenXAxis === "poverty") {
    labelx = "Poverty: ";
    lab = "%";
    var labx = "";
  }
  else if (chosenXAxis === "age") {
    labelx = "Age: ";
    lab = "";
    var labx = "";
  }
  else {
    labelx = "Household Income: ";
    lab = "";
    labx ="$";
  }
  
  var labely;
  
    if (chosenYAxis === "healthcare") {
      labely = "Healthcare: ";
      laby = "%";
    }
    else if (chosenYAxis === "smokes") {
      labely = "Smokes: ";
      laby = "%";
    }
    else {
      labely = "Obesitiy: ";
      laby = "%";
    }
  var toolTip = d3.tip()
  .style("background-color", "black")
  .style("padding", "8px")
  .attr("class", "tooltip")
  .attr("font-family", "sans-serif")
  .style("font-size", "12px")
  .style("color", "white")
  .style("text-align", "center")
  .offset([80, -40])
    .html(function(d) {
      return (`${d.state}<br>${labelx} ${labx}${d[chosenXAxis]}${lab}<br>${labely} ${d[chosenYAxis]}${laby}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// function used for updating circles group with new tooltip based on the y axis label
function updateToolTipY(chosenYAxis, circlesGroup) {
  var lab = "";
  var labelx;
  var labx = "";

  if (chosenXAxis === "poverty") {
    labelx = "Poverty: ";
    lab = "%";
    var labx = "";
  }
  else if (chosenXAxis === "age") {
    labelx = "Age: ";
    lab = "";
    var labx = "";
  }
  else {
    labelx = "Household Income: ";
    lab = "";
    labx ="$";
  }
  
  var labely;
  
    if (chosenYAxis === "healthcare") {
      labely = "Healthcare: ";
      laby = "%";
    }
    else if (chosenYAxis === "smokes") {
      labely = "Smokes: ";
      laby = "%";
    }
    else {
      labely = "Obesitiy: ";
      laby = "%";
    }
    var toolTip = d3.tip()
      .style("background-color", "black")
      .style("padding", "8px")
      .attr("class", "tooltip")
      .attr("font-family", "sans-serif")
      .style("font-size", "12px")
      .style("color", "white")
      .style("text-align", "center")
      .offset([80, -40])
      .html(function(d) {
        return (`${d.state}<br>${labelx} ${labx}${d[chosenXAxis]}${lab}<br>${labely} ${d[chosenYAxis]}${laby}`);
      });
  
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
  
    return circlesGroup;
  }

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(dataj, err) {
  if (err) throw err;

  // parse data
  dataj.forEach(function(data) {
    data.abbr = data.abbr;
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.healthcare = +data.healthcare;
    data.income = +data.income;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(dataj, chosenXAxis);

  // Create y scale function
  var yLinearScale = yScale(dataj, chosenYAxis)

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(dataj)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r",10)
    .attr("fill", "#3BB2E2")
    .attr("opacity", ".5")
    //.text("abbr");

    //append circle labels
var circleLabels = chartGroup.selectAll(null)
.data(dataj)
.enter()
.append("text")
.attr("x", d => xLinearScale(d[chosenXAxis]))
.attr("y", d => yLinearScale(d[chosenYAxis]))
  .text(d => d.abbr)
  .attr("font-family", "sans-serif")
  .attr("font-size", "8px")
  .attr("font-weight", "bold")
  .attr("text-anchor", "middle")
  .attr("fill", "white");
 
  // Create group for three x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var povertyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");

  var ageLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (Median)");

    var incomeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Household Income (Median)");

  // append y axis
  var yLabelsgroup = chartGroup.append("g")
    //.attr("transform", "rotate(-90)")

    // Create group for three y-axis labels
 var healthcareLabel = yLabelsgroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 40 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "healthcare")
    .classed("axis-text", true)
    .classed("active", true)
    .text("Lacks Healthcare (%)");

var smokesLabel = yLabelsgroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 20 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "smokes")
    .classed("axis-text", false)
    .classed("active", false)
    .text("Smokes (%)");

    var obesityLabel = yLabelsgroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "obesity")
    .classed("axis-text", false)
    .classed("active", false)
    .text("Obese (%)");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(dataj, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "age") {
            ageLabel
            .classed("active", true)
            .classed("inactive", false);
            povertyLabel
            .classed("active", false)
            .classed("inactive", true);
            incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "poverty") {
            ageLabel
            .classed("active", false)
            .classed("inactive", true);
            povertyLabel
            .classed("active", true)
            .classed("inactive", false);
            incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
            ageLabel
            .classed("active", false)
            .classed("inactive", true);
            povertyLabel
            .classed("active", false)
            .classed("inactive", true);
            incomeLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });

    // y axis labels event listener
    yLabelsgroup.selectAll("text")
  .on("click", function() {
    // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenYAxis) {

      // replaces chosenYAxis with value
      chosenYAxis = value;

      //console.log(chosenYAxis)

      // updates y scale for new data
      yLinearScale = yScale(dataj, chosenYAxis);

      // updates y axis with transition
      yAxis = renderYAxes(yLinearScale, yAxis);

      // updates circles with new y values
      circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

      //circleLabels = renderCircleLabelY(circleLabels, yLinearScale, chosenYAxis);

      // updates tooltips with new info
      circlesGroup = updateToolTipY(chosenYAxis, circlesGroup);

      // changes classes to change bold text
      if (chosenYAxis === "healthcare") {
          healthcareLabel
          .classed("active", true)
          .classed("inactive", false);
          smokesLabel
          .classed("active", false)
          .classed("inactive", true);
          obesityLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else if (chosenYAxis === "smokes") {
        healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
          smokesLabel
          .classed("active", true)
          .classed("inactive", false);
          obesityLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else {
        healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
          smokesLabel
          .classed("active", false)
          .classed("inactive", true);
          obesityLabel
          .classed("active", true)
          .classed("inactive", false);
      }
    }

  });
}).catch(function(error) {
  console.log(error);
});
