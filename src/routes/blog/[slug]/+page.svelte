<script lang="ts">
  /* eslint-disable svelte/no-at-html-tags */
  import { marked } from 'marked';
  import { formatId, formatDate } from '$lib/utils';
  import { error } from '@sveltejs/kit';
  import { page } from '$app/state';
  import type { PageData } from './$types';

  export let data: PageData;
  if (data.id === undefined) {
    error(404, {
      message: 'Post not found!!'
    });
  }
</script>

<svelte:head>
  <title>{data.title} - 248.no</title>

  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.title} />
  <meta property="twitter:title" content={data.title} />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:site_name" content="248.no" />
  <meta property="og:image" content={`${page.url.origin}/blog/${data.slug}/og.png`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={data.title} />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:image" content={`${page.url.origin}/blog/${data.slug}/og.png`} />
  <meta property="article:published_time" content={new Date(data.published).toISOString()} />
  {#if data.updated}<meta property="article:modified_time" content={new Date(data.updated).toISOString()} />{/if}
  <meta property="article:author" content={data.author.name} />
</svelte:head>

<pre>{formatId(data.id)} • {data.slugname}</pre>
<h1 class="prose title">{data.title}</h1>

<pre>Published {formatDate(data.published)} by {data.author.name}
{#if data.updated}Last updated {formatDate(data.updated)}{/if}</pre>

<article class="prose">{@html marked(data.content)}</article>

{#if data.note}
<p class="note">{data.note}</p>
{/if}

<style>
  article {
    margin: 3ch 0;
    text-wrap-style: pretty;
  }
  pre {
    margin: 0;
  }
  .title {
    margin: 0.25ch 0;
  }
  .note {
    display: block;
    /* margin: 4ch; */
    font-size: 13px;
    margin: 4ch 0 0 0;
    color: var(--secondary-text);
  }
  .note::before {
    content: "[i] ";
  }
</style>
