<script lang="ts">
    import { page } from "$app/stores";
	import Nav from './Nav.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';
</script>
{#if $page.url.pathname === '/auth'}
	<div class="auth">
		<main>
			<slot />
		</main>
	</div>
{:else}
<div class="app">
	<Nav />

	<main>
		<slot />
	</main>

	<Footer />
</div>
{/if}

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.auth {
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
