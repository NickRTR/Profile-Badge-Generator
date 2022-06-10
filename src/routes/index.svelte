<script>
    import { copy, copyMarkdownImage, getSearchSuggestions } from "$lib/helper";
    import { selectTextOnFocus } from "$lib/selectText.js";
    import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
    import Toggle from "svelte-toggle";

    let title = "";
    let preserveIconColor = false;

    // undefinded to hide badge until "getBanner" is called
    let url;
    let iconNotFound = false;
    let searchSuggestions = [];

    async function getBanner(iconName) {
        if (iconName === "") return // escape if input is empty

        if (searchSuggestions.length === 1) iconName = searchSuggestions[0];

        url = undefined; // remove old badge
        title = iconName; // update title if suggestion was pressed
        const result = await fetch(`/api/${iconName}-${preserveIconColor}.json`);
        if (result.ok) {
            const data = await result.json();
            url = data;
            searchSuggestions = [];
            iconNotFound = false;
        } else {
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
        <a href="https://github.com/NickRTR/Profile-Badge-Generator" title="Github" target="_blank"><img class="Github" src="/github.svg" alt="Github" /></a>
    </header>    

    <form>
        <div class="search">
            <p class="inputLabel">Search a brand</p>
            <input type="text" placeholder="title" name="title" bind:value={title} on:input={() => {searchSuggestions = getSearchSuggestions(title)}} use:selectTextOnFocus>
            <div class="suggestions">
                {#each searchSuggestions as suggestion, i (suggestion)}
                    <div animate:flip in:fade out:fly={{x:100}} class="suggestion"><button type="button" on:click|preventDefault={() => {getBanner(suggestion)}}>{suggestion}</button></div>
                {/each}
            </div>
        </div>
        <div class="preserveIcon"><Toggle style bind:toggled={preserveIconColor} on:toggle={() => {getBanner(title)}} label="Preserve icon color?" /></div>
        <button type="submit" on:click|preventDefault={() => {getBanner(title)}}>Generate Badge</button>
    </form>
    
    <section class="result">
        {#if url}
            <img src={url} alt={title} title={title} on:click={() => {copy(url)}}>
            <div class="buttons">
                <div class="copy"><button type="button" title="Copy URL" on:click={() => {copy(url)}}>Copy URL</button></div>
                <div class="copy"><button type="button" title="Copy as Markdown image" on:click={() => {copyMarkdownImage(url, title)}}>Copy as Markdown image</button></div>
                <div class="download"><button type="button" title="Download Badge" on:click={download}>Download Badge</button></div>
            </div>
        {/if}
        {#if iconNotFound}
            <p class="error">Icon not found!</p>
            <a href="https://github.com/simple-$icons/simple-$icons/issues/new?labels=new+icon&template=icon_request.yml&title=Request%3A+" title="Request icon" target="_blank">Request icon on SimpleIcons</a>
        {/if}
    </section>
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
        margin-top: .2rem;
    }

    /* input */
    button {
        border-radius: .6rem;
        outline: none;
        border: 3px solid var(--text);
        background-color: var(--text);
        cursor: pointer;
        transition: all linear .1s; 
        padding-block: .2rem;
        font-weight: 600;
        color: black;
    }

    input {
        border-radius: .75rem;
        border: none;
        outline: none;
        border: 3px solid var(--text);
        font-size: 1rem;
        transition: all linear .2s;
    }

    .inputLabel {
        margin: 0;
        text-align: left;
    }
    
    .search input {
        margin-block: .4rem;
        padding: .3rem .5rem;
    }

    .suggestions {
        margin-bottom: .5rem;
    }

    .suggestions button {
        margin-block: .2rem;
    }

    .preserveIcon {
        margin-bottom: 1rem;
    }

    :global(label) {
        font-size: 1rem !important;
    }

    button[type=submit] {
        font-size: 1rem;
    }

    button:hover, button:focus, input:hover, input:focus {
        border: 3px solid var(--accent);
    }

    /* result */
    section.result {
        margin-top: 1.5rem;
        padding-top: .5rem;
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
        margin-right: .5rem;
    }

    a {
        color: var(--text);
    }
</style>