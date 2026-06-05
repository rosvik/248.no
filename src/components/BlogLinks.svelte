<script lang="ts">
  import { formatId } from "$lib/utils";
  export let posts: BlogPost[];
  import type { BlogPost } from '$lib/utils';
  import { toSlug } from '$lib/utils';
  import { formatDate } from '$lib/utils';
  import { resolve } from "$app/paths";
</script>

<ul>
  {#each posts.toReversed() as post (post.slug)}
    <li>
      <pre>{formatId(post.id)} • {post.slugname}</pre>
      <a href={resolve(`/blog/${toSlug(post.id, post.slugname)}`)}>
        <h3 class="title prose">{post.title}</h3>
      </a>
      <pre class="secondary-text">Published {formatDate(post.published)} by {post.author.name}</pre>
    </li>
  {/each}
  {#if posts.length === 0}
    <p>No posts here</p>
  {/if}
</ul>

<style>
  ul {
    padding-left: 0;
  }
  li {
    list-style: none;
    padding: 1ch 0;
  }
  pre {
    margin: 0;
  }
  .title {
    margin: 0.5ch 0;
  }
  .secondary-text {
    color: var(--secondary-text);
  }
</style>
