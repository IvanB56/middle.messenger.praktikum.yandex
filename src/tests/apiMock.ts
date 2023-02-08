import { setupServer } from 'msw/node';
import { rest } from 'msw';
import {BASE_URL} from "../api/baseURL";

const handlers = [
    rest.get(`${BASE_URL}/auth/user`, (_req, res, ctx) => {
        return res(ctx.status(200));
    }),
];

export const server = setupServer(...handlers);
