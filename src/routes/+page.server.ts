import { getBlogPosts } from '$lib/server/blog';

export const prerender = false;
export const ssr = true;
export const csr = false;

export const load = () => {
  return {
    posts: getBlogPosts()
  };
};
