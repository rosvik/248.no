<script lang="ts">
	import { marked } from 'marked';
	import { page } from '$app/state';
	import { formatId, type getBlogPost } from '$lib/server/blog';
	import { error } from '@sveltejs/kit';

	const post = page.data as ReturnType<typeof getBlogPost>;
	if (!post) {
		error(404, {
			message: 'Post not found!!'
		});
	}
</script>

<svelte:head>
	<title>{post.title} - 248.no</title>
</svelte:head>

<pre>{formatId(post.id)} • {post.slugname}</pre>
<h1 class="prose title">{post.title}</h1>

<pre>By {post.author.name} on {post.published}
Last updated {post.updated}</pre>

<article class="prose">{@html marked(post.content)}</article>

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
