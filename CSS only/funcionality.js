const dataToDisplayInGraphs=[
    {
        name:'Victoria',
        value: 33
    },
    {
        name:'Cristina',
        value: 18
    },
    {
        name:'Aida',
        value: 22
    },
    {
        name:'Micaela',
        value: 52
    },
    {
        name:'Lucia',
        value: 20
    }
];

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

function generateGrid(currentGraphDiv, calculatedData){
    currentGraphDiv.style.gridTemplateRows = 'repeat(' + maxCeils + ', 1vh)';
    var calculatedColumnWidth = calculatedData.length < 20 ? 100/ calculatedData.length :5;
    currentGraphDiv.style.gridTemplateColumns = 
        'repeat(' + calculatedData.length + ',' + calculatedColumnWidth +'%)';
    return calculatedColumnWidth;      
}

function fillGrid(currentGraphDiv, calculatedData, columnWidth){
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

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

document.addEventListener("DOMContentLoaded", function(event) {
    var currentGraphDiv = document.getElementById('bar-graph-calculated');
    var calculatedData = calculateDataInPercent();

    if(calculatedData && calculatedData.length > 0){
        var columnWidth = generateGrid(currentGraphDiv, calculatedData);
        fillGrid(currentGraphDiv, calculatedData, columnWidth);
    }

    document.getElementById('bar').style.display = "block";
    document.getElementsByClassName('tablinks')[0].classList.add('active');
});

