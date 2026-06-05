import fs from 'fs';
import path from 'path';
import { fromSlug, isDefined, toSlug, type BlogPost, type FrontMatter } from '../utils';
import matter from 'gray-matter';

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
  const file = fs.readFileSync(path.join(blogDir, `${slug}.md`), 'utf8');
  const { data: frontMatter, content } = matter(file);

  const match = fromSlug(slug);
  if (!match) return undefined;
  const { id, slugname } = match;

  return {
    ...(frontMatter as FrontMatter),
    id,
    slugname,
    slug: toSlug(id, slugname),
    content
  };
};
