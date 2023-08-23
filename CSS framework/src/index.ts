'use strict';

import { DrawData } from './scripts/ree/draw-data';
import { ShareFunctions } from './scripts/shared-functions';

declare global {
    interface Window {
        showSpinner: any;
        hideSpinner: any;
        drawReeData: any;
        showHideTab: any;
        clearErrors: any;
        setErrors: any;
        clearInfo: any;
        setInfo: any;
    }
}

// #region general functions
function showHideTab(tabId: string): void {
    const tabBarGraph = document.getElementById('tabBarGraph');
    const tabLineGraph = document.getElementById('tabLineGraph');
    const tabColumnGraph = document.getElementById('tabColumnGraph');
    const tabColumnGraph3D = document.getElementById('tabColumnGraph3D');
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

    if (tabColumnGraph3D) {
        tabColumnGraph3D.style.display = 'none';
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
        if (tabId == 'tabMixedGraph') {
            currentTab.style.display = 'grid';
        } else {
            currentTab.style.display = 'flex';
        }
    }


    const button_tabBarGraph = document.getElementById('button_tabBarGraph');
    const button_tabLineGraph = document.getElementById('button_tabLineGraph');
    const button_tabColumnGraph = document.getElementById('button_tabColumnGraph');
    const button_tabColumnGraph3D = document.getElementById('button_tabColumnGraph3D');
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

    if (button_tabColumnGraph3D) {
        button_tabColumnGraph3D.classList.remove('buttonSelected');
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

    drawReeData(tabId);
}
// #endregion general functions

// #region reedata
function drawReeData(tabId: string): void {
    const drawData = new DrawData();
    drawData.drawData(tabId);
}
// #endregion reedata

// #region ShareFunctions
function showSpinner(): void {
    const shareFunctions = new ShareFunctions();
    shareFunctions.ShowSpinner();
}

function hideSpinner(): void {
    const shareFunctions = new ShareFunctions();
    shareFunctions.HideSpinner();
}

function clearErrors(): void {
    const shareFunctions = new ShareFunctions();
    shareFunctions.ClearErrors();
}

function setErrors(MessageError: string): void {
    const shareFunctions = new ShareFunctions();
    shareFunctions.SetErrors(MessageError);
}

function clearInfo(): void {
    const shareFunctions = new ShareFunctions();
    shareFunctions.ClearInfo();
}

function setInfo(MessageInfo: string): void {
    const shareFunctions = new ShareFunctions();
    shareFunctions.SetInfo(MessageInfo);
}
// #endregion ShareFunctions

// assign global functions webpack
window.showSpinner = showSpinner;
window.hideSpinner = hideSpinner;
window.drawReeData = drawReeData;
window.showHideTab = showHideTab;
window.clearErrors = clearErrors;
window.setErrors = setErrors;
window.clearInfo = clearInfo;
window.setInfo = setInfo;