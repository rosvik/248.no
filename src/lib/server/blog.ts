import fs from 'fs';
import path from 'path';
import { isDefined } from './utils';

const blogDir = path.resolve(process.cwd(), 'blog');

type BlogPost = {
  /** Numeric ID of the post. For post "0000-hello-world.json", id is 0 */
  id: number;
  /** Slug name of the post. For post "0000-hello-world.json", slugname is "hello-world" */
  slugname: string;
  /** Slug of the post. For post "0000-hello-world.json", the slug is "0000-hello-world". */
  slug: string;
  title: string;
  published: string;
  updated: string;
  author: {
    name: string;
  };
};

export const getBlogPosts = (): BlogPost[] => {
  try {
    const posts = fs.readdirSync(blogDir);
    return posts
      .map((post) => {
        if (post.endsWith('.json')) {
          let match = fromSlug(post.slice(0, -5));
          if (match) {
            const postData = JSON.parse(fs.readFileSync(path.join(blogDir, post), 'utf8'));
            return { ...postData, ...match };
          }
        }
      })
      .filter(isDefined);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBlogPost = (slug: string): (BlogPost & { content: string }) | undefined => {
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

export const fromSlug = (slug: string): { id: number; slugname: string } | undefined => {
  let regex = /(\d+)-(.+)/;
  let match = slug.match(regex);
  if (match) {
    return { id: parseInt(match[1]), slugname: match[2] };
  }
};

export const toSlug = (id: number, slugname: string): string => {
  return `${id.toString().padStart(4, '0')}-${slugname}`;
};

export const formatId = (id: number): string => {
  return id.toString().padStart(4, '0');
};
