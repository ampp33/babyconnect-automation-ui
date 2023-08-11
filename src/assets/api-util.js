export default function getApiBaseUrl() {
    const {protocol, hostname} = window.location;
    const url = protocol + '//' + hostname + ':' + 3000;
    return url;
}