
import { IncludedReeResponse } from "../../models/interfaces/includedReeResponse";
import { ReeResponse } from "../../models/interfaces/reeResponse";
import { ValuesAttributesReeResponse } from "../../models/interfaces/valuesAttributesReeResponse";
import { REEFunctions } from "./ree-functions";

let chartData: Array<IncludedReeResponse> = [];

function getRealTimeUrl(days: number): string {
    const nowDate = new Date();
    const oneDay = (days * 24) * 60 * 60 * 1000;
    const yesterdayDate = new Date(nowDate.getTime() - oneDay);
    const realTimeUrl = 'https://apidatos.ree.es/es/datos/demanda/demanda-tiempo-real?start_date=' + yesterdayDate.toISOString() + '&end_date=' + nowDate.toISOString() + '&time_trunc=hour';

    return realTimeUrl;
}

function processTabColumnGraph(reeResponse: ReeResponse): void {
    let title = '';
    let lastUpdate = new Date();

    if (reeResponse && reeResponse.data && reeResponse.data.attributes) {
        title = reeResponse.data.attributes.title;
        lastUpdate = reeResponse.data.attributes['last-update'];
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

        const labelsList = document.getElementById('labelsColumnsGraph');

        if (labelsList) {
            labelsList.replaceChildren();

            chartData.map(included => {

                if (included.attributes && included.attributes.title) {
                    const liElement = document.createElement('li') as HTMLLIElement;
                    liElement.innerHTML = included.attributes.title;
                    labelsList.appendChild(liElement);
                }
            });
        }

        const titleElement = document.getElementById('titleColumnsGraph');

        if (titleElement) {
            titleElement.innerHTML = title;
        }

        const tBodyColumnsGraph = document.getElementById('tBodyColumnsGraph');
        if (tBodyColumnsGraph) {
            tBodyColumnsGraph.replaceChildren();

            let demandaReal = chartData.find(x => x.type == 'Demanda real');
            let demandaRealValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaReal && demandaReal.attributes.values) {
                demandaRealValues = demandaReal.attributes.values;
            }

            const demandaPrograma = chartData.find(x => x.type == 'Demanda programada');
            let demandaProgramaValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaPrograma && demandaPrograma.attributes.values) {
                demandaProgramaValues = demandaPrograma.attributes.values;
            }

            const demandaPrevista = chartData.find(x => x.type == 'Demanda prevista');
            let demandaPrevistaValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaPrevista && demandaPrevista.attributes.values) {
                demandaPrevistaValues = demandaPrevista.attributes.values;
            }

            let dateList: Array<Date> = [];

            dateList = dateList.concat(demandaRealValues.map(x => { return x.datetime }));
            dateList = dateList.concat(demandaProgramaValues.map(x => { return x.datetime }));
            dateList = dateList.concat(demandaPrevistaValues.map(x => { return x.datetime }));

            dateList.sort((dateA, dateB) => {
                const date1 = (new Date(dateA)).getTime();
                const date2 = (new Date(dateB)).getTime();

                return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
            });

            dateList = dateList.filter((value, index, array) => array.indexOf(value) === index);

            dateList.map(date => {
                const trElement = document.createElement('tr') as HTMLElement;
                const thElement = document.createElement('th') as HTMLElement;
                thElement.setAttribute("scope", "row");
                thElement.classList.add('tBodyColumScope');
                thElement.innerHTML = date.toString().substring(0, 19).replaceAll('T', ' ');
                trElement.appendChild(thElement);

                const demandaRealValue = demandaRealValues.find(x => x.datetime.toString() == date.toString());
                if (demandaRealValue) {
                    const tdDemandaReal = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaRealValue.percentage + ";";
                    tdDemandaReal.setAttribute("style", value);
                    tdDemandaReal.innerHTML = demandaRealValue.value.toString();
                    trElement.appendChild(tdDemandaReal);
                }

                const demandaProgramaValue = demandaProgramaValues.find(x => x.datetime.toString() == date.toString());
                if (demandaProgramaValue) {
                    const tdDemandaProgramada = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaProgramaValue.percentage + ";";
                    tdDemandaProgramada.setAttribute("style", value);
                    tdDemandaProgramada.innerHTML = demandaProgramaValue.value.toString();
                    trElement.appendChild(tdDemandaProgramada);
                }

                const demandaPrevistaValue = demandaPrevistaValues.find(x => x.datetime.toString() == date.toString());
                if (demandaPrevistaValue) {
                    const tdDemandaPrevista = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaPrevistaValue.percentage + ";";
                    tdDemandaPrevista.setAttribute("style", value);
                    tdDemandaPrevista.innerHTML = demandaPrevistaValue.value.toString();
                    trElement.appendChild(tdDemandaPrevista);
                }

                tBodyColumnsGraph.appendChild(trElement);
            });
        }
    }
}

