<script lang="ts">
    import github from '$lib/assets/github.svg?raw';
	import linkedin from '$lib/assets/linkedin.svg?raw';
	import twitter from '$lib/assets/twitter.svg?raw';
</script>

<footer
	class="footer flex items-center justify-between bg-base-200 text-base-content px-4 py-2 h-12 top-3/4"
>
	<p class="text-base">Made by Ethan Nguyen</p>
	<span class="flex items-center gap-2">
		<a
			href="https://github.com/manhnguyen48"
			target="_blank"
			aria-label="GitHub"
			rel="noopener noreferrer"
		>
			{@html github}</a
		>
		<a
			href="https://www.linkedin.com/in/ethannguyen48/"
			target="_blank"
			aria-label="LinkedIn"
			rel="noopener noreferrer"
		>
			{@html linkedin}</a
		>
		<a
			href="https://twitter.com/bananadata48"
			target="_blank"
			aria-label="Twitter"
			rel="noopener noreferrer"
		>
			{@html twitter}</a
		>
	</span>
</footer>