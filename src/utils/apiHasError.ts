export function apiHasError(response: object): boolean {
    return (response && response.hasOwnProperty('reason'));
}
