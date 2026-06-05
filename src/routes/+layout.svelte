<script lang="ts">
  import type { PageData } from './$types';
  import { resolve } from "$app/paths";
  export let data: PageData;
  const hash = data.hash;
  const date = data.date;
  const host = data.host;
  const ip = data.ip;
  const breadcrumbs = data.breadcrumbs;
  const license = data.license;
</script>

<svelte:head>
  <title>248.no</title>
</svelte:head>

<pre>

{date}
{#if host && ip}Serving {host} to {ip}{/if}
{#if hash}On commit <a href={`https://github.com/rosvik/248.no/commit/${hash}`}>{hash}</a>{/if}
</pre>
{#if breadcrumbs.length > 0}
<pre>
<a href={resolve("/")}>248.no</a> {#each breadcrumbs as b (b.url)} <a href={b.url} rel="external">{b.name}</a> {/each}
</pre>
{/if}

<pre>


</pre>

<slot />
<pre>


{license.description}{#if 'url' in license} (<a href={license.url} rel="external">{license.name}</a>){/if}

EOF
</pre>

<style>
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  :global(*) {
    --background: #1c1e27;
    --text: #fff;
    --secondary-text: rgb(145, 145, 145);
    --accent: #fcee54;
    --secondary-accent: #85eea7;
    --prose-font: Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif;
    --mono-font: 'Berkeley Mono', 'JetBrains Mono';
    --font-size: min(13px, calc(100cqw / 38));
  }
  :global(::selection) {
    background: var(--secondary-accent);
    color: var(--background);
  }
  :global(html) {
    background-color: var(--background);
    color: var(--text);
    font-family: var(--mono-font);
    width: min(60ch, calc(100% - 4ch));
    margin: auto;
    padding-bottom: 16ch;
    container-type: inline-size;
  }
  :global(pre), :global(code) {
    color: var(--secondary-text);
  }
  :global(pre) {
    font-size: var(--font-size);
    overflow-x: auto;
  }
  :global(span) {
    color: var(--text);
  }
  :global(a) {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: var(--secondary-text);
  }
  :global(a:hover) {
    color: var(--accent);
  }
  :global(a:active) {
    color: var(--secondary-accent);
  }
  :global(.prose) {
    font-family: var(--prose-font);
    overflow-wrap: break-word;
  }
  :global(ul, ol) {
    padding-left: 2ch;
  }
  :global(ul li) {
    margin: 1ch 0;
    list-style-type: '* ';
  }
  :global(ol li) {
    margin: 1ch 0;
    list-style-type: numbers;
  }
  :global(li::marker) {
    font-family: 'Berkeley Mono', 'JetBrains Mono';
    color: var(--secondary-text);
  }
  :global(ol li::marker) {
    content: counter(list-item) ' ';
  }
  :global(blockquote) {
    border-left: 2px solid var(--secondary-text);
    padding: 0 calc(2ch - 2px);
    margin: 1ch 0;
  }
  :global(article p, article li) {
    line-height: 1.5em;
  }
</style>
