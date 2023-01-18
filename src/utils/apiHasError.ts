export function apiHasError(response: XMLHttpRequest): boolean {
    return <boolean>(response && response.hasOwnProperty('reason'));
}
