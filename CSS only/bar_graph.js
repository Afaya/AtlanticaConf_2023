const maxCeils = 50;

function calculateDataInPercent(){
   const maximumValueInData = Math.max(...dataToDisplayInGraphs.map(o => o.value));
   const maximumValueInGraph = Math.ceil(maximumValueInData / 10) * 10;

   return dataToDisplayInGraphs.map(d=>{
    return {
        name: d.name,
        value: Math.ceil(d.value * maxCeils / maximumValueInGraph),
        originalValue: d.value
    }
   });
}

function generateBarGrid(currentGraphDiv, calculatedData){
    currentGraphDiv.style.gridTemplateRows = 'repeat(' + maxCeils + ', 1vh)';
    var calculatedColumnWidth = calculatedData.length < 20 ? 100/ calculatedData.length :5;
    currentGraphDiv.style.gridTemplateColumns = 
        'repeat(' + calculatedData.length + ',' + calculatedColumnWidth +'%)';
    return calculatedColumnWidth;      
}

function fillBarGrid(currentGraphDiv, calculatedData, columnWidth){
    calculatedData.forEach(data=>{
        var currentDiv = document.createElement("div");
        currentDiv.classList.add('bar-graph-bar');
        currentDiv.style.gridRowStart = maxCeils + 1;
        currentDiv.style.gridRowEnd = maxCeils + 1 - data.value;
        currentDiv.innerHTML = data.originalValue + 'pts';

        currentGraphDiv.appendChild(currentDiv);
        generateXaxis(columnWidth, data.name)
    })
}

function generateXaxis(columnWidth, text){
    var currentXaxis = document.getElementById('bar-graph-x-axis');
    var currentSpan = document.createElement("span");
    currentSpan.classList.add('bar-graph-x-axis-span');
    currentSpan.style.width = columnWidth + '%';
    currentSpan.innerHTML = text;
    currentXaxis.appendChild(currentSpan);
}


