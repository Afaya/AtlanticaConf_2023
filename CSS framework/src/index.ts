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
    const tableWithGraphElement = document.getElementById('tabBarGraph');

    if (tableWithGraphElement) {
        tableWithGraphElement.style.display = "none";
    }

    const currentTab = document.getElementById(tabId);

    if (currentTab) {
        currentTab.style.display = "flex";
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