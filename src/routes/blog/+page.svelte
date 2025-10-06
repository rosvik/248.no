<script lang="ts">
	import { formatId, formatDate, toSlug } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	const posts = data.posts;
</script>

<svelte:head>
	<title>Blog - 248.no</title>
</svelte:head>

<h1 class="prose">Blog</h1>
<pre><a href="/blog/rss.xml">RSS</a></pre>

<ul>
	{#each posts.toReversed() as post}
		<li>
			<pre>{formatId(post.id)} • {post.slugname}</pre>
			<a href={`/blog/${toSlug(post.id, post.slugname)}`}>
				<h2 class="title prose">{post.title}</h2>
			</a>
			<pre class="secondary-text">Published {formatDate(post.published)} by {post.author.name}</pre>
		</li>
	{/each}
	{#if posts.length === 0}
		<p>No posts here</p>
	{/if}
</ul>

<style>
	h1 {
		margin-bottom: .25ch;
	}
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
