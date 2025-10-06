import { isDefined, type BlogPost } from '$lib/utils';
import { Feed, type Author, type Item } from 'feed';
import { getBlogPost } from './blog';
import { marked } from 'marked';

const FEED_BASE_URL = 'https://248.no/blog';
const AUTHOR: Author = {
  name: 'Johannes Røsvik',
  link: 'https://248.no'
};

export const generateFeed = async (posts: BlogPost[]): Promise<string> => {
  const feed = new Feed({
    title: '248.no',
    description: 'A blog by Johannes Røsvik',
    link: FEED_BASE_URL,
    id: FEED_BASE_URL,
    copyright: `Copyright ${new Date().getFullYear()}, Johannes Røsvik`,
    language: 'en-US',
    updated: lastUpdated(posts),
    author: AUTHOR
  });

  let items = await Promise.all(
    posts.map(async (post) => {
      const blogPost = getBlogPost(post.slug);
      if (!blogPost) return;
      const item: Item = {
        title: post.title,
        link: `${FEED_BASE_URL}/${blogPost.slug}`,
        description: await encodeMarkdown(blogPost.content),
        date: new Date(post.published),
        published: new Date(post.published),
        author: [{ name: post.author.name }]
      };
      return item;
    })
  );

  items
    .filter(isDefined)
    .toReversed()
    .forEach((item) => feed.addItem(item));

  return feed.rss2();
};

export const lastUpdated = (posts: BlogPost[]): Date => {
  if (posts.length === 0) return new Date();
  return posts.reduce(
    (max, post) => {
      const date = new Date(post.updated || post.published);
      return date.getTime() > max.getTime() ? date : max;
    },
    new Date(posts[0].updated || posts[0].published)
  );
};

const encodeMarkdown = async (content: string): Promise<string> => {
  return CDATA(await marked.parse(content));
};

/**
 * Wrap content in CDATA tags
 * https://www.rssboard.org/rss-encoding-examples
 * https://www.w3.org/TR/2000/REC-xml-20001006#sec-cdata-sect
 */
const CDATA = (content: string): string => {
  return `<![CDATA[${content}]]>`;
};
