<script lang="ts">
	import type { PageProps } from './$types';
	import { marked } from 'marked';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.title} - 248.no</title>
</svelte:head>

<pre>{data.id}</pre>
<h1 class="prose title">{data.title}</h1>

<pre>By {data.author.name} on {data.published}
Last updated {data.updated}</pre>

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
		margin: .25ch 0;
	}
</style>
