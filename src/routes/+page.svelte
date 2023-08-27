<script>
	import { copy, copyMarkdownImage, getSearchSuggestions } from "$lib/helper";
	import autoselect from "svelte-autoselect";
	import { fade, fly } from "svelte/transition";
	import { flip } from "svelte/animate";
	import Toggle from "svelte-toggle";

	export let data;

	let title = "";
	let preserveIconColor = false;
	let url; // undefinded to hide badge until "getBanner" is called
	let iconNotFound = false;
	let searchSuggestions = [];

	// call internal Api to get badge
	async function getBadge(iconName) {
		if (iconName === "") return; // escape if input is empty

		if (searchSuggestions.length === 1) iconName = searchSuggestions[0]; // if only one suggestion, use it
		title = iconName; // update title if suggestion was pressed

		const res = await fetch(`/api/${iconName}-${preserveIconColor}.json`); // fetch badge
		if (res.ok) {
			const data = await res.json();
			url = data;
			searchSuggestions = [];
			iconNotFound = false;
		} else {
			url = undefined; // remove old badge
			iconNotFound = true;
		}
	}

	async function download() {
		const badge = await fetch(url);
		const imageURL = URL.createObjectURL(await badge.blob());

		const link = document.createElement("a");
		link.href = imageURL;
		link.download = title;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<main>
	<header>
		<h1>Profile Badge Generator</h1>
		<a href="https://github.com/NickRTR/Profile-Badge-Generator" title="Github" target="_blank"
			><img class="Github" src="/github.svg" alt="Github" /></a
		>
	</header>

	<form>
		<div class="search">
			<p class="inputLabel">Search a brand</p>
			<input
				type="text"
				placeholder="title"
				name="title"
				bind:value={title}
				on:input={() => {
					searchSuggestions = getSearchSuggestions(title, data.icons);
				}}
				use:autoselect
			/>
			<div class="suggestions">
				{#each searchSuggestions as suggestion, i (suggestion)}
					<div animate:flip in:fade out:fly={{ x: 100 }} class="suggestion">
						<button
							type="button"
							on:click|preventDefault={() => {
								getBadge(suggestion);
							}}>{suggestion}</button
						>
					</div>
				{/each}
			</div>
		</div>
		<div class="preserveIcon">
			<Toggle
				bind:toggled={preserveIconColor}
				on:toggle={() => {
					getBadge(title);
				}}
				label="Preserve icon color?"
			/>
		</div>
		<button
			type="submit"
			on:click|preventDefault={() => {
				getBadge(title);
			}}>Generate Badge</button
		>
	</form>
	<form>
		<section class="result">
			{#if url}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<img
					src={url}
					alt={title}
					{title}
					on:click={() => {
						copy(url);
					}}
				/>
				<div class="buttons">
					<div class="copy">
						<button
							type="button"
							title="Copy URL"
							on:click={() => {
								copy(url);
							}}>Copy URL</button
						>
					</div>
					<div class="copy">
						<button
							type="button"
							title="Copy as Markdown image"
							on:click={() => {
								copyMarkdownImage(url, title);
							}}>Copy as Markdown image</button
						>
					</div>
					<div class="download">
						<button type="button" title="Download Badge" on:click={download}>Download Badge</button>
					</div>
				</div>
			{/if}
			{#if iconNotFound}
				<p class="error">Icon not found!</p>
				<a
					class="button"
					href="https://github.com/simple-$icons/simple-$icons/issues/new?labels=new+icon&template=icon_request.yml&title=Request%3A+"
					title="Request icon"
					target="_blank">Request icon on SimpleIcons</a
				>
			{/if}
		</section>
	</form>
</main>

<style>
	h1 {
		margin: 0;
	}

	header {
		margin-top: 2rem;
		display: flex;
		margin-bottom: 1.5rem;
	}

	.Github {
		width: 2rem;
		height: 2rem;
		margin-left: 1rem;
		margin-top: 0.2rem;
	}

	/* input */
	button {
		border-radius: 0.6rem;
		outline: none;
		border: 3px solid var(--text);
		background-color: var(--text);
		cursor: pointer;
		transition: all linear 0.1s;
		padding-block: 0.2rem;
		font-weight: 600;
		color: black;
	}

	.button {
		user-select: none;
	}

	input {
		border-radius: 0.75rem;
		border: none;
		outline: none;
		border: 3px solid var(--text);
		font-size: 1rem;
		transition: all linear 0.2s;
		user-select: none;
	}

	.inputLabel {
		margin: 0;
		text-align: left;
	}

	.search input {
		margin-block: 0.4rem;
		padding: 0.3rem 0.5rem;
	}

	.suggestions {
		margin-bottom: 0.5rem;
	}

	.suggestions button {
		margin-block: 0.2rem;
	}

	.preserveIcon {
		margin-bottom: 1rem;
	}

	:global(label) {
		font-size: 1rem !important;
	}

	button[type="submit"] {
		font-size: 1rem;
	}

	button:hover,
	button:focus,
	input:hover,
	input:focus {
		border: 3px solid var(--accent);
	}

	/* result */
	section.result {
		margin-top: 1.5rem;
		padding-top: 0.5rem;
		border-top: 5px solid var(--accent);
	}

	section.result img {
		margin-block: 1rem;
		height: 3rem;
		border-radius: 1rem;
		box-shadow: 0 0 2rem var(--accent);
	}

	.buttons {
		display: flex;
	}

	.buttons button {
		margin-right: 0.5rem;
	}

	a {
		color: var(--text);
	}
</style>