function processTabColumnGraph3D(reeResponse: ReeResponse): void {
    let title = '';
    let lastUpdate = new Date();

    if (reeResponse && reeResponse.data && reeResponse.data.attributes) {
        title = reeResponse.data.attributes.title;
        lastUpdate = reeResponse.data.attributes['last-update'];
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

        const labelsList = document.getElementById('labelsColumns3DGraph');

        if (labelsList) {
            labelsList.replaceChildren();

            chartData.map(included => {

                if (included.attributes && included.attributes.title) {
                    const liElement = document.createElement('li') as HTMLLIElement;
                    liElement.innerHTML = included.attributes.title;
                    labelsList.appendChild(liElement);
                }
            });
        }

        const titleElement = document.getElementById('titleColumns3DGraph');

        if (titleElement) {
            titleElement.innerHTML = title;
        }

        const tBodyColumnsGraph = document.getElementById('tBodyColumns3DGraph');
        if (tBodyColumnsGraph) {
            tBodyColumnsGraph.replaceChildren();

            let demandaReal = chartData.find(x => x.type == 'Demanda real');
            let demandaRealValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaReal && demandaReal.attributes.values) {
                demandaRealValues = demandaReal.attributes.values;
            }

            const demandaPrograma = chartData.find(x => x.type == 'Demanda programada');
            let demandaProgramaValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaPrograma && demandaPrograma.attributes.values) {
                demandaProgramaValues = demandaPrograma.attributes.values;
            }

            const demandaPrevista = chartData.find(x => x.type == 'Demanda prevista');
            let demandaPrevistaValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaPrevista && demandaPrevista.attributes.values) {
                demandaPrevistaValues = demandaPrevista.attributes.values;
            }

            let dateList: Array<Date> = [];

            dateList = dateList.concat(demandaRealValues.map(x => { return x.datetime }));
            dateList = dateList.concat(demandaProgramaValues.map(x => { return x.datetime }));
            dateList = dateList.concat(demandaPrevistaValues.map(x => { return x.datetime }));

            dateList.sort((dateA, dateB) => {
                const date1 = (new Date(dateA)).getTime();
                const date2 = (new Date(dateB)).getTime();

                return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
            });

            dateList = dateList.filter((value, index, array) => array.indexOf(value) === index);

            dateList.map(date => {
                const trElement = document.createElement('tr') as HTMLElement;
                const thElement = document.createElement('th') as HTMLElement;
                thElement.setAttribute("scope", "row");
                thElement.classList.add('tBodyColumScope');
                thElement.innerHTML = date.toString().substring(0, 19).replaceAll('T', ' ');
                trElement.appendChild(thElement);

                const demandaRealValue = demandaRealValues.find(x => x.datetime.toString() == date.toString());
                if (demandaRealValue) {
                    const tdDemandaReal = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaRealValue.percentage + ";";
                    tdDemandaReal.setAttribute("style", value);
                    tdDemandaReal.innerHTML = demandaRealValue.value.toString();
                    trElement.appendChild(tdDemandaReal);
                }

                const demandaProgramaValue = demandaProgramaValues.find(x => x.datetime.toString() == date.toString());
                if (demandaProgramaValue) {
                    const tdDemandaProgramada = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaProgramaValue.percentage + ";";
                    tdDemandaProgramada.setAttribute("style", value);
                    tdDemandaProgramada.innerHTML = demandaProgramaValue.value.toString();
                    trElement.appendChild(tdDemandaProgramada);
                }

                const demandaPrevistaValue = demandaPrevistaValues.find(x => x.datetime.toString() == date.toString());
                if (demandaPrevistaValue) {
                    const tdDemandaPrevista = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaPrevistaValue.percentage + ";";
                    tdDemandaPrevista.setAttribute("style", value);
                    tdDemandaPrevista.innerHTML = demandaPrevistaValue.value.toString();
                    trElement.appendChild(tdDemandaPrevista);
                }

                tBodyColumnsGraph.appendChild(trElement);
            });
        }
    }
}

