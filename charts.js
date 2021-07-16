function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    //console.log(data);
    // 3. Create a variable that holds the samples array. 
    var sample_values = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = sample_values.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    //console.log(result);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    //console.log(otu_ids);
    var otuID = {};
    for (var i=0; i<otu_ids.length;++i){otuID[i]=`OTU ID ${otu_ids[i]}`}
    var otuIDvalues = Object.values(otuID);
    //console.log(otuIDvalues);
    var otu_labels = result.otu_labels;
    var sampleValues = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var sampleValuesDecending = sampleValues.sort((a,b) =>b - a);
    // console.log(sampleValuesDecending);
    // console.log(sampleValues);  //Just checking to see if values are in order

    var top10Values = sampleValuesDecending.slice(0,10).reverse();
    var top10IDs = otuIDvalues.slice(0,10).reverse();
    var top10labels = otu_labels.slice(0,10).reverse();

    var trace1 = {
      x: top10Values,
      y: top10IDs,
      text: top10labels,
      type: 'bar',
      orientation: 'h',
      marker: {
        color: top10Values,
        colorscale: 'Bluered'
      }
    };
     console.log(trace1);
    // 8. Create the trace for the bar chart. 
    var barData = [trace1];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // Deliverable2
    // 1. Create the trace for the bubble chart.
    var trace2 = {
      x: otu_ids,
      y: sampleValues,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        colorscale: 'Earth',
        size: sampleValues,
        sizeref: 1.5,
        sizemode: 'radius'
      }
    };
    
    var bubbleData = [trace2];
    //console.log(bubbleData);

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
        title: 'Bacteria Cultures per Sample',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {title: "OTU ID"}
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  });

    // Deliverable 3
  d3.json("samples.json").then((data) => {
    var metaData = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metaData.filter(sampleObj => sampleObj.id == sample);
    console.log(resultArray);
    // Use d3 to select the panel with id of `gauge`
    var gauge = d3.select("#gauge");
  
    // 3. Create a variable that holds the washing frequency.
    wfreq = resultArray[0].wfreq;
    wfreqInt = parseInt(wfreq);
    console.log(wfreqInt);
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      type: "indicator",
      value: wfreq,
      mode: "gauge+number",
      title: {text: "Scrubs per Week", font: {size: 16}},
      gauge: {
        axis: {range: [0,10], tickwidth: 1},
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "green"},
          {range: [8,10], color: "blue"},
        ]
      }
    }];
     
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      title: {text: "Belly Button Washing Frequency", font: {size: 20}}

    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  

  });
}

