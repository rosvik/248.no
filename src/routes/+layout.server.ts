import { getIP } from '$lib/server/utils';

export const prerender = false;
export const ssr = true;
export const csr = false;

export const load = ({ request }) => {
  let hash;
  try {
    hash = process.env.COMMIT_HASH || process.env.CF_PAGES_COMMIT_SHA || undefined;
  } catch (e) {
    // console.warn(e);
  }
  return {
    hash,
    date: new Date().toUTCString(),
    year: new Date().getFullYear(),
    ip: getIP(request),
    host: request.headers.get('host')
  };
};
