import { setupServer } from 'msw/node';
import { rest } from 'msw';
import {BASE_URL} from "../api/baseURL";

const handlers = [
    rest.post(`${BASE_URL}/auth/logout`, (_req, res, ctx) => {
        console.log('Call logout endpoind');

        return res(ctx.status(200));
    }),
];

export const server = setupServer(...handlers);
