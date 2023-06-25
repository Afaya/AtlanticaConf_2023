'use strict';

import { REEData } from "./scripts/ree/ree-data";

declare global {
    interface Window {
        processReeData: any;
    }
}


// #region reedata
function processReeData(): void {
    const reeData = new REEData();
    reeData.processReeData;
}
// #endregion reedata


// assign global functions webpack
window.processReeData = processReeData;