import { getBlogPosts } from '$lib/server/blog';
import { generateFeed } from '$lib/server/feed';

export async function GET() {
  const posts = getBlogPosts();
  const feed = await generateFeed(posts);
  return new Response(feed, {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml'
    }
  });
}
