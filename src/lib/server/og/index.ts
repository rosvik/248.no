import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { read } from '$app/server';
import { formatId, formatDate, type BlogPost } from '$lib/utils';
import JetBrainsMono from './JetBrainsMono-Regular.ttf';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// From src/routes/+layout.svelte
const BACKGROUND = '#1c1e27';
const TEXT = '#fff';
const SECONDARY_TEXT = 'rgb(145, 145, 145)';

// Mirrors favicon.svg, pinned to the white fill
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="20,20 20,80 80,80 80,20" fill="${TEXT}"/></svg>`;

let fontDataPromise: Promise<ArrayBuffer> | undefined;
const getFontData = () => (fontDataPromise ??= read(JetBrainsMono).arrayBuffer());

// Rasterize the favicon vector to a PNG data URI once, so satori can embed it.
const FAVICON_PNG = `data:image/png;base64,${new Resvg(FAVICON_SVG, {
  fitTo: { mode: 'width', value: 128 }
})
  .render()
  .asPng()
  .toString('base64')}`;

type OgInput = Pick<BlogPost, 'title' | 'id' | 'published' | 'author'>;

const markup = ({ title, id, published, author }: OgInput) => ({
  type: 'div',
  props: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      padding: '70px',
      backgroundColor: BACKGROUND,
      color: TEXT,
      fontFamily: 'JetBrains Mono'
    },
    children: [
      // Header: favicon square + site name
      {
        type: 'div',
        props: {
          style: { display: 'flex', alignItems: 'center', gap: '24px' },
          children: [
            { type: 'img', props: { src: FAVICON_PNG, width: 60, height: 60 } },
            { type: 'div', props: { style: { fontSize: '40px' }, children: '248.no' } }
          ]
        }
      },
      // Title
      {
        type: 'div',
        props: {
          style: { display: 'flex', fontSize: '64px', lineHeight: 1.2 },
          children: title
        }
      },
      // Footer metadata
      {
        type: 'div',
        props: {
          style: { display: 'flex', fontSize: '28px', color: SECONDARY_TEXT },
          children: `${formatId(id)} · ${formatDate(published)} · ${author.name}`
        }
      }
    ]
  }
});

export const generateOgImage = async (post: OgInput): Promise<Buffer> => {
  const svg = await satori(markup(post) as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      {
        name: 'JetBrains Mono',
        data: await getFontData(),
        weight: 400,
        style: 'normal'
      }
    ]
  });

  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
};
