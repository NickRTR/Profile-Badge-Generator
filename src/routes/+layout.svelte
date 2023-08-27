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
		color: var(--text);
		font-family: monospace;
		font-size: 1rem;
		font-weight: 600;
	}

	body {
		margin-inline: 0.25rem;
		height: 100%;
		background-attachment: fixed;
		background-image: linear-gradient(45deg, #231557 0%, #44107a 15%, #ff1361 55%, #fff800 100%);
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
