
import { IncludedReeResponse } from "../../models/interfaces/includedReeResponse";
import { ReeResponse } from "../../models/interfaces/reeResponse";
import { REEFunctions } from "./ree-functions";

let chartData: Array<IncludedReeResponse> = [];
// #endregion general chart configuration


function processReeData(reeResponse: ReeResponse): void {
}


export class REEData {
    processReeData = processReeData;
}