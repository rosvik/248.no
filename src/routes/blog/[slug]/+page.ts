import type { PageLoad } from './$types';
import { getBlogPost } from '$lib/server/blog';

export const load: PageLoad = ({ params }) => {
  return getBlogPost(params.slug);
};