function processTabBarGraph(reeResponse: ReeResponse): void {
    let title = '';
    let lastUpdate = new Date();

    if (reeResponse && reeResponse.data && reeResponse.data.attributes) {
        title = reeResponse.data.attributes.title;
        lastUpdate = reeResponse.data.attributes['last-update'];
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

        const labelsList = document.getElementById('labelsBarGraph');

        if (labelsList) {
            labelsList.replaceChildren();

            chartData.map(included => {

                if (included.attributes && included.attributes.title) {
                    const liElement = document.createElement('li') as HTMLLIElement;
                    liElement.innerHTML = included.attributes.title;
                    labelsList.appendChild(liElement);
                }
            });
        }

        const titleElement = document.getElementById('titleBarGraph');

        if (titleElement) {
            titleElement.innerHTML = title;
        }

        const tBodyColumnsGraph = document.getElementById('tBodyBarGraph');
        if (tBodyColumnsGraph) {
            tBodyColumnsGraph.replaceChildren();

            let demandaReal = chartData.find(x => x.type == 'Demanda real');
            let demandaRealValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaReal && demandaReal.attributes.values) {
                demandaRealValues = demandaReal.attributes.values;
            }

            const demandaPrograma = chartData.find(x => x.type == 'Demanda programada');
            let demandaProgramaValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaPrograma && demandaPrograma.attributes.values) {
                demandaProgramaValues = demandaPrograma.attributes.values;
            }

            const demandaPrevista = chartData.find(x => x.type == 'Demanda prevista');
            let demandaPrevistaValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaPrevista && demandaPrevista.attributes.values) {
                demandaPrevistaValues = demandaPrevista.attributes.values;
            }

            let dateList: Array<Date> = [];

            dateList = dateList.concat(demandaRealValues.map(x => { return x.datetime }));
            dateList = dateList.concat(demandaProgramaValues.map(x => { return x.datetime }));
            dateList = dateList.concat(demandaPrevistaValues.map(x => { return x.datetime }));

            dateList.sort((dateA, dateB) => {
                const date1 = (new Date(dateA)).getTime();
                const date2 = (new Date(dateB)).getTime();

                return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
            });

            dateList = dateList.filter((value, index, array) => array.indexOf(value) === index);

            dateList.map(date => {
                const trElement = document.createElement('tr') as HTMLElement;
                const thElement = document.createElement('th') as HTMLElement;
                thElement.setAttribute("scope", "row");
                thElement.classList.add('tBodyBarScope');
                thElement.innerHTML = date.toString().substring(0, 19).replaceAll('T', ' ');
                trElement.appendChild(thElement);

                const demandaRealValue = demandaRealValues.find(x => x.datetime.toString() == date.toString());
                if (demandaRealValue) {
                    const tdDemandaReal = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaRealValue.percentage + ";";
                    tdDemandaReal.setAttribute("style", value);
                    tdDemandaReal.innerHTML = demandaRealValue.value.toString();
                    trElement.appendChild(tdDemandaReal);
                }

                const demandaProgramaValue = demandaProgramaValues.find(x => x.datetime.toString() == date.toString());
                if (demandaProgramaValue) {
                    const tdDemandaProgramada = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaProgramaValue.percentage + ";";
                    tdDemandaProgramada.setAttribute("style", value);
                    tdDemandaProgramada.innerHTML = demandaProgramaValue.value.toString();
                    trElement.appendChild(tdDemandaProgramada);
                }

                const demandaPrevistaValue = demandaPrevistaValues.find(x => x.datetime.toString() == date.toString());
                if (demandaPrevistaValue) {
                    const tdDemandaPrevista = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaPrevistaValue.percentage + ";";
                    tdDemandaPrevista.setAttribute("style", value);
                    tdDemandaPrevista.innerHTML = demandaPrevistaValue.value.toString();
                    trElement.appendChild(tdDemandaPrevista);
                }

                tBodyColumnsGraph.appendChild(trElement);
            });
        }
    }
}

