import Fetch from "../Fetch";
import {BASE_URL} from "../../api/baseURL";

describe('core/Fetch', () => {

    it('should return status 200', async () => {
        Fetch.get(`${BASE_URL}/auth/user`, {})
            .then(response => {
                expect(response.status).toEqual(200)
            });
    });

    it.skip('should be timeout', () => {
        Fetch.get(`${BASE_URL}/auth/user`, {})
            .then(response => {
                expect(response.timeout).toEqual(5000)
            });
    })

    it.skip('should be method GET', () => {
        Fetch.get(`${BASE_URL}/auth/user`, {})
            .then(response => {
                expect(response.method).toEqual('GET')
            });
    })
});
