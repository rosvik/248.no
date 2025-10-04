<script lang="ts">
	import { formatId, toSlug } from '$lib/server/blog';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Blog - 248.no</title>
</svelte:head>

<h1 class="prose">Blog</h1>

<ul>
	{#each data.posts.toReversed() as post}
		<li>
			<pre>{formatId(post.id)} • {post.slugname}</pre>
			<a href={`/blog/${toSlug(post.id, post.slugname)}`}>
				<h2 class="title prose">{post.title}</h2>
			</a>
			<pre class="secondary-text">Published at {post.published}</pre>
		</li>
	{/each}
	{#if data.posts.length === 0}
		<p>No posts here</p>
	{/if}
</ul>

<style>
	ul {
		padding-left: 0;
	}
	li {
		list-style: none;
		padding: 2ch 0;
	}
	pre {
		margin: 0;
	}
	.title {
		margin: .5ch 0;
	}
	.secondary-text {
    color: var(--secondary-text);
	}
</style>
