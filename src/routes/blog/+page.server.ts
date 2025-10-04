import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/server/blog';

export const load: PageServerLoad = () => {
  return {
    posts: getBlogPosts()
  };
};
