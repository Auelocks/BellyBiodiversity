# BellyBiodiversity
This project uses JavaScript, Plotly, and D3.js to create visualizations for bacterial species (OTUs) by sample ID.

## Summary
The bacterial data and visualizations are displayed on an interactive webpage where each individual test subject is identified by Test Subject ID Number.  The Demographic Info for each test subject, Top 10 Bacteria Cultures Found in subjects’ belly buttons (including names and counts), and the test subjects’ reported washing frequency can be isolated and viewed by selecting Test Subject ID No. from the dropdown menu. The bubble plot illustrates the full profile of Bacteria Cultures per Sample for the selected test subject:


## Important Files
 * samples.json (raw data) 
 * charts.js (includes script for rendering plots, used to integrate with Plotly and html)
 * index.html
   * code will display the web app data/images
   * css stylesheet is found in the css folder
   * source images are found in the images folder
