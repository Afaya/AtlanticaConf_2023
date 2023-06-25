import { ErrorReeResponse } from "../../models/interfaces/errorReeResponse";
import { ErrorTypeReeResponse } from "../../models/interfaces/ErrorTypeReeResponse";
import { ReeResponse } from "../../models/interfaces/reeResponse";


function searchInREE(url: string, callback: any): void {
    fetch(url, {
        method: 'GET'
        // ,
        // headers: {
        //     'Accept': '*/*',
        //     'Content-Type': 'application/json; charset=utf-8'
        // }
    })
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;

            if (!response.ok) {
                const error = response.status;

                if (error == 401) {
                } else {
                    const currentErrorsRee = data as ErrorReeResponse;
                    let message = '';

                    if (currentErrorsRee && currentErrorsRee.errors) {
                        currentErrorsRee.errors.map((error: ErrorTypeReeResponse) => {
                            message = message + ' Code error: ' + error.code + ', status: ' + error.status + ', title: ' + error.title + ', detail: ' + error.detail;
                        });
                    } else {
                    }
                }
            } else {
                const reeResponse = data as ReeResponse;

                callback(reeResponse);
            }
        })
        .catch(error => {
        });
}


export class REEFunctions {
    searchInREE = searchInREE;
}