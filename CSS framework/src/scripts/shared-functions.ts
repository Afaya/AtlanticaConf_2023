function showSpinner(): void {
    const spinnerDiv = document.getElementById('spinner');

    if (spinnerDiv) {
        spinnerDiv.classList.add("showVisibilityDisplay");
    }
}

function hideSpinner(): void {
    const spinnerDiv = document.getElementById('spinner');

    if (spinnerDiv) {
        spinnerDiv.classList.remove("showVisibilityDisplay");
    }
}



function clearErrors(): void {
    const errorContainer = document.getElementById('errorBody');
    const errorMessageContent = document.getElementById('errorMessageContent');

    if (errorContainer) {
        errorContainer.classList.remove("showFlexDisplay");
    }

    if (errorMessageContent) {
        errorMessageContent.innerHTML = '';
    }
}

function setErrors(MessageError: string): void {
    const errorContainer = document.getElementById('errorBody');
    const errorMessageContent = document.getElementById('errorMessageContent');

    if (errorContainer) {
        errorContainer.classList.add("showFlexDisplay");
    }

    if (errorMessageContent) {
        errorMessageContent.innerHTML = MessageError;
    }
}

function clearInfo(): void {
    const infoContainer = document.getElementById('infoBody');
    const infoMessageContent = document.getElementById('infoMessageContent');

    if (infoContainer) {
        infoContainer.classList.remove("showFlexDisplay");
    }

    if (infoMessageContent) {
        infoMessageContent.innerHTML = '';
    }
}

function setInfo(MessageInfo: string): void {
    const infoContainer = document.getElementById('infoBody');
    const infoMessageContent = document.getElementById('infoMessageContent');

    if (infoContainer) {
        infoContainer.classList.add("showFlexDisplay");
    }

    if (infoMessageContent) {
        infoMessageContent.innerHTML = MessageInfo;
    }
}

export class ShareFunctions {
    ShowSpinner = showSpinner;
    HideSpinner = hideSpinner;
    ClearErrors = clearErrors;
    SetErrors = setErrors;
    ClearInfo = clearInfo;
    SetInfo = setInfo;
}