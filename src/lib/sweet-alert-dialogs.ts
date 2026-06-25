const defaultOptions = {
    buttonsStyling: false,
    customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-light',
    },
};

export const Dialog = {
    alert(
        message: string,
        type: 'success' | 'error' | 'warning' | 'info' = 'info'
    ) {
        return Swal.fire({
            ...defaultOptions,
            icon: type,
            text: message,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
        });
    },

    confirm(
        message: string,
        title = 'Confirmación'
    ) {
        return Swal.fire({
            ...defaultOptions,
            title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            allowOutsideClick: false,
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-light',
            },
        });
    },

    loading(message:string,isText = false){
        let text = "";
        if (isText) {
            text = message;
            message = "";
        }
        return Swal.fire({
            icon: '',
            title: message,
            html: text,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
    },

    success(message: string) {
        return this.alert(message, 'success');
    },

    error(message: string) {
        return this.alert(message, 'error');
    },

    info(message: string) {
        return this.alert(message, 'info');
    },

    warning(message: string) {
        return this.alert(message, 'warning');
    },
};