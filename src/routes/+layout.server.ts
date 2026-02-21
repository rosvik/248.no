import { getIP } from '$lib/server/utils';
import { getBlogPost } from '$lib/server/blog';

const defaultLicense = {
  name: 'AGPL-3.0',
  url: 'https://github.com/rosvik/248.no/blob/master/LICENSE',
  description: `Copyleft 2018-${new Date().getFullYear()} Johannes Røsvik`
};

export const prerender = false;
export const ssr = true;
export const csr = false;

export const load = ({ request }) => {
  let hash;
  let url = new URL(request.url);
  try {
    hash = process.env.COMMIT_HASH || process.env.CF_PAGES_COMMIT_SHA || undefined;
  } catch (e) {
    console.warn(e);
  }

  let license = defaultLicense;
  const blogMatch = url.pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    try {
      const post = getBlogPost(blogMatch[1]);
      if (post?.license) {
        license = post.license;
      }
    } catch (e) {
      console.error('Error getting blog post', e);
    }
  }

  return {
    hash,
    license,
    date: new Date().toUTCString(),
    ip: getIP(request),
    host: request.headers.get('host'),
    breadcrumbs: getBreadcrumbs(url)
  };
};

const getBreadcrumbs = (url: URL): { name: string; url: string }[] => {
  return url.pathname
    .split('/')
    .slice(1)
    .filter((fragment) => fragment !== '')
    .map((fragment, index) => {
      return {
        name: fragment,
        url: url.pathname
          .split('/')
          .slice(0, index + 2)
          .join('/')
      };
    });
};
