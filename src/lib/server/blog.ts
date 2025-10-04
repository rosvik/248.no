import fs from 'fs';
import path from 'path';
import { isDefined } from './utils';

const blogDir = path.resolve(process.cwd(), 'blog');

type BlogPost = {
  id: string;
  title: string;
  published: string;
  updated: string;
  author: {
    name: string;
  };
};

export const getBlogPosts = (): BlogPost[] => {
  const posts = fs.readdirSync(blogDir);
  return posts
    .map((post) => {
      if (post.endsWith('.json')) {
        const postData = JSON.parse(fs.readFileSync(path.join(blogDir, post), 'utf8'));
        console.log(postData);
        return postData;
      }
    })
    .filter(isDefined);
};

export const getBlogPost = (id: string): BlogPost & { content: string } => {
  const post = fs.readFileSync(path.join(blogDir, `${id}.json`), 'utf8');
  const content = fs.readFileSync(path.join(blogDir, `${id}.md`), 'utf8');
  return {
    ...JSON.parse(post),
    content
  };
};
