import { proxyApiRequest } from '../_lib/api-proxy.js';

export const onRequest = (context) => proxyApiRequest(context.request, context.env);
