
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

function processTabColumnGraphStacked(reeResponse: ReeResponse): void {
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

        const labelsList = document.getElementById('labelsColumnsGraphStacked');

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

        const titleElement = document.getElementById('titleColumnsGraphStacked');

        if (titleElement) {
            titleElement.innerHTML = title;
        }

        const tBodyColumnsGraphStacked = document.getElementById('tBodyColumnsGraphStacked');
        if (tBodyColumnsGraphStacked) {
            tBodyColumnsGraphStacked.replaceChildren();

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
                thElement.classList.add('tBodyColumStackedScope');
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

                tBodyColumnsGraphStacked.appendChild(trElement);
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

        const tBodyColumns3DGraph = document.getElementById('tBodyColumns3DGraph');
        if (tBodyColumns3DGraph) {
            tBodyColumns3DGraph.replaceChildren();

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

                tBodyColumns3DGraph.appendChild(trElement);
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

        const tBodyBarGraph = document.getElementById('tBodyBarGraph');
        if (tBodyBarGraph) {
            tBodyBarGraph.replaceChildren();

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

                tBodyBarGraph.appendChild(trElement);
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


                    switch (liElement.innerHTML) {
                        case 'Demanda real':
                            liElement.classList.add('legendRed');
                        break;
                         case 'Demanda programada':
                            liElement.classList.add('legendBlue');
                        break;
                        case 'Demanda prevista':
                            liElement.classList.add('legendGreen');
                        break;
                    }

                    labelsList.appendChild(liElement);
                }
            });
        }

        const titleElement = document.getElementById('titleLineGraph');

        if (titleElement) {
            titleElement.innerHTML = title;
        }

        const tBodyLineGraph = document.getElementById('tBodyLineGraph');
        if (tBodyLineGraph) {
            tBodyLineGraph.replaceChildren();

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

            dateList.map((date: Date, index: number) => {
                const trElement = document.createElement('tr') as HTMLElement;
                const thElement = document.createElement('th') as HTMLElement;
                thElement.setAttribute("scope", "row");
                thElement.classList.add('tBodyLineScope');
                thElement.innerHTML = date.toString().substring(0, 19).replaceAll('T', ' ');
                trElement.appendChild(thElement);

                const demandaRealValue = demandaRealValues.find(x => x.datetime.toString() == date.toString());
                let previoDemandaRealValue: ValuesAttributesReeResponse | undefined;
                
                if (index > 0) {
                    previoDemandaRealValue = demandaRealValues.find(x => x.datetime.toString() == dateList[index-1].toString());
                } else if (demandaRealValue) {
                    previoDemandaRealValue = { percentage: demandaRealValue.percentage} as ValuesAttributesReeResponse;
                }
              
                if (demandaRealValue && previoDemandaRealValue) {
                    const tdDemandaReal = document.createElement('td') as HTMLElement;

                    const value =  "--start: " + previoDemandaRealValue.percentage + ";" + "--size: " + demandaRealValue.percentage + ";--color: red;";

                    tdDemandaReal.setAttribute("style", value);
                    tdDemandaReal.innerHTML = "<span class='data labelRed'>" + demandaRealValue.value.toString() + "</span>";
                    trElement.appendChild(tdDemandaReal);
                }

                const demandaProgramaValue = demandaProgramaValues.find(x => x.datetime.toString() == date.toString());
                let previoDemandaProgramaValue: ValuesAttributesReeResponse | undefined;
                
                if (index > 0) {
                    previoDemandaProgramaValue = demandaProgramaValues.find(x => x.datetime.toString() == dateList[index-1].toString());
                } else if (demandaProgramaValue) {
                    previoDemandaProgramaValue = { percentage: demandaProgramaValue.percentage} as ValuesAttributesReeResponse;
                }

                if (demandaProgramaValue && previoDemandaProgramaValue) {
                    const tdDemandaProgramada = document.createElement('td') as HTMLElement;

                    const value =  "--start: " + previoDemandaProgramaValue.percentage + ";" + "--size: " + demandaProgramaValue.percentage + ";--color: blue;";

                    tdDemandaProgramada.setAttribute("style", value);
                    tdDemandaProgramada.innerHTML = "<span class='data labelBlue'>" + demandaProgramaValue.value.toString() + "</span>";
                    trElement.appendChild(tdDemandaProgramada);
                }

                const demandaPrevistaValue = demandaPrevistaValues.find(x => x.datetime.toString() == date.toString());
                let previoDemandaPrevistaValue: ValuesAttributesReeResponse | undefined;
                
                if (index > 0) {
                    previoDemandaPrevistaValue = demandaPrevistaValues.find(x => x.datetime.toString() == dateList[index-1].toString());
                } else if (demandaPrevistaValue) {
                    previoDemandaPrevistaValue = { percentage: demandaPrevistaValue.percentage} as ValuesAttributesReeResponse;
                }

                if (demandaPrevistaValue && previoDemandaPrevistaValue) {
                    const tdDemandaPrevista = document.createElement('td') as HTMLElement;

                    const value = "--start: " + previoDemandaPrevistaValue.percentage + ";" + "--size: " + demandaPrevistaValue.percentage + ";--color: green;";

                    tdDemandaPrevista.setAttribute("style", value);
                    tdDemandaPrevista.innerHTML = "<span class='data labelGreen'>" + demandaPrevistaValue.value.toString() + "</span>";
                    trElement.appendChild(tdDemandaPrevista);
                }

                tBodyLineGraph.appendChild(trElement);
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
        case 'tabColumnGraphStacked':
            reeFunction.searchInREE(getRealTimeUrl(0.1), processTabColumnGraphStacked); // medio dia --> 0.5, un dia --> 1
            break
        case 'tabColumnGraph3D':
            reeFunction.searchInREE(getRealTimeUrl(0.1), processTabColumnGraph3D); // medio dia --> 0.5, un dia --> 1
            break
        case 'tabBarGraph':
            reeFunction.searchInREE(getRealTimeUrl(0.5), processTabBarGraph);
            break
        case 'tabLineGraph':
            reeFunction.searchInREE(getRealTimeUrl(0.1), processTabLineGraph);
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