var isLineGraphCalculated = false;
var isBubbleGraphCalculated = false;

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

    if(tabName == 'bubble' && !isBubbleGraphCalculated){
        loadBubbleGraph();
        isBubbleGraphCalculated = true;
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    var currentGraphDiv = document.getElementById('bar-graph-calculated');
    var calculatedData = calculateDataInPercent();

    if(calculatedData && calculatedData.length > 0){
        var columnWidth = generateBarGrid(currentGraphDiv, calculatedData);
        fillBarGrid(currentGraphDiv, calculatedData, columnWidth);
    }

    document.getElementById('bar').style.display = "block";
    document.getElementsByClassName('tablinks')[0].classList.add('active');
});