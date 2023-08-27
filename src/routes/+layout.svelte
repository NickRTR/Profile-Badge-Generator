<script>
	import { Toaster } from "svelte-french-toast";
</script>

<svelte:head>
	<title>Profile Banner Generator</title>
</svelte:head>

<body>
	<Toaster />
	<main><slot /></main>
</body>

<style>
	* {
		margin: 0;
		/* text-align: center; */
		color: var(--text);
		font-family: monospace;
		font-size: 1rem;
		font-weight: 600;
	}

	body {
		margin-inline: 0.25rem;
		height: 100%;
		background-attachment: fixed;
		background-color: #21d4fd;
		background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
	}

	:global(button, input) {
		font-family: inherit;
	}

	:global(:root) {
		--accent: #ffbc42;
		--text: white;
	}
</style>
