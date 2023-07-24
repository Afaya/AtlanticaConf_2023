import { ErrorReeResponse } from "../../models/interfaces/errorReeResponse";
import { ErrorTypeReeResponse } from "../../models/interfaces/ErrorTypeReeResponse";
import { ReeResponse } from "../../models/interfaces/reeResponse";
import { ShareFunctions } from "../shared-functions";

const shareFunctions = new ShareFunctions();

function searchInREE(url: string, callback: any): void {
    shareFunctions.ShowSpinner();

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
                    shareFunctions.SetErrors('Error: No Authorize');
                } else {
                    const currentErrorsRee = data as ErrorReeResponse;
                    let message = '';

                    if (currentErrorsRee && currentErrorsRee.errors) {
                        currentErrorsRee.errors.map((error: ErrorTypeReeResponse) => {
                            message = message + ' Code error: ' + error.code + ', status: ' + error.status + ', title: ' + error.title + ', detail: ' + error.detail;
                        });

                        shareFunctions.SetErrors('Error: ' + message);
                    } else {
                        shareFunctions.SetErrors('Error: unknown error getting information.');
                    }
                }

                shareFunctions.HideSpinner();
            } else {
                const reeResponse = data as ReeResponse;

                callback(reeResponse);

                shareFunctions.HideSpinner();
            }
        })
        .catch(error => {
            shareFunctions.SetErrors('Error: ' + error);
            shareFunctions.HideSpinner();
        });
}


export class REEFunctions {
    searchInREE = searchInREE;
}