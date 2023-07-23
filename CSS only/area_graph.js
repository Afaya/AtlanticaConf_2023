const sideCells = 50;
const availableAreaColors = ['pink', 'orange', 'green', 'yellow', 'blue'];

function calculateNewAreaValue(valueToCalculate, maxCells, valuesSumUp){
  var valueCalculated = Math.floor(valueToCalculate * (maxCells / valuesSumUp));
  if(valueCalculated > 100){
    var partTo100 = valueCalculated % 100;
    valueCalculated = partTo100 >= 50 
                      ? valueCalculated + (100 - partTo100) 
                      : valueCalculated - partTo100;
  }
  return valueCalculated;
}

function calculateDataArea(){
  const maxCells = sideCells * sideCells;
  const valuesSumUp = dataToDisplayInGraphs.reduce(
    function (acc, obj) { return acc + obj.value; }, 0);
  return dataToDisplayInGraphs.map(d=>{
    return {
      name: d.name,
      value: calculateNewAreaValue(d.value, maxCells, valuesSumUp),
      originalValue: d.value
    }
  }); 
}

function generateAreaGrid(graphDiv){
  var sideWidth = ((15*30) / sideCells); 

  var currentDiv = document.createElement("div");
  currentDiv.classList.add('own-graph'); 
  currentDiv.classList.add('center-graph'); 
  currentDiv.setAttribute("id", "my_area_graph");
  currentDiv.style.gridTemplateColumns =
    'repeat(' + sideCells + ',' + sideWidth + 'px)';
  currentDiv.style.gridTemplateRows =
    'repeat(' + sideCells + ',' + sideWidth + 'px)';
  graphDiv.appendChild(currentDiv);
}

function generateDivs(currentColor, graphDiv, numberofDivs){
  for(var i=0; i<numberofDivs; i++){
    var currentDiv = document.createElement("div");
    currentDiv.classList.add(currentColor);
    graphDiv.appendChild(currentDiv);
  }
}

function generateLegend(colorTofillDiv, legendDiv, textToDisplay){
  var currentSpan = document.createElement("span");
  currentSpan.innerText  = textToDisplay;
  currentSpan.classList.add('area-graph-legend-span');
  currentSpan.classList.add(colorTofillDiv);
  legendDiv.appendChild(currentSpan);
}

function fillAreaGrid(graphDiv, dataToDisplay, legendDiv){
  var currentIndex = 0;
  dataToDisplay.forEach(data=>{
    const currentRandomColor = currentIndex < 5
                              ? availableAreaColors[currentIndex]
                              : availableAreaColors[currentIndex % 5];
    generateDivs(currentRandomColor, graphDiv, data.value);
    generateLegend(currentRandomColor, legendDiv, data.name + ' - ' + data.originalValue + ' pts');
    currentIndex++;
  });
}

function loadAreaGraph() {
  var currentMainDiv = document.getElementById('area-graph-calculated');
  var currentLegendDiv = document.getElementById('area-graph-legend');
  var calculatedData = calculateDataArea();

  if(calculatedData && calculatedData.length > 0){
      generateAreaGrid(currentMainDiv);
      var gridGraphDiv = document.getElementById('my_area_graph');
      fillAreaGrid(gridGraphDiv, calculatedData, currentLegendDiv);
  }

}