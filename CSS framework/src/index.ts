'use strict';

import { DrawData } from './scripts/ree/draw-data';

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
    const tabColumnGraph = document.getElementById('tabColumnGraph');
    const tabAreaGraph = document.getElementById('tabAreaGraph');
    const tabRadialGraph = document.getElementById('tabRadialGraph');
    const tabPieGraph = document.getElementById('tabPieGraph');
    const tabPolarGraph = document.getElementById('tabPolarGraph');
    const tabRadarGraph = document.getElementById('tabRadarGraph');
    const tabMixedGraph = document.getElementById('tabMixedGraph');

    if (tabBarGraph) {
        tabBarGraph.style.display = 'none';
    }

    if (tabLineGraph) {
        tabLineGraph.style.display = 'none';
    }

    if (tabColumnGraph) {
        tabColumnGraph.style.display = 'none';
    }

    if (tabAreaGraph) {
        tabAreaGraph.style.display = 'none';
    }

    if (tabRadialGraph) {
        tabRadialGraph.style.display = 'none';
    }

    if (tabPieGraph) {
        tabPieGraph.style.display = 'none';
    }

    if (tabPolarGraph) {
        tabPolarGraph.style.display = 'none';
    }

    if (tabRadarGraph) {
        tabRadarGraph.style.display = 'none';
    }

    if (tabMixedGraph) {
        tabMixedGraph.style.display = 'none';
    }

    const currentTab = document.getElementById(tabId);

    if (currentTab) {
        currentTab.style.display = 'flex';
    }


    const button_tabBarGraph = document.getElementById('button_tabBarGraph');
    const button_tabLineGraph = document.getElementById('button_tabLineGraph');
    const button_tabColumnGraph = document.getElementById('button_tabColumnGraph');
    const button_tabAreaGraph = document.getElementById('button_tabAreaGraph');
    const button_tabRadialGraph = document.getElementById('button_tabRadialGraph');
    const button_tabPieGraph = document.getElementById('button_tabPieGraph');
    const button_tabPolarGraph = document.getElementById('button_tabPolarGraph');
    const button_tabRadarGraph = document.getElementById('button_tabRadarGraph');
    const button_tabMixedGraph = document.getElementById('button_tabMixedGraph');

    if (button_tabBarGraph) {
        button_tabBarGraph.classList.remove('buttonSelected');
    }

    if (button_tabLineGraph) {
        button_tabLineGraph.classList.remove('buttonSelected');
    }

    if (button_tabColumnGraph) {
        button_tabColumnGraph.classList.remove('buttonSelected');
    }

    if (button_tabAreaGraph) {
        button_tabAreaGraph.classList.remove('buttonSelected');
    }

    if (button_tabRadialGraph) {
        button_tabRadialGraph.classList.remove('buttonSelected');
    }

    if (button_tabPieGraph) {
        button_tabPieGraph.classList.remove('buttonSelected');
    }

    if (button_tabPolarGraph) {
        button_tabPolarGraph.classList.remove('buttonSelected');
    }

    if (button_tabRadarGraph) {
        button_tabRadarGraph.classList.remove('buttonSelected');
    }

    if (button_tabMixedGraph) {
        button_tabMixedGraph.classList.remove('buttonSelected');
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