<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  export let hash = data.hash;
  export let date = data.date;
  export let host = data.host;
  export let ip = data.ip;
  export let year = data.year;
  export let breadcrumbs = data.breadcrumbs;
</script>

<svelte:head>
  <title>248.no</title>
</svelte:head>

<pre>

{date}
{#if host && ip}Serving {host} to {ip}{/if}
{#if hash}On commit <a href={`https://github.com/rosvik/248.no/commit/${hash}`}>{hash}</a>{/if}
{#if breadcrumbs.length > 0}
<a href="/">248.no</a> {#each breadcrumbs as b}> <a href={b.url}>{b.name}</a> {/each}
{/if}

</pre>
<slot />
<pre>


Copyleft 2018-{year} Johannes Røsvik (<a href="https://github.com/rosvik/248.no/blob/master/LICENSE"
    >AGPL-3.0</a
  >).

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
  }
  :global(::selection) {
    background: var(--secondary-accent);
    color: var(--background);
  }
  :global(html) {
    background-color: var(--background);
    color: var(--text);
    font-family: 'Berkeley Mono', 'JetBrains Mono';
    width: 60ch;
    margin: auto;
  }
  :global(pre) {
    color: var(--secondary-text);
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
    font-family: Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif;
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