function processTabLineGraph(reeResponse: ReeResponse): void {
    let title = '';
    let lastUpdate = new Date();

    if (reeResponse && reeResponse.data && reeResponse.data.attributes) {
        title = reeResponse.data.attributes.title;
        lastUpdate = reeResponse.data.attributes['last-update'];
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

        const labelsList = document.getElementById('labelsLineGraph');

        if (labelsList) {
            labelsList.replaceChildren();

            chartData.map(included => {

                if (included.attributes && included.attributes.title) {
                    const liElement = document.createElement('li') as HTMLLIElement;
                    liElement.innerHTML = included.attributes.title;
                    labelsList.appendChild(liElement);
                }
            });
        }

        const titleElement = document.getElementById('titleLineGraph');

        if (titleElement) {
            titleElement.innerHTML = title;
        }

        const tBodyColumnsGraph = document.getElementById('tBodyLineGraph');
        if (tBodyColumnsGraph) {
            tBodyColumnsGraph.replaceChildren();

            let demandaReal = chartData.find(x => x.type == 'Demanda real');
            let demandaRealValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaReal && demandaReal.attributes.values) {
                demandaRealValues = demandaReal.attributes.values;
            }

            const demandaPrograma = chartData.find(x => x.type == 'Demanda programada');
            let demandaProgramaValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaPrograma && demandaPrograma.attributes.values) {
                demandaProgramaValues = demandaPrograma.attributes.values;
            }

            const demandaPrevista = chartData.find(x => x.type == 'Demanda prevista');
            let demandaPrevistaValues: Array<ValuesAttributesReeResponse> = [];
            if (demandaPrevista && demandaPrevista.attributes.values) {
                demandaPrevistaValues = demandaPrevista.attributes.values;
            }

            let dateList: Array<Date> = [];

            dateList = dateList.concat(demandaRealValues.map(x => { return x.datetime }));
            dateList = dateList.concat(demandaProgramaValues.map(x => { return x.datetime }));
            dateList = dateList.concat(demandaPrevistaValues.map(x => { return x.datetime }));

            dateList.sort((dateA, dateB) => {
                const date1 = (new Date(dateA)).getTime();
                const date2 = (new Date(dateB)).getTime();

                return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
            });

            dateList = dateList.filter((value, index, array) => array.indexOf(value) === index);

            dateList.map(date => {
                const trElement = document.createElement('tr') as HTMLElement;
                const thElement = document.createElement('th') as HTMLElement;
                thElement.setAttribute("scope", "row");
                thElement.classList.add('tBodyLineGraph');
                thElement.innerHTML = date.toString().substring(0, 19).replaceAll('T', ' ');
                trElement.appendChild(thElement);

                const demandaRealValue = demandaRealValues.find(x => x.datetime.toString() == date.toString());
                if (demandaRealValue) {
                    const tdDemandaReal = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaRealValue.percentage + ";";
                    tdDemandaReal.setAttribute("style", value);
                    tdDemandaReal.innerHTML = demandaRealValue.value.toString();
                    trElement.appendChild(tdDemandaReal);
                }

                const demandaProgramaValue = demandaProgramaValues.find(x => x.datetime.toString() == date.toString());
                if (demandaProgramaValue) {
                    const tdDemandaProgramada = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaProgramaValue.percentage + ";";
                    tdDemandaProgramada.setAttribute("style", value);
                    tdDemandaProgramada.innerHTML = demandaProgramaValue.value.toString();
                    trElement.appendChild(tdDemandaProgramada);
                }

                const demandaPrevistaValue = demandaPrevistaValues.find(x => x.datetime.toString() == date.toString());
                if (demandaPrevistaValue) {
                    const tdDemandaPrevista = document.createElement('td') as HTMLElement;
                    const value = "--size: " + demandaPrevistaValue.percentage + ";";
                    tdDemandaPrevista.setAttribute("style", value);
                    tdDemandaPrevista.innerHTML = demandaPrevistaValue.value.toString();
                    trElement.appendChild(tdDemandaPrevista);
                }

                tBodyColumnsGraph.appendChild(trElement);
            });
        }
    }
}

function drawData(tabId: string): void {
    const reeFunction = new REEFunctions();

    switch (tabId) {
        case 'tabColumnGraph':
            reeFunction.searchInREE(getRealTimeUrl(0.1), processTabColumnGraph); // medio dia --> 0.5, un dia --> 1
            break
        case 'tabColumnGraph3D':
            reeFunction.searchInREE(getRealTimeUrl(0.1), processTabColumnGraph3D); // medio dia --> 0.5, un dia --> 1
            break
        case 'tabBarGraph':
            reeFunction.searchInREE(getRealTimeUrl(0.5), processTabBarGraph);
            break
        case 'tabLineGraph':
            // reeFunction.searchInREE(getRealTimeUrl(0.5), processTabLineGraph);
            break
        case 'tabAreaGraph':
            break
        case 'tabRadialGraph':
            break
        case 'tabPieGraph':
            break
        case 'tabPolarGraph':
            break
        case 'tabRadarGraph':
            break
        case 'tabMixedGraph':
            break
    }
}


export class DrawData {
    drawData = drawData;
}