const availableBubbleColors = ['pink', 'orange', 'green', 'yellow', 'blue'];

function generateBubbleGrid(currentGraphDiv, calculatedData) {
    var numberColumns = 3 * calculatedData.length;
    var columnWidth = numberColumns > 15 ? ((15*30) / numberColumns) : 30 
    currentGraphDiv.style.gridTemplateColumns =
        'repeat(' + numberColumns + ',' + columnWidth + 'px)';
    currentGraphDiv.style.gridTemplateRows =
        'repeat(' + numberColumns + ',' + columnWidth + 'px)';
    
    return numberColumns;
}

function calculateBubbleSize(maxValue, currentValue) {
    const valueInPercent = Math.ceil((currentValue * 100) / maxValue);
    if (valueInPercent > 75) {
        return 3;
    } else if (valueInPercent > 50) {
        return 2;
    } else {
        return 1;
    }
}

function calculateDataInBubbles() {
    const maxValue = Math.max(...dataToDisplayInGraphs.map(o => o.value));
    return dataToDisplayInGraphs.map(d => {
        return {
            name: d.name,
            value: calculateBubbleSize(maxValue, d.value),
            originalValue: d.value
        }
    });
}

function getRandomBubbleNumber(max, min){
    return Math.floor(
        Math.random() * (max - min) + min
      );
}

function fillBubbleGrid(calculatedData, currentGraphDiv, numberRows){
    var currentDataPosition = 1;
    var currentDataIndex = 0;
    calculatedData.forEach(data=>{
        var currentDiv = document.createElement("div");
        currentDiv.classList.add('bubble');
        if(dataToDisplayInGraphs.length > 5){
            const currentRandomColor = getRandomBubbleNumber(4, 0);
            currentDiv.classList.add(availableBubbleColors[currentRandomColor]);
        } else {
            currentDiv.classList.add(availableBubbleColors[currentDataIndex]);
            currentDataIndex++;
        }
        const currentRandomRowStart = getRandomBubbleNumber(numberRows-3, 1);
        currentDiv.style.gridRowStart = currentRandomRowStart;
        currentDiv.style.gridRowEnd = currentRandomRowStart + data.value;
        currentDiv.style.gridColumnStart = currentDataPosition;
        currentDiv.style.gridColumnEnd = currentDataPosition + data.value;
        currentDataPosition += 3;
        currentDiv.innerHTML = data.name;

        currentGraphDiv.appendChild(currentDiv);
    })
}


function loadBubbleGraph() {
    var graphDiv = document.getElementById('bubble-graph-calculated');
    var bubbleData = calculateDataInBubbles();
    var numberRows = generateBubbleGrid(graphDiv, bubbleData);
    fillBubbleGrid(bubbleData, graphDiv, numberRows);
}

