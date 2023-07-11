'use strict';

import { DrawData } from "./scripts/ree/draw-data";

declare global {
    interface Window {
        drawReeData: any;
        showHideTab: any;
    }
}

// #region general functions
function showHideTab(tabId: string): void {
    const tabBarGraph = document.getElementById('tabBarGraph');
    const tabLineGraph = document.getElementById('tabLineGraph');

    if (tabBarGraph) {
        tabBarGraph.style.display = "none";
    }

    if (tabLineGraph) {
        tabLineGraph.style.display = "none";
    }

    const currentTab = document.getElementById(tabId);

    if (currentTab) {
        currentTab.style.display = "flex";
    }


    const button_tabBarGraph = document.getElementById('button_tabBarGraph');
    const button_tabLineGraph = document.getElementById('button_tabLineGraph');

    if (button_tabBarGraph) {
        button_tabBarGraph.classList.remove('buttonSelected');
    }

    if (button_tabLineGraph) {
        button_tabLineGraph.classList.remove('buttonSelected');
    }

    const currentButtonId = 'button_' + tabId;
    const currentButton = document.getElementById(currentButtonId);

    if (currentButton) {
        currentButton.classList.add('buttonSelected');
    }

    drawReeData();
}
// #endregion general functions

// #region reedata
function drawReeData(): void {
    const drawData = new DrawData();
    drawData.drawData();
}
// #endregion reedata


// assign global functions webpack
window.drawReeData = drawReeData;
window.showHideTab = showHideTab;