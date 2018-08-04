import { toast } from 'react-toastify';

const DefaultErrorHandler = (data) => {
    // debugger;
    const ex = data.response.body;
    let message = '';
    if(ex.error_description) {
        message = ex.error_description;
    } else if(ex.error) {
        message = ex.error;
    } else if(data.message) {
        message = data.message;
    } else {
        message = 'An error occurred';
    }
    if(typeof message === 'object') {
        message = JSON.stringify(message);
    }
    // if (ex && ex.error && ex.error.Errors && ex.error.Errors.length) {
    //     const e = ex.error.Errors[0];
    //     message = e.ErrorCode === 'NotFound' ? `${e.Data.ObjectType} ${e.Data.ObjectID} not found.` : e.Message;
    // } else if (ex && ex.error && ex.error['error_description']) {
    //     message = ex.error['error_description'];
    // } else if (ex.error) {
    //     message = ex.error;
    // } else if (ex.message) {
    //     message = ex.message;
    // } else {
    //     message = 'An error occurred';
    // }
    // if (typeof message === 'object') {
    //     message = JSON.stringify(message);
    // }
    toast.error(message);
}
export default DefaultErrorHandler;