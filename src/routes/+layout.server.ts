import { getIP } from '$lib/server/utils';

export const prerender = false;
export const ssr = true;
export const csr = false;

export const load = ({ request }) => {
  return {
    hash: process.env.COMMIT_HASH || undefined,
    date: new Date().toUTCString(),
    year: new Date().getFullYear(),
    ip: getIP(request),
    host: request.headers.get('host')
  };
};
