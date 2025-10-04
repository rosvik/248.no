import type { PageServerLoad } from './$types';
import { getBlogPost } from '$lib/server/blog';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = ({ params }) => {
  try {
    return getBlogPost(params.slug);
  } catch (e) {
    console.error(e);
    error(404, {
      message: 'Post not found'
    });
  }
};
