<script lang="ts">
	import { Linkedin, Github, Twitter } from 'lucide-svelte';
</script>

<footer
	class="footer top-3/4 flex h-12 items-center justify-between bg-base-200 px-4 py-2 text-base-content"
>
	<span class="tooltip" data-tip="Fet per Ethan Nguyen">
		<p class="text-base">Made by Ethan Nguyen</p>
	</span>
	<span class="flex items-center gap-2">
		<a
			href="https://github.com/manhnguyen48"
			target="_blank"
			aria-label="GitHub"
			rel="noopener noreferrer"
		>
			<Github strokeWidth="1.5" /></a
		>
		<a
			href="https://www.linkedin.com/in/ethannguyen48/"
			target="_blank"
			aria-label="LinkedIn"
			rel="noopener noreferrer"
		>
			<Linkedin strokeWidth="1.5" /></a
		>
		<a
			href="https://twitter.com/bananadata48"
			target="_blank"
			aria-label="Twitter"
			rel="noopener noreferrer"
		>
			<Twitter strokeWidth="1.5" /></a
		>
	</span>
</footer>
