import type { PageLoad } from './$types';
import { getBlogPosts } from '$lib/server/blog';

export const load: PageLoad = () => {
  return {
    posts: getBlogPosts()
  };
};
