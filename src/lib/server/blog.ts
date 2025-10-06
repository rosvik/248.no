import fs from 'fs';
import path from 'path';
import { fromSlug, isDefined, toSlug, type BlogPost } from '../utils';

const blogDir = path.resolve(process.cwd(), 'blog');

export const getBlogPosts = (): BlogPost[] => {
  try {
    const posts = fs.readdirSync(blogDir);
    return posts
      .map((post) => {
        if (post.endsWith('.json')) {
          const slug = post.slice(0, -5);
          if (slug) {
            return getBlogPost(slug);
          }
        }
      })
      .filter(isDefined);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBlogPost = (slug: string): BlogPost | undefined => {
  const post = fs.readFileSync(path.join(blogDir, `${slug}.json`), 'utf8');
  const content = fs.readFileSync(path.join(blogDir, `${slug}.md`), 'utf8');

  const match = fromSlug(slug);
  if (!match) return undefined;

  return {
    ...JSON.parse(post),
    ...match,
    slug: toSlug(match.id, match.slugname),
    content
  };
};
