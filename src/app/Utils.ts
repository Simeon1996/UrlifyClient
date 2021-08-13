export default class Utils {
    static getErrorMessage(data) {
        if (data.error.message) {
            return data.error.message;
        }

        return data.message;
    }
}