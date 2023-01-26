export function apiHasError(response: XMLHttpRequest): boolean {
    return <boolean>(response && Object.prototype.hasOwnProperty.call(response, "reason"));
}
