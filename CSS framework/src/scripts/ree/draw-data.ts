
import { IncludedReeResponse } from "../../models/interfaces/includedReeResponse";
import { ReeResponse } from "../../models/interfaces/reeResponse";
import { REEFunctions } from "./ree-functions";

let chartData: Array<IncludedReeResponse> = [];



function getRealTimeUrl(): string {
    const nowDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const yesterdayDate = new Date(nowDate.getTime() - oneDay);
    const realTimeUrl = 'https://apidatos.ree.es/es/datos/demanda/demanda-tiempo-real?start_date=' + yesterdayDate.toISOString() + '&end_date=' + nowDate.toISOString() + '&time_trunc=hour';

    return realTimeUrl;
}

function processReeData(reeResponse: ReeResponse): void {
    if (reeResponse && reeResponse.data && reeResponse.data.attributes) {
        const title = reeResponse.data.attributes.title;
        const lastUpdate = reeResponse.data.attributes['last-update'];
    } 
    
    if (reeResponse.included) {
        chartData = reeResponse.included;

        let currentChartData: IncludedReeResponse[] = [];

        chartData.map(included => {
            if (included.attributes.values) {
                currentChartData.push(included);
            } else if (included.attributes.content) {
                const currentInternalIncludeds = included.attributes.content;

                currentChartData = currentChartData.concat(currentInternalIncludeds);
            }
        });

        chartData = currentChartData;

        // create html table
    }
    
}

function drawData(): void {
    const reeFunction = new REEFunctions();
    reeFunction.searchInREE(getRealTimeUrl(), processReeData);
}


export class DrawData {
    drawData = drawData;
}