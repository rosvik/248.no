<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  export let hash = data.hash;
  export let date = data.date;
  export let host = data.host;
  export let ip = data.ip;
  export let year = data.year;
</script>

<svelte:head>
	<title>248.no</title>
</svelte:head>

<pre>

{date}
{#if host && ip}Serving {host} to {ip}{/if}
{#if hash}On commit <a href={`https://github.com/rosvik/248.no/commit/${hash}`}>{hash}</a>{/if}


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
    font-family: "JetBrains Mono";
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
  }
  :global(pre) {
    width: 60ch;
    margin: auto;
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
</style>
