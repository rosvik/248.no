import { error } from '@sveltejs/kit';
import { getBlogPost } from '$lib/server/blog';
import { generateOgImage } from '$lib/server/og';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  let post;
  try {
    post = getBlogPost(params.slug);
  } catch (e) {
    console.error(e);
  }
  if (!post) error(404, 'Post not found');

  const png = await generateOgImage(post);
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'max-age=0, s-maxage=86400'
    }
  });
};
