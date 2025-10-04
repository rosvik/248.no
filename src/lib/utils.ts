export const isDefined = <T>(value: T): value is NonNullable<T> =>
  value !== undefined && value !== null;

export type BlogPost = {
  /** Numeric ID of the post. For post "0000-hello-world.json", id is 0 */
  id: number;
  /** Slug name of the post. For post "0000-hello-world.json", slugname is "hello-world" */
  slugname: string;
  /** Slug of the post. For post "0000-hello-world.json", the slug is "0000-hello-world". */
  slug: string;
  title: string;
  published: string;
  updated?: string;
  author: {
    name: string;
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

export const formatDate = (date: string): string => {
  let d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
};
