export function apiHasError(response: UserRequest | undefined): boolean {
    return <boolean>(response && response.hasOwnProperty('reason'));
}
