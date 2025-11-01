<script lang="ts">
  import { marked } from 'marked';
  import { formatId, formatDate } from '$lib/utils';
  import { error } from '@sveltejs/kit';
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
</svelte:head>

<pre>{formatId(data.id)} • {data.slugname}</pre>
<h1 class="prose title">{data.title}</h1>

<pre>Published {formatDate(data.published)} by {data.author.name}
{#if data.updated}Last updated {formatDate(data.updated)}{/if}</pre>

<article class="prose">{@html marked(data.content)}</article>

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
</style>
