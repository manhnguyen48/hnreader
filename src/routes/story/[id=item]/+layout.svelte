<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="my-4 flex h-full w-full justify-center p-2">
	{@render children?.()}
</div>
